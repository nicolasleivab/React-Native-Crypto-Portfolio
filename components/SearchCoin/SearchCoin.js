import React, { useState, useEffect } from 'react';
import { StyleSheet, Text, View, TextInput } from 'react-native';

export default function SearchCoin(props) {

return (    
  <View style={styles.container}>
   <TextInput
        placeholder='Filter coins...'
        style={styles.InputCoin}
        onChangeText={props.textChange}
        value={props.value}
        onKeyPress={props.filterCoin}
   />
  </View>
);
}

const styles = StyleSheet.create({
  container: {
    width: '70%'
  },
    
  InputCoin: {
    marginTop: 50,
    height: 40, 
    color: 'white',
    padding: 10,
    borderColor: 'gray', 
    borderWidth: 1 
  },
});