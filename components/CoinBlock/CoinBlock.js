import React, { useState, useEffect } from 'react';
import { StyleSheet, Text, View, Image } from 'react-native';

export default function CoinBlock(props) {

return (
  <View style={styles.flexContainer}>
    <View style={{flexDirection: 'row'}}>
      <View style={{justifyContent:'center', marginRight: 10}}>
        <Image style={{ width: 32, height: 32 }} source={{ uri: 'https://s2.coinmarketcap.com/static/img/coins/64x64/'+props.coinID+'.png' }} />
      </View>
      <View>
       <Text style={{ color: 'white', fontSize: 17, fontWeight: '700'}}>{props.coinSymbol}</Text>
       <Text style={{ color: 'white' }}>{props.coinName}</Text>
      </View>
    </View>
    <View>
      <Text style={{ color: 'white' }}>{'$ '+props.coinPrice}</Text>
      <Text style={{ color: 'white' }}>{props.coinChange > 0 ? '+'+props.coinChange+'%' : props.coinChange+'%'}</Text>
    </View>
    <View>
      <Text style={{ color: 'white' }}>{'$ ' + props.coinMarket}</Text>
      <Text style={{ color: 'white' }}>{'$ ' + props.coinVolume}</Text>
    </View>
  </View>
);
}

const styles = StyleSheet.create({
  flexContainer: {
    flexDirection: 'row',
    justifyContent: 'space-evenly',
    alignItems: 'center',
    backgroundColor: '#445378',
    borderRadius: 5,
    shadowOffset: { width: 0, height: 6,},
    shadowColor: 'black',
    shadowOpacity: 1,
    shadowRadius: 7.5,
    elevation: 7,
    marginTop: 20,
    marginLeft: 0,
    marginRight: 10,
    height: 100,
    width: '95%'
  },
});