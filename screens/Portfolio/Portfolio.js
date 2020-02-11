import React, { useState } from 'react';
import { View, Text, StyleSheet, ScrollView, ActivityIndicator} from 'react-native';
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
const [errMsg, setErrMsg] = useState('');
const [loadMsg, setLoadMsg] = useState('');

const fetchAdress = ()=> {
    // Fetch eth address token balances
    setLoadMsg('loading...');

    fetch("https://api.ethplorer.io/getAddressInfo/" + value +'?apiKey=freekey')
        .then(res => res.json())
        .then(json => {
            if (json['address']) {
                
                const ethData = json['ETH'];
                const tokensData = json['tokens'];
                const balanceData = [];

                const ethObj = {};
                ethObj['name'] = 'Ethereum';
                ethObj['balance'] = ethData['balance'].toFixed(4);
                ethObj['rate'] = ethData['price']['rate'].toFixed(4);
                ethObj['diff'] = ethData['price']['diff'].toFixed(2);
                balanceData.push(ethObj);
                setBalance(balanceData);
                /*
                for(let i = 0; i < tokensData.length; i++){
                    const token = {};
                    token['name'] = tokensData[i]['tokenInfo']['name'];
                    token['balance'] = tokensData[i]['balance'].toFixed(2);
                    token['rate'] = tokensData[i]['tokenInfo']['price']['rate'].toFixed(4);
                    token['diff'] = tokensData[i]['tokenInfo']['price']['diff'].toFixed(2);

                    balanceData.push(token)
                    if(i === tokensData.length - 1){
                        setBalance(balanceData);
                        setLoading(false);
                        console.log(balanceData);
                    }
                }*/
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
            {balance[0] ? 
            <View style={styles.tokensContainer}>
            <CryptoChart
                labels={[1, 2, 3, 4, 5]}
                series={[
                    {
                        data: [100, 120, 200, 50, 100]
                    }
                ]}
                decimalPlaces={2}
            />
            <View style={styles.balance}>
                <ScrollView>
                    {balance.map(coin => (
                    <TokenBlock
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
        marginVertical: 5,
        flexDirection: 'row',
        width:'100%',
        alignItems: 'flex-start',
        justifyContent: 'center'
    },
    tokensContainer:{
        width: '100%'
    },
    header:{
        width: '100%',
        alignItems: 'center',
        justifyContent: 'flex-start'
    }
})