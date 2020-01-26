import React, { useState, useEffect } from 'react';
import { StyleSheet, Text, View, Button} from 'react-native';


export default function App() {
  const [outputText, setOutputText] = useState('No data');
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
      setLoading(false)
      if (json.data) {
        setCoins(json.data)
        console.log(coins[3]['name']);
      } else {
        setCoins([]);
      }
    })
    .catch(err => {
      setError(err)
      setLoading(false)
    })
}, []);

return (
  <View style={styles.container}>
    <Text>{outputText}</Text>
    <Text>{coins[3]['name']}</Text>
    <Button title='BTC' onPress={() => setOutputText('BTC Data')}/>
    <Button title='Refresh' onPress={() => setOutputText('No Data')}/>
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
