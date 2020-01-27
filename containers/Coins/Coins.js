import React, { useState, useEffect } from 'react';
import { StyleSheet, Text, View, ScrollView, Button} from 'react-native';
import CoinBlock from '../../components/CoinBlock/CoinBlock';

export default function Coins() {
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
    <ScrollView style={{width:'90%', marginTop: 50, marginBottom: 50, paddingRight: 10, paddingLeft: 10}}>
      {coins.map(coin => (
      <CoinBlock key={coin['id']} coinName={coin['name']} coinPrice={coin['priceUsd']}/>
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