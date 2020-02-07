import React, { useState, useEffect } from 'react';
import {View, Text, StyleSheet, Button, ActivityIndicator} from 'react-native';
import Colors from '../../constants/colors';
import CryptoChart from '../../components/LineChart/LineChart';
import CoinInfo from '../../components/CoinInfo/CoinInfo';

export default function Chart (props){
    const currentCoinID = props.navigation.getParam('coinID');
    const currentCoinPrice = props.navigation.getParam('coinPrice');
    const currentCoinVol = props.navigation.getParam('coinVol');
    const currentCoinChange = props.navigation.getParam('coinChange');
    const currentCoinSupply = props.navigation.getParam('coinSupply');
    const currentCoinMarket = props.navigation.getParam('coinMarketCap');
    const [coinData, setCoinData] = useState([]);
    const [dates, setDates] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        // Fetch current coin data
        fetch("https://api.coincap.io/v2/assets/"+currentCoinID+"/history?interval=d1")
            .then(res => res.json())
            .then(json => {
                if (json.data) {
                    const rawData = json.data;
                    const series= [];
                    const categories = [];
                    var dateFormat = require('dateformat');
                    rawData.forEach(d => {
                        series.push(+d.priceUsd);
                        const currentDate = new Date(d.time);
                        categories.push(dateFormat(currentDate, "d/m"));
                    });
                    console.log('coin data ready');
                    setCoinData(series)
                    setDates(categories)
                    setLoading(false)
                }
            })
            .catch(err => {
                setError(err)
                console.log('coin data error')
                setLoading(false)
            })
    }, []);


    //return loading screen when loading
    if (loading !== false) {
        return (
            <View style={styles.screen}><ActivityIndicator size="large" color={Colors.text_primary} /></View>
        )
    }

    return (
        <View style ={styles.screen}>
            <View style={styles.priceContainer}>
                <Text style={{color:Colors.text_primary}}>{currentCoinPrice}</Text>
                <Text style={{ color: Colors.text_primary }}>{currentCoinChange}</Text>
            </View>
            <View style={styles.chartContainer}>
                <CryptoChart
                    labels={dates.slice(-7)}
                    series={[
                        {
                            data: coinData.slice(-7)
                        }
                    ]}
                    decimalPlaces={coinData.slice(-10)[0]<10 ? 4 : 2}
                />
            </View>
            <View style={styles.buttonsContainer}>
                <Text style={{ color: Colors.text_primary }}>Buttons Container</Text>
            </View>
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
        justifyContent: 'space-evenly'
    },
    chartContainer:{
        width: '100%',
        marginVertical: 20,
    },
    buttonsContainer:{

    }
})