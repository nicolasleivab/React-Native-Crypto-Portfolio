import React, { useState } from 'react';
import { View, Text, StyleSheet, ScrollView} from 'react-native';
import Colors from '../../constants/colors';
import SearchCoin from '../../components/SearchCoin/SearchCoin';
import MainButton from '../../components/MainButton/MainButton';
import CryptoChart from '../../components/LineChart/LineChart';

export default function Portfolio() {

const [value, onChangeText] = useState('');
const [balance, setBalance] = useState([]);
const [error, setError] = useState(null);
const [loading, setLoading] = useState(true);
const [errMsg, setErrMsg] = useState('');

const fetchAdress = ()=> {
    // Fetch eth address token balances
    setErrMsg('')
    fetch("https://api.ethplorer.io/getAddressInfo/" + value +'?apiKey=freekey')
        .then(res => res.json())
        .then(json => {
            if (json['address']) {
                const rawData = json;

                console.log(rawData);
                setBalance(rawData);
                setLoading(false);
                    
                
            }else{
                const msg = json;
                setErrMsg(msg['error']['message'])
            }
        })
        .catch(err => {
            setError(err);
            console.log('adress error:'+err);
            setErrMsg('error: '+ err);
            setLoading(false);
        })
}

    return (
        <View style={styles.screen}>
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
            <CryptoChart
                labels={categories}
                series={[
                    {
                        data: coinSeries
                    }
                ]}
                decimalPlaces={coinSeries.slice(-1)[0] < 10 ? 4 : 2}
            />
            <View style={style.balance}>
                <ScrollView>
                    <TokenBlock/>
                </ScrollView>
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
    container:{
        flexDirection: 'row',
        width:'100%',
        alignItems: 'flex-start',
        justifyContent: 'center'
    },
    header:{
        flex: 1,
        width: '100%',
        alignItems: 'center',
        justifyContent: 'flex-start'
    }
})