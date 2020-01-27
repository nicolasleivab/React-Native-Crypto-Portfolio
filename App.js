import React, { useState, useEffect } from 'react';
import { StyleSheet, Text, View, Button} from 'react-native';
import CoinBlock from './components/CoinBlock/CoinBlock';

export default function App() {
  const [coins, setCoins] = useState([]);
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState(null)

// Fetch Top 100 coins from CoinCap
useEffect(() => {

  // loading and error states
  setLoading(true)
  setError(null)

  fetch("https://api.coincap.io/v2/assets")
    .then(res => res.json())
    .then(json => {
      if (json.data) {
        const formattedData = json.data;
        //format data
        formattedData.forEach(d => {
          if(d.priceUsd >= 1){
          d.priceUsd = Math.floor(d.priceUsd * 100) / 100;
          }else{
          d.priceUsd = Math.floor(d.priceUsd * 10000) / 10000;
          }
          d.supply = Math.floor(d.supply * 10000) / 10000;
          d.maxSupply = Math.floor(d.maxSupply * 10000) / 10000;
          d.marketCapUsd = Math.floor(d.marketCapUsd * 10000) / 10000;
          d.volumeUsd24Hr = Math.floor(d.volumeUsd24Hr * 10000) / 10000;
          d.changePercent24Hr= Math.floor(d.changePercent24Hr * 10000) / 10000;
          d.vwap24Hr = Math.floor(d.vwap24Hr * 10000) / 10000;
        });

        setCoins(formattedData)
        setLoading(false)
      }
    })
    .catch(err => {
      setError(err)
      setLoading(false)
    })
}, []);

return (
  <View style={styles.container}>
    {coins[0] != undefined ?
    <View style={{width:'80%'}}>
      <CoinBlock coinName={coins[0]['name']} coinPrice={coins[0]['priceUsd']}/>
      <CoinBlock coinName={coins[1]['name']} coinPrice={coins[1]['priceUsd']}/>
      <CoinBlock coinName={coins[2]['name']} coinPrice={coins[2]['priceUsd']}/>
      <CoinBlock coinName={coins[3]['name']} coinPrice={coins[3]['priceUsd']}/>
      <CoinBlock coinName={coins[4]['name']} coinPrice={coins[4]['priceUsd']}/>
      <CoinBlock coinName={coins[5]['name']} coinPrice={coins[5]['priceUsd']}/>
      <CoinBlock coinName={coins[6]['name']} coinPrice={coins[6]['priceUsd']}/>
      <CoinBlock coinName={coins[7]['name']} coinPrice={coins[7]['priceUsd']}/>
      <CoinBlock coinName={coins[8]['name']} coinPrice={coins[8]['priceUsd']}/>
      <CoinBlock coinName={coins[9]['name']} coinPrice={coins[9]['priceUsd']}/>
    </View>: <View><Text>{'loading...'}</Text></View>
    }
  </View>
);
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
