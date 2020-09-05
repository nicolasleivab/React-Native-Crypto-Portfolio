import React, { useState, useEffect } from 'react';
import {View, Text, StyleSheet, Button, ActivityIndicator} from 'react-native';
import Colors from '../../constants/colors';
import CryptoChart from '../../components/LineChart/LineChart';
import CoinInfo from '../../components/CoinInfo/CoinInfo';
import ButtonsContainer from '../../components/ButtonsContainer/ButtonsContainer';

export default function Chart (props){
    const { screenProps: {Colors: Colors} } = props;
    const currentCoinID = props.navigation.getParam('coinID');
    const currentCoinPrice = props.navigation.getParam('coinPrice');
    const currentCoinVol = props.navigation.getParam('coinVol');
    const dailyCoinChange = props.navigation.getParam('coinChange');
    const currentCoinSupply = props.navigation.getParam('coinSupply');
    const currentCoinMarket = props.navigation.getParam('coinMarketCap');
    const [coinDailyData, setCoinDailyData] = useState([]);
    const [coinIntraData, setCoinIntraData] = useState([]);
    const [coinSeries, setSeries] = useState([]);
    const [categories, setCategories] = useState([]);
    const [dates, setDates] = useState([]);
    const [dailyDates, setDailyDates] = useState([]);
    const [intradayHours, setIntraHours] = useState([]);
    const [loadingDaily, setLoadingDaily] = useState(false);
    const [loadingIntra, setLoadingIntra] = useState(true);
    const [error, setError] = useState(null);
    const [currentCoinChange, setCurrentChange] = useState([dailyCoinChange]);
    const [ATH, setATH] = useState(0);
    const [tooltipSeries, setTooltipSeries] = useState([]);
    const [categoriesHour, setCategoriesHour] = useState([]);
    const [toolTipCategoriesHr, setToolTipCategories] = useState([]);
    const [toolTipCategoriesD, setToolTipCategoriesD] = useState([]);
    const dateFormat = require('dateformat');

    useEffect(() => {
        // Fetch current coin data (intra)
        fetch("https://api.coincap.io/v2/assets/" + currentCoinID + "/history?interval=h1")
            .then(res => res.json())
            .then(json => {
                if (json.data) {
                    const rawData = json.data;
                    const series= [];
                    const categories = [];
                    const categoriesHour = [];
                    const tooltipCategoriesHr = [];
                
                    rawData.forEach(d => {
                        series.push(+d.priceUsd);
                        const currentDate = new Date(d.time);
                        categories.push(dateFormat(currentDate, "d/m"));
                        tooltipCategoriesHr.push(dateFormat(currentDate, "ddd mmm dd yyyy HH:MM"));
                    });
                  
                    rawData.forEach(d => {
                        const currentDate = new Date(d.time);
                        categoriesHour.push(dateFormat(currentDate, "HH:MM"));
                    });
                    console.log('coin intra data ready');
                    setCoinIntraData(series);
                    setToolTipCategories(tooltipCategoriesHr);
                    setCategoriesHour(categoriesHour);
                    const slicedSeries = series.slice(-24);
                    
                    setDates(categories);
                    const slicedCategories = categoriesHour.slice(-24);
                    const slicedToolTipCat = tooltipCategoriesHr.slice(-24);
                    const tooltipSeriesn = [];
                    const halfSeries = [];
                    
                    for(let n = 0; n < slicedSeries.length ; n = n + 2){
                        const obj = {};
                        obj['price'] = slicedSeries[n];
                        obj['date'] = slicedToolTipCat[n];
                        tooltipSeriesn.push(obj);
                        halfSeries.push(slicedSeries[n]);
                    }
                    setTooltipSeries(tooltipSeriesn);
                    
                    setSeries(halfSeries);
    
            
                    const slicedCategoriesHour = [];
                    const slicedHours = categoriesHour.slice(-24);
                    for (let i = 0; i < slicedHours.length; i = i + 3) {
                        slicedCategoriesHour.push(slicedHours[i]);
                        
                    }

                    setIntraHours(slicedCategoriesHour);
                    setCategories(slicedCategoriesHour);
                    setLoadingIntra(false);
                }
            })
            .catch(err => {
                setError(err)
                console.log('coin intra data error')
                setLoadingIntra(false)
            })
    }, []); 

    useEffect(() => {
        // Fetch current coin data (daily)
        let coinID
        if(currentCoinID === 'bitcoin-sv'){
            coinID = 'bitcoin-cash-sv';
        }else if(currentCoinID === 'binance-coin'){
            coinID = 'binancecoin';
        }else{
            coinID = currentCoinID;
        }
        fetch('https://api.coingecko.com/api/v3/coins/' + coinID + '/market_chart?vs_currency=usd&days=max')
            .then(res => res.json())
            .then(json => {
                if (json.prices) {
                    const rawData = json.prices;
                    const series = [];
                    const categories = [];
                    const tooltipCategoriesD = [];
               
                    for(let i= 0; i < rawData.length; i++){
                        series.push(Number(rawData[i][1]))
                        const currentDate = new Date(rawData[i][0]);
                        categories.push(dateFormat(currentDate, "d/m"));
                        tooltipCategoriesD.push(dateFormat(currentDate, "ddd mmm dd yyyy HH:MM"));
                    }

                    setCoinDailyData(series);
                    setToolTipCategoriesD(tooltipCategoriesD);
                    setDailyDates(categories);
                    console.log('coin daily data ready');

                    //find ATH
                    const rawATH = Math.max(...series);
                    
                    if(rawATH < 10){
                        const formatATH = rawATH.toFixed(4);
                        setATH(formatATH);
                        setLoadingDaily(false);
                      
                    }else{
                        const formatATH = rawATH.toFixed(2);
                        setATH(formatATH);
                        setLoadingDaily(false);
                        
                    }
                
                    
                }
            })
            .catch(err => {
                setError(err)
                console.log('coin daily data error')
                setLoadingDaily(false)
            })
    }, []);

    //return loading screen when loading
    if (loadingDaily !== false || loadingIntra !== false) {
        return (
            <View style={styles(Colors).loadingScreen}><ActivityIndicator size="large" color={Colors.text_primary} /></View>
        )
    }
    //data calculation and update method
    const sliceData = (btn) =>{
        if(btn === 'day'){
            const slicedSeries = coinIntraData.slice(-24);
            const slicedCategories = toolTipCategoriesHr.slice(-24);
            setCategories(intradayHours);
            setCurrentChange(dailyCoinChange);
            const halfSeries = [];
            const tooltipSeriesn = [];
            for (let i = 0; i < slicedSeries.length; i = i + 2) {
                const obj = {};
                halfSeries.push(slicedSeries[i]);
                obj['price'] = slicedSeries[i];
                obj['date'] = slicedCategories[i];
                tooltipSeriesn.push(obj);        
            }
            setSeries(halfSeries);
            setTooltipSeries(tooltipSeriesn);
        }
        if(btn === 'oneWeek'){
            const series = [];
            const categories = [];
            const slicedData = coinIntraData.slice(-24*7);
            const slicedDates = dates.slice(-24*7);
            const slicedToolTipCat = toolTipCategoriesHr.slice(-24*7);

            const tooltipSeriesn = [];
            //data
            for(let i = 0; i < slicedData.length; i = i+14){
                const obj = {};
                obj['price'] = slicedData[i];
                obj['date'] = slicedToolTipCat[i];
                tooltipSeriesn.push(obj);
                series.push(slicedData[i]);
            }
            //set tooltip data
            setTooltipSeries(tooltipSeriesn);
            //categories
            for (let i = 0; i < slicedDates.length; i = i + 24) {
                categories.push(slicedDates[i]);
            }
            setSeries(series);
            setCategories(categories);

            const weeklyChange = (slicedData[167] - slicedData[0])*100/slicedData[0];
            setCurrentChange(weeklyChange.toFixed(2));
        }
        if (btn === 'twoWeeks') {
            const series = [];
            const categories = [];
            const slicedData = coinIntraData.slice(-24*14)
            const slicedDates = dates.slice(-24 * 14);
            const tooltipSeriesn = [];
            const slicedToolTipCat = toolTipCategoriesHr.slice(-24 * 14);

            for (let i = 0; i < slicedData.length; i = i + 24) {
                const obj = {};
                obj['price'] = slicedData[i];
                obj['date'] = slicedToolTipCat[i];
                tooltipSeriesn.push(obj);
                series.push(slicedData[i])
            }
            //set tooltip data
            setTooltipSeries(tooltipSeriesn);

            for (let i = 0; i < slicedDates.length; i = i + 48) {
                categories.push(slicedDates[i]);
            }
            setSeries(series);
            setCategories(categories);

            const twoWeeksChange = (slicedData[335] - slicedData[0])*100/ slicedData[0];
            setCurrentChange(twoWeeksChange.toFixed(2));
        }
        if (btn === 'oneMonth') {
            const series = [];
            const slicedData = coinDailyData.slice(-30)
            const categories = [];
            const slicedDates = dailyDates.slice(-30);
            const tooltipSeriesn = [];
            const slicedToolTipCat = toolTipCategoriesD.slice(-30);

            for (let i = 0; i < slicedData.length; i = i + 2) {
                const obj = {};
                obj['price'] = slicedData[i];
                obj['date'] = slicedToolTipCat[i];
                tooltipSeriesn.push(obj);
                series.push(slicedData[i])
            }
            //set tooltip data
            setTooltipSeries(tooltipSeriesn);

            setSeries(series);
            for (let i = 0; i < slicedDates.length; i = i + 5) {
                categories.push(slicedDates[i]);
            }
         
            setCategories(categories);

            const oneMonthChange = (slicedData[29] - slicedData[0]) * 100 / slicedData[0]
            setCurrentChange(oneMonthChange.toFixed(2));
        }
        if (btn === 'twoMonths') {
            const series = [];
            const slicedData = coinDailyData.slice(-30*2)
            const categories = [];
            const slicedDates = dailyDates.slice(-30*2);
            const tooltipSeriesn = [];
            const slicedToolTipCat = toolTipCategoriesD.slice(-30 * 2);

            for (let i = 0; i < slicedData.length; i = i + 4) {
                const obj = {};
                obj['price'] = slicedData[i];
                obj['date'] = slicedToolTipCat[i];
                tooltipSeriesn.push(obj);
                series.push(slicedData[i])
            }
            //set tooltip data
            setTooltipSeries(tooltipSeriesn);
            setSeries(series);
            for (let i = 0; i < slicedDates.length; i = i + 10) {
                categories.push(slicedDates[i]);
            }
            setCategories(categories);

            const twoMonthsChange = (slicedData[59] - slicedData[0])*100/ slicedData[0]
            setCurrentChange(twoMonthsChange.toFixed(2));
        }
       
    }

    return (
        <View style ={styles(Colors).screen}>
            <View style={styles(Colors).priceContainer}>
                <Text style={{color:Colors.text_primary, fontSize: 22}}>{'$'+currentCoinPrice}</Text>
                <Text style={currentCoinChange > 0 ? { color: Colors.positive_value, marginBottom: 3} : { color: Colors.negative_value, marginBottom: 3 }}>
                    {currentCoinChange > 0 ? ' (+' + currentCoinChange + '%)' : ' ('+currentCoinChange + '%)'}</Text>
            </View>
            <View style={styles(Colors).chartContainer}>
                <CryptoChart
                    Colors={Colors}
                    labels={categories}
                    series={[
                        {
                            data: coinSeries
                        }
                    ]}
                    decimalPlaces={coinSeries.slice(-1)[0]<10 ? 4 : 2}
                    verticalRotation={30}
                    horizontalRotation={-45}
                    chartHeight={250}
                    tpSeries={tooltipSeries}
                />
            </View>
            <ButtonsContainer
                Colors={Colors}
                sliceData={sliceData}
            />
            <CoinInfo
                Colors={Colors}
                ATH={ATH}
                marketCap={currentCoinMarket}
                vol={currentCoinVol}
                supply={currentCoinSupply}
            />
        </View>
    );
};
//Dynamic navigation options with passed params
Chart.navigationOptions = coinParams => {
    const currentCoinName = coinParams.navigation.getParam('coinName');
    return {
    headerStyle: {
        backgroundColor: "#1c1e2e",//Colors.secondary,
    },
    headerTintColor: "#FFF",//Colors.text_primary,
    title: currentCoinName,
    headerTitleAlign: 'center'
}
}

const styles = (Colors) => StyleSheet.create({
    loadingScreen:{
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: Colors.primary
    },
    screen: {
        flex: 1,
        backgroundColor: Colors.primary
    },
    priceContainer:{
        marginTop: 20,
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'flex-end'
    },
    chartContainer:{
        width: '100%'
    }
})