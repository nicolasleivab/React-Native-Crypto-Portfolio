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
    const currentCoinChange = props.navigation.getParam('coinChange');
    const currentCoinSupply = props.navigation.getParam('coinSupply');
    const currentCoinMarket = props.navigation.getParam('coinMarketCap');
    const [coinDailyData, setCoinDailyData] = useState([]);
    const [coinIntraData, setCoinIntraData] = useState([]);
    const [coinSeries, setSeries] = useState([]);
    const [dates, setDates] = useState([]);
    const [dailyDates, setDailyDates] = useState([]);
    const [loadingDaily, setLoadingDaily] = useState(false);
    const [loadingIntra, setLoadingIntra] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        // Fetch current coin data (intra)
        fetch("https://api.coincap.io/v2/assets/" + currentCoinID + "/history?interval=h1")
            .then(res => res.json())
            .then(json => {
                if (json.data) {
                    const rawData = json.data;
                    const series= [];
                    const categories = [];
                    const dateFormat = require('dateformat');
                    rawData.forEach(d => {
                        series.push(+d.priceUsd);
                        const currentDate = new Date(d.time);
                        categories.push(dateFormat(currentDate, "d/m"));
                    });
                    console.log('coin intra data ready');
                    setCoinIntraData(series)
                    setSeries(series.slice(-24))
                    setDates(categories)
                    setLoadingIntra(false)
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
                    //setCoinDailyData(series);
                    setLoadingDaily(false)
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
            <View style={styles.screen}><ActivityIndicator size="large" color={Colors.text_primary} /></View>
        )
    }
    //data calculation and update method
    const sliceData = (btn) =>{
        if(btn === 'day'){
       setSeries(coinIntraData.slice(-24))
        }
        if(btn === 'oneWeek'){
            const series = [];
            const slicedData = coinIntraData.slice(-24*7)
            for(let i = 0; i < slicedData.length; i = i+7){
                series.push(slicedData[i])
            }
            setSeries(series);
        }
        if (btn === 'twoWeeks') {
            const series = [];
            const slicedData = coinIntraData.slice(-24*14)
            for (let i = 0; i < slicedData.length; i = i + 14) {
                series.push(slicedData[i])
            }
            setSeries(series);
        }
        if (btn === 'oneMonth') {
        
            setSeries(coinDailyData.slice(-30));
        }
        if (btn === 'twoMonths') {
            const series = [];
            const slicedData = coinDailyData.slice(-30*2)
            for (let i = 0; i < slicedData.length; i = i + 2) {
                series.push(slicedData[i])
            }
            setSeries(series);
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
                    labels={dates.slice(-7)}
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
        width: '100%',
        marginVertical: 20,
    }
})