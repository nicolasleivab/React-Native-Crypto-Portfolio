import React, { useState } from 'react';
import { StyleSheet, Text, View, Button} from 'react-native';

export default function App() {
  const [outputText, setOutputText] = useState('No data');
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
