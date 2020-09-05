import React from "react";
import { StyleSheet, Text, View } from "react-native";
import Colors from './../../constants/colors';

export default function CoinInfo(props) {
    const { Colors } = props;
    return (
        <View style={styles(Colors).infoContainer}>
            <View style={styles(Colors).infoItem}>
                <Text style={{ color: Colors.text_primary }}>ATH:</Text>
                <Text style={{ color: Colors.text_primary }}>{'$' + props.ATH}</Text>
            </View>
            <View style={styles(Colors).infoItem}>
                <Text style={{ color: Colors.text_primary }}>Market Cap:</Text>
                <Text style={{ color: Colors.text_primary }}>{'$'+props.marketCap}</Text>
            </View>
            <View style={styles(Colors).infoItem}>
                <Text style={{ color: Colors.text_primary }}>24Hr Volume:</Text>
                <Text style={{ color: Colors.text_primary }}>{'$'+props.vol}</Text>
            </View>
            <View style={styles(Colors).infoItem}>
                <Text style={{ color: Colors.text_primary }}>Supply:</Text>
                <Text style={{ color: Colors.text_primary }}>{props.supply}</Text>
            </View>
        </View>
    );
}

const styles = (Colors) => StyleSheet.create({
    infoContainer: {
        marginTop: 20,
    },
    infoItem: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'flex-start',
        backgroundColor: Colors.coinblock,
        borderRadius: 5,
        shadowOffset: { width: 0, height: 6, },
        shadowColor: Colors.shadow,
        shadowOpacity: 1,
        shadowRadius: 7.5,
        elevation: 7,
        marginTop: 10,
        height: 30,
        paddingHorizontal: 20,
        paddingTop: 5,
        width: '100%'
    }
});