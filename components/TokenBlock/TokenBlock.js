import React from 'react';
import { StyleSheet, Text, View, Image, TouchableOpacity } from 'react-native';

export default function CoinBlock(props) {
    const { Colors } = props;
    return (
            <View style={styles(Colors).flexContainer}>
                <Text style={styles(Colors).nameText}>{props.coinName}</Text>
                <View style={styles(Colors).balanceContainer}>
                    <Text style={styles(Colors).balanceText}>{props.coinBalance}</Text>
                    <View style={styles(Colors).priceContainer}>
                        <Text style={styles(Colors).priceText}>{'$'+props.coinAmount}</Text>
                        <Text style={styles(Colors).priceText}>{' ('+props.priceChange+'%)'}</Text>
                    </View>
                </View>
            </View>
    );
}

const styles = (Colors) => StyleSheet.create({
    flexContainer: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        backgroundColor: Colors.coinblock,
        borderRadius: 5,
        shadowOffset: { width: 0, height: 3, },
        shadowColor: Colors.shadow,
        shadowOpacity: 1,
        shadowRadius: 2.5,
        elevation: 5,
        paddingHorizontal: 10,
        marginLeft: 5,
        marginVertical: 5,
        height: 40,
        width: '98%'
    },
    balanceContainer: {
        justifyContent: 'space-between',
        alignItems: 'center',
    },
    priceContainer: {
        flexDirection: 'row'
    },
    nameText: {
        color: Colors.text_primary
    },
    balanceText: {
        color: Colors.text_primary
    },
    priceText: {
        color: Colors.text_secondary,
        fontSize: 12
    }
});