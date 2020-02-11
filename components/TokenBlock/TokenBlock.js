import React from 'react';
import { StyleSheet, Text, View, Image, TouchableOpacity } from 'react-native';
import Colors from '../../constants/colors';

export default function CoinBlock(props) {

    return (
        <TouchableOpacity onPress={props.navigate}>
            <View style={styles.flexContainer}>
                <Text>{coinName}</Text>
                <View style={styles.balanceContainer}>
                    <Text>{coinBalance}</Text>
                    <Text>{coinCash}</Text>
                </View>
            </View>
        </TouchableOpacity>
    );
}

const styles = StyleSheet.create({
    flexContainer: {
        flexDirection: 'row',
        justifyContent: 'flex-start',
        alignItems: 'center',
        backgroundColor: Colors.coinblock,
        borderRadius: 5,
        shadowOffset: { width: 0, height: 3, },
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
    balanceContainer: {
        justifyContent: 'space-between',
        alignItems: 'center',
    }
});