import React from 'react';
import { StyleSheet, Text, View, Image, TouchableOpacity } from 'react-native';
import Colors from '../../constants/colors';

export default function CoinBlock(props) {

    return (
            <View style={styles.flexContainer}>
                <Text style={styles.nameText}>{props.coinName}</Text>
                <View style={styles.balanceContainer}>
                    <Text style={styles.balanceText}>{props.coinBalance}</Text>
                    <View style={styles.priceContainer}>
                        <Text style={styles.priceText}>{'$'+props.coinAmount}</Text>
                        <Text style={styles.priceText}>{' ('+props.priceChange+'%)'}</Text>
                    </View>
                </View>
            </View>
    );
}

const styles = StyleSheet.create({
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