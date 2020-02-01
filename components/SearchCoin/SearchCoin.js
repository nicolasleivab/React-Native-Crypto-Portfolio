import React from 'react';
import { StyleSheet, Text, View, TextInput} from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
import Colors from './../../constants/colors';

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
    <Icon style={styles.searchIcon} name="ios-search" size={20} color="#000" />

  </View>
);
}

const styles = StyleSheet.create({
  container: {
    width: '70%',
    marginRight: 15
  },
    
  InputCoin: {
    marginTop: 30,
    height: 40, 
    color: Colors.text_primary,
    padding: 10,
    paddingLeft: 32,
    backgroundColor: Colors.secondary,
    borderRadius: 10,
  },

  searchIcon: {
    padding: 10,
    position: 'absolute',
    top: 30,
    color: Colors.text_primary
  }
});