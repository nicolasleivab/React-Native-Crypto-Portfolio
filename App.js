import React, { useState, useEffect } from 'react';
import { StyleSheet, Text, View, Button} from 'react-native';

const top100Coins = [];

export default function App() {
  const [outputText, setOutputText] = useState('No data');

// Fetch Top 100 coins from CoinCap
useEffect(() => {
  fetch("https://api.coincap.io/v2/assets")
    .then(res => res.json())
    .then(
      (result) => {
        const coins = result.data;
        coins.forEach(e => {
            let newObj = { id: e.id, name: e.name, symbol: e.symbol }
            top100Coins.push(newObj)
        });

        let updatedCoins = [...top100Coins] // copy array to set state in an immutable fashion
      },

      (error) => {
      }
    )

});

  return (
    <View style={styles.container}>
      <Text>{outputText}</Text>
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
