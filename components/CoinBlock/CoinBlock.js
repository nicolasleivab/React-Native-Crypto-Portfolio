import React from 'react';
import { StyleSheet, Text, View, Image, TouchableOpacity} from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';

export default function CoinBlock(props) {
  const { Colors } = props;

return (
  <TouchableOpacity onPress={props.navigate}>
  <View style={styles(Colors).flexContainer}>
    <View style={styles(Colors).nameContainer}>
      <View style={{marginBottom:30}}>
        <Text style={{color:Colors.text_primary, fontSize:10}}>{props.ranking}</Text>
      </View>
      <View style={{justifyContent:'center', marginRight: 10}}>
        <Image style={{ width: 32, height: 32 }} source={{ uri: 'https://s2.coinmarketcap.com/static/img/coins/64x64/'+props.coinID+'.png' }} />
      </View>
        <View style={{ width: 0, flexGrow: 1,}}>
       <Text style={{ color: Colors.text_primary, fontSize: 17, fontWeight: '700'}}>{props.coinSymbol}</Text>
        <Text style={{ color: Colors.text_primary, fontSize: 12 }}>{props.coinName}</Text>
      </View>
    </View>
    <View style={styles(Colors).priceContainer}>
      <Text style={{ color: Colors.text_primary }}>{'$'+props.coinPrice}</Text>
      <Text style={props.coinChange > 0 ? { color: Colors.positive_value } : { color: Colors.negative_value}}>{props.coinChange > 0 ? '+'+props.coinChange+'%' : props.coinChange+'%'}</Text>
    </View>
    <View style={styles(Colors).priceContainer}>
      <Text style={{ color: Colors.text_primary }}>{'$' + props.coinMarket}</Text>
      <Text style={{ color: Colors.text_primary }}>{'$' + props.coinVolume}</Text>
    </View>
    <View style={styles(Colors).starContainer}>
      <TouchableOpacity onPress={() => (props.changeStar(props.coinName))}>
    <Icon style={props.favOn > 0 ? { color: Colors.star_on } : { color: Colors.star_off2 }} name="ios-star" size={35}/>
    </TouchableOpacity>
    </View>
  </View>
  </TouchableOpacity>
);
}

const styles = (Colors) => StyleSheet.create({
  flexContainer: {
    flexDirection: 'row',
    justifyContent: 'flex-start',
    alignItems: 'center',
    backgroundColor: Colors.coinblock,
    borderRadius: 5,
    shadowOffset: { width: 0, height: 3,},
    shadowColor: Colors.shadow,
    shadowOpacity: 1,
    shadowRadius: 2.5,
    elevation: 5,
    marginTop: 20,
    marginLeft: 0,
    marginRight: 12,
    height: 100,
    width: '98%'
  },
  nameContainer: {
    flexDirection: 'row', 
    flex: 2, 
    marginHorizontal: 10,
    width: '100%' 
  },
  priceContainer: {
    flex: 1.5, 
    alignItems: 'center', 
    marginVertical: 5, 
    width: '100%',
  },
  starContainer: {
    flex: 1, 
    marginLeft: 10, 
    width: '100%' 
  }
});
