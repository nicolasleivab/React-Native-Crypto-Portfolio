import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, ScrollView } from 'react-native';
import Colors from '../../constants/colors';
import SearchCoin from '../../components/SearchCoin/SearchCoin';
import MainButton from '../../components/MainButton/MainButton';
import CryptoChart from '../../components/LineChart/LineChart';
import TokenBlock from '../../components/TokenBlock/TokenBlock';

export default function Portfolio() {

const [value, onChangeText] = useState('');
const [balance, setBalance] = useState([]);
const [error, setError] = useState(null);
const [loading, setLoading] = useState(true);
const [loadingCoins, setLoadingCoins] = useState(true);
const [loadingSeries, setLoadingSeries] = useState(true);
const [errMsg, setErrMsg] = useState('');
const [loadMsg, setLoadMsg] = useState('');
const [ETH, setETH] = useState('');
const [series, setSeries] = useState([]);
const [categories, setCategories] = useState([]);

useEffect(() => {  
//fetch ethereum historical prices
    fetch('https://api.coingecko.com/api/v3/coins/ethereum/market_chart?vs_currency=usd&days=max')
    .then(res => res.json())
    .then(json => {
        if (json['prices']) {
        
        setETH(json['prices'].slice(-60));          
        setLoadingCoins(false);
        } else {
            const msg = json;
            setErrMsg(msg['error'])
        }
    })
    .catch(err => {
        setError(err);
        console.log('adress error:' + err);
        setLoadMsg('');
        setErrMsg('error: ' + err);
        setLoadingCoins(false);
    })
}, []);

const dateFormat = require('dateformat');

const fetchAdress = ()=> {
    // Fetch eth address token balances
    setLoadMsg('loading...');
    setLoadingSeries(true);
    setErrMsg('');
    setBalance([]);

    fetch("https://api.ethplorer.io/getAddressInfo/" + value +'?apiKey=freekey')
        .then(res => res.json())
        .then(json => {
            if (json['address']) {
                setSeries([]);
                setCategories([]);
                
                const ethData = json['ETH'];
                const tokensData = json['tokens'];
                const balanceData = [];

                const ethObj = {};
                ethObj['name'] = 'Ethereum';
                ethObj['symbol'] = 'ETH';
                ethObj['balance'] = ethData['balance'].toFixed(4);
                ethObj['rate'] = ethData['price']['rate'].toFixed(4);
                ethObj['diff'] = ethData['price']['diff'].toFixed(2);
                balanceData.push(ethObj);
    
                for(let i = 0; i < tokensData.length; i++){
                    const token = {};
                    token['name'] = tokensData[i]['tokenInfo']['name'];
                    token['symbol'] = tokensData[i]['tokenInfo']['symbol'];
                    token['address'] = tokensData[i]['tokenInfo']['address'];
                    token['balance'] = (tokensData[i]['balance']/1000000000000000000).toFixed(2);
                    if (tokensData[i]['tokenInfo']['price']){
                    token['rate'] = tokensData[i]['tokenInfo']['price']['rate'].toFixed(8);
                    token['diff'] = tokensData[i]['tokenInfo']['price']['diff'].toFixed(2);
                    }else{
                        token['rate'] = 0;
                        token['diff'] = ''; 
                    }

                    balanceData.push(token)
                    if(i === tokensData.length - 1){
                        setBalance(balanceData);
                        setLoading(false);
                        //get each coin IDs
                        const coinsAdd =[];
                        
                        for(let i = 1; i < balanceData.length; i++){
                            coinsAdd.push(balanceData[i]['address']);
                            
                        };
                        
                        const balanceFiltered = balanceData.filter((d)=> d.rate !== 0);
                        console.log(balanceFiltered);
                        if (balanceFiltered.length !== 1) {
                        //fetch loop for each coin in the balance
                        const coinUrls = async () => {
                            const coinsData = []
                            for (let i = 0; i < coinsAdd.length; i++) {
                                const response = await fetch('https://api.ethplorer.io/getTokenPriceHistoryGrouped/'+coinsAdd[i]+'?apiKey=freekey')
                                const json = await response.json()
                                if(json['history']['prices']){
                                const pricesU = json['history']['prices'].slice(-60)
                                coinsData.push(pricesU);

                               
                                    //console.log(pricesU)
                                    const series = [];
                                    const categories = [];
                                  
                                    for(let k = 0; k < 60; k++){
                                        let seriesSum = 0;
                                        //sum each coin's worth in order to get total balance for each period
                                      
                                        for (let j = 0; j < coinsData.length; j++) {
                                                seriesSum = seriesSum + coinsData[j][k]['close'] * balanceData[j + 1]['balance']
                                                    + ETH[k][1] * balanceData[0]['balance'];
                                        }
                                        
                                        //push series 
                                        if (k % 2 === 0){
                                        series.push(seriesSum);
                                        }
                                        //push categories
                                        if (k % 10 === 0){
                                        const currentDate = new Date(ETH[k][0]);
                                        categories.push(dateFormat(currentDate, "d/m"));
                                           
                                        }
                                        if(k === 59){
                                            //console.log(series);
                                            //console.log(categories);
                                            setSeries(series);
                                            setCategories(categories);
                                        }
                                    }
                                
                                
                            }
                           
                            }
                            setLoadMsg('');
                            setLoadingSeries(false);
                        }    
                        coinUrls();
                        } else if(balanceFiltered.length === 1){
                            console.log('OK?');
                            const series = [];
                            const categories = [];
                            //Just ETH case
                            for (let k = 0; k < 60; k++) {

                                let currentETHBalance = ETH[k][1] * balanceData[0]['balance'];

                                //push series 
                                if (k % 2 === 0) {
                                    series.push(currentETHBalance);
                                }
                                //push categories
                                if (k % 10 === 0) {
                                    const currentDate = new Date(ETH[k][0]);
                                    categories.push(dateFormat(currentDate, "d/m"));

                                }
                                if (k === 59) {
                                    //console.log(series);
                                    //console.log(categories);
                                    setSeries(series);
                                    setCategories(categories);
                                    setLoadMsg('');
                                    setLoadingSeries(false);
                                    
                                }
                            }
                        }
                    }
                }

            }else{
                const msg = json;
                setLoadMsg('');
                setErrMsg(msg['error']['message']);
               
                
            }
        })
        .catch(err => {
            setError(err);
            console.log('adress error:'+err);
            setLoadMsg('');
            setErrMsg('error: '+ err);
            setLoading(false);
            
        })
}

    return (
        <View style={styles.screen}>
            <View style={styles.globalContainer}>
            <View style={styles.header}>
                <View style={styles.container}>
                    <SearchCoin
                        textChange={text => onChangeText(text)}
                        value={value}
                        placeholder={'ETH address...'}
                    />
                <View style={{marginTop:35}}>  
                    <MainButton
                        btnText={'Go'}
                        dataHandler={fetchAdress}
                    />
                </View>
            </View>
                <View>
                    <Text style={{color:Colors.text_primary, fontStyle: "italic"}}>{errMsg}</Text>
                </View>
            </View>
            {balance[0] && loadingCoins !== true && loadingSeries !== true ? 
            <View style={styles.tokensContainer}>
            <CryptoChart
                labels={categories}
                series={[
                    {
                        data: series
                    }
                ]}
                chartHeight={225}
                verticalRotation={30}
                horizontalRotation={-45}
                decimalPlaces={2}
            />
            <View style={styles.balance}>
                <ScrollView style={{flex:1}}>
                    {balance.map(coin => (
                    <TokenBlock
                        key={coin['name']}
                        coinName={coin['name']}
                        coinBalance={coin['balance']}
                        coinAmount={(coin['rate']*coin['balance']).toFixed(2)}
                        priceChange={coin['diff']}
                    />
                    ))}
                </ScrollView>
            </View>
                    </View> : <View style={styles.container}>
                                <Text style={{ color: Colors.text_primary, fontStyle: "italic" }}>{loadMsg}</Text>
                              </View>}
            </View>
        </View>
    );
};

Portfolio.navigationOptions = {
    headerStyle: {
        backgroundColor: Colors.secondary,
    },
    headerTintColor: Colors.text_primary,
    title: 'Portfolio',
    headerTitleAlign: 'center'
}
const styles = StyleSheet.create({
    screen: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: Colors.primary,
        width: '100%'
    },
    globalContainer: {
        flex: 1,
    },
    container:{
        marginTop: -15,
        marginBottom: 5,
        flexDirection: 'row',
        width:'100%',
        alignItems: 'flex-start',
        justifyContent: 'center'
    },
    tokensContainer:{
        width: '100%',
        marginTop: -10
    },
    header:{
        width: '100%',
        alignItems: 'center',
        justifyContent: 'flex-start'
    },
    balance:{
        height: '40%'
    }
})