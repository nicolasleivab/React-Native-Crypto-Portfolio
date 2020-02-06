import React, { useState, useEffect } from 'react';
import {View, Text, StyleSheet, Button, ActivityIndicator} from 'react-native';
import Colors from '../../constants/colors';

export default function Chart (props){
    const currentCoinID = props.navigation.getParam('coinID');
    const [coinData, setCoinData] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        // Fetch current coin data
        fetch("https://api.coincap.io/v2/assets/"+currentCoinID+"/history?interval=m15")
            .then(res => res.json())
            .then(json => {
                if (json.data) {
                    const rawData = json.data;;

                    console.log('coin data ready');
                    setCoinData(rawData)
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
            <Text>Chart Screen</Text>
            <Button title='GET COIN DATA' onPress={()=>console.log(coinData)}/>
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
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: Colors.primary
    }
})