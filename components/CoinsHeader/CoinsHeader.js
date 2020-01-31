import React, { useState, useEffect } from 'react';
import { StyleSheet, Text, View} from 'react-native';

export default function CoinsHeader(props) {

return (
<View style={styles.globalFlex}>
    <View style={{alignItems:'flex-end'}}>
        <Text style={{color: 'white', fontSize: 10}}>BTC DOMINANCE</Text>
        <Text style={{ color: 'white', fontSize: 10 }}>{props.btcDom}</Text>
    </View>
    <View style={{ alignItems: 'flex-end' }}>
        <Text style={{ color: 'white', fontSize: 10}}>TOTAL MARKET CAP</Text>
        <View style={{flexDirection: 'row'}}>
            <Text style={{ color: 'white', fontSize: 10 }}>{props.mCap}</Text>
            <Text style={props.capChange > 0 ? { color: '#00ff80', fontSize: 10 }:
            { color: '#ff6666' }}>{props.capChange > 0 ? ' (+' + props.capChange 
                +')': '('+props.capChange+')'}</Text>
    </View>
    </View >
    <View style={{ alignItems: 'flex-end' }}>
        <Text style={{ color: 'white', fontSize: 10}}>TOTAL VOLUME</Text>
        <Text style={{ color: 'white', fontSize: 10 }}>{props.totalVol}</Text>
    </View>
</View>
);
}

const styles = StyleSheet.create({
    globalFlex: {
        flexDirection: "row",
        justifyContent: 'space-evenly',
        alignItems: 'center',
        width: '100%',
        marginTop: 50
    },
});
