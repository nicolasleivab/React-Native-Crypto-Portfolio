import React, { useState, useEffect } from 'react';
import { StyleSheet, Text, View, ScrollView, Button} from 'react-native';
import CoinBlock from '../../components/CoinBlock/CoinBlock';

export default function Coins() {
  const apiKey = {
    key: 'your CMC api key'
  };
  const [coins, setCoins] = useState([]);
  const [allCoins, setAllCoins] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

useEffect(() => {
  // loading and error states
  setLoading(true)
  setError(null)
// Fetch Top 100 coins from CoinCap
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

useEffect(() => {
  // Fetch all coins from coinmarketcap
  fetch("https://pro-api.coinmarketcap.com/v1/cryptocurrency/map?CMC_PRO_API_KEY="+apiKey.key)
    .then(res => res.json())
    .then(json => {
      if (json.data) {
        const rawData = json.data;

        setAllCoins(rawData)
        setLoading(false)
        console.log(allCoins[3]['slug']);
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
    <ScrollView style={{width:'90%', marginTop: 50, marginBottom: 50, paddingRight: 10, paddingLeft: 10}}>
      {coins.map(coin => (
        <CoinBlock 
        key={coin['id']} 
        coinID={allCoins[0] != undefined && coins[0] != undefined ? 
          (allCoins.find(d => d['name'] == coin['name'] || d['slug'] == coin['id'] || d['symbol'] == coin['symbol']))['id'] : 1} 
        coinName={coin['name']} 
        coinPrice={coin['priceUsd']}/>
      ))}
    </ScrollView> : <View><Text style={{ color: 'white' }}>{'loading...'}</Text></View>
    }
  </View>
);
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#1c1e2e',
    alignItems: 'center',
    justifyContent: 'center',
  },
});