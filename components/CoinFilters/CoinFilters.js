import React, { useState, useEffect } from 'react';
import { StyleSheet, Text, View} from 'react-native';

export default function CoinFilters(props) {

return (
<View style={styles.filtersFlex}>
    <Text style={{color: '#CCC', fontSize: 10, marginLeft: 30}}>COIN</Text>
    <Text style={{ color: '#CCC', fontSize: 10, marginLeft: 20}}>PRICE / 24H CHG</Text>
    <Text style={{ color: '#CCC', fontSize: 10}}>M.CAP / VOL</Text>
</View>
);
}

const styles = StyleSheet.create({
    filtersFlex: {
        flexDirection: "row",
        justifyContent: 'space-evenly',
        alignItems: 'center',
        width: '100%',
        height: 35,
        marginTop: 20,
        backgroundColor: '#1c1e2e'
    },
});