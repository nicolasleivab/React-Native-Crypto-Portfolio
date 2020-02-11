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
const [coinList, setCoins] = useState('');

useEffect(() => {  
//fetch list of coins  
fetch('https://api.coingecko.com/api/v3/coins/list')
    .then(res => res.json())
    .then(json => {
        if (json[0]['id']) {
        
        setCoins(json);          
        setLoadingCoins(false);
        } else {
            const msg = json;
            setErrMsg(msg['error'])
        }
    })
    .catch(err => {
        setError(err);
        console.log('adress error:' + err);
        setErrMsg('error: ' + err);
        setLoadingCoins(false);
    })
}, []);

const fetchAdress = ()=> {
    // Fetch eth address token balances
    setLoadMsg('loading...');
    setErrMsg('');
    setBalance([]);

    fetch("https://api.ethplorer.io/getAddressInfo/" + value +'?apiKey=freekey')
        .then(res => res.json())
        .then(json => {
            if (json['address']) {
                
                const ethData = json['ETH'];
                const tokensData = json['tokens'];
                const balanceData = [];
                console.log(tokensData.length);

                const ethObj = {};
                ethObj['name'] = 'Ethereum';
                ethObj['balance'] = ethData['balance'].toFixed(4);
                ethObj['rate'] = ethData['price']['rate'].toFixed(4);
                ethObj['diff'] = ethData['price']['diff'].toFixed(2);
                balanceData.push(ethObj);
    
                for(let i = 0; i < tokensData.length; i++){
                    const token = {};
                    token['name'] = tokensData[i]['tokenInfo']['name'];
                    token['balance'] = (tokensData[i]['balance']/1000000000000000000).toFixed(2);
                    if (tokensData[i]['tokenInfo']['price']){
                    token['rate'] = tokensData[i]['tokenInfo']['price']['rate'].toFixed(4);
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
                        const coinsID =['bitcoin', 'ethereum', 'ripple'];
                        //fetch loop for each coin in the balance
                        const coinUrls = async () => {
                            let coinsData = []
                            for (let i = 0; i < coinsID.length; i++) {
                                const response = await fetch('https://api.coingecko.com/api/v3/coins/' + coinsID[i] + '/market_chart?vs_currency=usd&days=max')
                                const json = await response.json()
                                const pricesU = json['prices']
                                coinsData.push(pricesU.slice(-3))
                                
                            if(i === coinsID.length - 1){
                                setLoadingSeries(false);
                                console.log(coinsData);
                            }
                            }
                        }    
                        coinUrls();
                    }
                }

                setLoadMsg('');
            }else{
                const msg = json;
                setErrMsg(msg['error']['message'])
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
                labels={[1, 2, 3, 4, 5]}
                series={[
                    {
                        data: [100, 120, 200, 50, 100]
                    }
                ]}
                chartHeight={210}
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
        height: '45%'
    }
})