import React, { useState, useEffect } from 'react';
import { StyleSheet, Text, View, Image, TouchableOpacity} from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';

export default function CoinBlock(props) {

return (
  <View style={styles.flexContainer}>
    <View style={{flexDirection: 'row', flex: 2, marginLeft: 10}}>
      <View style={{marginBottom:30}}>
        <Text style={{color:'white', fontSize:10}}>{props.ranking}</Text>
      </View>
      <View style={{justifyContent:'center', marginRight: 10}}>
        <Image style={{ width: 32, height: 32 }} source={{ uri: 'https://s2.coinmarketcap.com/static/img/coins/64x64/'+props.coinID+'.png' }} />
      </View>
      <View>
       <Text style={{ color: 'white', fontSize: 17, fontWeight: '700'}}>{props.coinSymbol}</Text>
       <Text style={{ color: 'white' }}>{props.coinName}</Text>
      </View>
    </View>
    <View style={{ flex: 1.5, alignItems: 'center', marginLeft:30}}>
      <Text style={{ color: 'white' }}>{'$'+props.coinPrice}</Text>
      <Text style={props.coinChange > 0 ? { color: '#00ff80' } : { color: '#ff6666'}}>{props.coinChange > 0 ? '+'+props.coinChange+'%' : props.coinChange+'%'}</Text>
    </View>
    <View style={{ flex: 1.5, alignItems: 'center'}}>
      <Text style={{ color: 'white' }}>{'$' + props.coinMarket}</Text>
      <Text style={{ color: 'white' }}>{'$' + props.coinVolume}</Text>
    </View>
    <View style={{ flex: 1, marginLeft: 20}}>
      <TouchableOpacity onPress={() => (props.changeStar(props.coinName))}>
    <Icon style={props.favOn > 0 ? { color: 'yellow' } : { color: '#555' }} name="ios-star" size={35}/>
    </TouchableOpacity>
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
    marginRight: 12,
    height: 100,
    width: '98%'
  },
});