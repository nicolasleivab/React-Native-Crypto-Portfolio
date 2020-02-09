import React, { useState, useEffect } from 'react';
import {View, Text, StyleSheet, Button, ActivityIndicator} from 'react-native';
import Colors from '../../constants/colors';
import CryptoChart from '../../components/LineChart/LineChart';
import CoinInfo from '../../components/CoinInfo/CoinInfo';
import ButtonsContainer from '../../components/ButtonsContainer/ButtonsContainer';

export default function Chart (props){
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
                    const dateFormat = require('dateformat');
                    rawData.forEach(d => {
                        series.push(+d.priceUsd);
                        const currentDate = new Date(d.time);
                        categories.push(dateFormat(currentDate, "d/m"));
                    });
                    rawData.forEach(d => {
                        const currentDate = new Date(d.time);
                        categoriesHour.push(dateFormat(currentDate, "HH:MM"));
                    });
                    console.log('coin intra data ready');
                    setCoinIntraData(series);
                    setSeries(series.slice(-24));
                    setDates(categories);
            
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
        fetch('https://api.coingecko.com/api/v3/coins/' + currentCoinID + '/market_chart?vs_currency=usd&days=max')
            .then(res => res.json())
            .then(json => {
                if (json.prices) {
                    const rawData = json.prices;
                    const series = [];
                    const categories = [];
                    const dateFormat = require('dateformat');
               
                    for(let i= 0; i < rawData.length; i++){
                        series.push(Number(rawData[i][1]))
                        const currentDate = new Date(rawData[i][0]);
                        categories.push(dateFormat(currentDate, "d/m"));
                    }

                    setCoinDailyData(series);
                    setDailyDates(categories);
                    console.log('coin daily data ready');

                    //find ATH
                    const rawATH = Math.max(...series);
                    let ATH;
                    
                    if(rawATH < 10){
                        ATH = rawATH.toFixed(4);
                    }else{
                        ATH = rawATH.toFixed(2);
                    }
                    setATH(ATH);
                    //setCoinDailyData(series);
                    setLoadingDaily(false);
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
            <View style={styles.loadingScreen}><ActivityIndicator size="large" color={Colors.text_primary} /></View>
        )
    }
    //data calculation and update method
    const sliceData = (btn) =>{
        if(btn === 'day'){
            setSeries(coinIntraData.slice(-24));
            setCategories(intradayHours);
            setCurrentChange(dailyCoinChange);
        }
        if(btn === 'oneWeek'){
            const series = [];
            const categories = [];
            const slicedData = coinIntraData.slice(-24*7);
            const slicedDates = dates.slice(-24*7);
            for(let i = 0; i < slicedData.length; i = i+7){
                series.push(slicedData[i]);
            }
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
            for (let i = 0; i < slicedData.length; i = i + 14) {
                series.push(slicedData[i])
            }
            for (let i = 0; i < slicedDates.length; i = i + 48) {
                categories.push(slicedDates[i]);
            }
            setSeries(series);
            setCategories(categories);

            const twoWeeksChange = (slicedData[335] - slicedData[0])*100/ slicedData[0];
            setCurrentChange(twoWeeksChange.toFixed(2));
        }
        if (btn === 'oneMonth') {
            const slicedData = coinDailyData.slice(-30);
            setSeries(slicedData);
            const categories = [];
            const slicedDates = dailyDates.slice(-30);

            for (let i = 0; i < slicedDates.length; i = i + 3) {
                categories.push(slicedDates[i]);
            }
            setCategories(categories);

            const monthlyChange = (slicedData[29] - slicedData[0])*100/ slicedData[0];
            setCurrentChange(monthlyChange.toFixed(2));
        }
        if (btn === 'twoMonths') {
            const series = [];
            const slicedData = coinDailyData.slice(-30*2)
            const categories = [];
            const slicedDates = dailyDates.slice(-30*2);
            for (let i = 0; i < slicedData.length; i = i + 2) {
                series.push(slicedData[i])
            }
            setSeries(series);
            for (let i = 0; i < slicedDates.length; i = i + 6) {
                categories.push(slicedDates[i]);
            }
            setCategories(categories);

            const twoMonthsChange = (slicedData[59] - slicedData[0])*100/ slicedData[0]
            setCurrentChange(twoMonthsChange.toFixed(2));
        }
       
    }

    return (
        <View style ={styles.screen}>
            <View style={styles.priceContainer}>
                <Text style={{color:Colors.text_primary, fontSize: 22}}>{'$'+currentCoinPrice}</Text>
                <Text style={currentCoinChange > 0 ? { color: Colors.positive_value, marginBottom: 3} : { color: Colors.negative_value, marginBottom: 3 }}>
                    {currentCoinChange > 0 ? ' (+' + currentCoinChange + '%)' : ' ('+currentCoinChange + '%)'}</Text>
            </View>
            <View style={styles.chartContainer}>
                <CryptoChart
                    labels={categories}
                    series={[
                        {
                            data: coinSeries
                        }
                    ]}
                    decimalPlaces={coinSeries.slice(-1)[0]<10 ? 4 : 2}
                />
            </View>
            <ButtonsContainer
                    sliceData={sliceData}
            />
            <CoinInfo
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
    return {headerStyle: {
        backgroundColor: Colors.secondary,
    },
    headerTintColor: Colors.text_primary,
    title: currentCoinName,
    headerTitleAlign: 'center'
}
}

const styles = StyleSheet.create({
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