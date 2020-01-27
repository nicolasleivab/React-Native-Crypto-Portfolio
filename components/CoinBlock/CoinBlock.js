import React, { useState, useEffect } from 'react';
import { StyleSheet, Text, View, Button } from 'react-native';

export default function CoinBlock(props) {

return (
  <View style={styles.flexContainer}>
    <Text>{props.coinName}</Text>
    <Text>{'$ '+props.coinPrice}</Text>
  </View>
);
}

const styles = StyleSheet.create({
  flexContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
});