import React, { useState, useEffect } from 'react';
import { StyleSheet, Text, View, Image } from 'react-native';

export default function CoinBlock(props) {

return (
  <View style={styles.flexContainer}>
    <Image style={{ width: 32, height: 32 }} source={{ uri: 'https://s2.coinmarketcap.com/static/img/coins/64x64/'+props.coinID + 1 +'.png' }} />
    <Text style={{color: 'white'}}>{props.coinName}</Text>
    <Text style={{ color: 'white' }}>{'$ '+props.coinPrice}</Text>
  </View>
);
}

const styles = StyleSheet.create({
  flexContainer: {
    flexDirection: 'row',
    justifyContent: 'space-evenly',
    alignItems: 'center',
    backgroundColor: '#2e3851',
    borderRadius: 5,
    shadowOffset: { width: 10, height: 10, },
    shadowColor: 'black',
    shadowOpacity: 1.0,
    shadowRadius: 1,
    elevation: 3,
    marginTop: 20,
    height: 130,
    width: '100%'
  },
});