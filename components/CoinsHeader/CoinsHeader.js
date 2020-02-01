import React from "react";
import { StyleSheet, Text, View } from "react-native";
import Colors from './../../constants/colors';

export default function CoinsHeader(props) {
    return (
        <View style={styles.globalFlex}>
            <View style={{ alignItems: "flex-end" }}>
                <Text style={styles.headerText}>BTC DOMINANCE</Text>
                <Text style={styles.headerText}>{props.btcDom}</Text>
            </View>
            <View style={{ alignItems: "flex-end" }}>
                <Text style={styles.headerText}>TOTAL MARKET CAP</Text>
                <View style={{ flexDirection: "row" }}>
                    <Text style={styles.headerText}>{props.mCap}</Text>
                    <Text
                        style={
                            props.capChange > 0
                                ? { color: Colors.positive_value, fontSize: 10 }
                                : { color: Colors.negative_value, fontSize: 10 }
                        }
                    >
                        {props.capChange > 0
                            ? " (+" + props.capChange + "%)"
                            : "(" + props.capChange + "%)"}
                    </Text>
                </View>
            </View>
            <View style={{ alignItems: "flex-end" }}>
                <Text style={styles.headerText}>TOTAL VOLUME</Text>
                <Text style={styles.headerText}>{props.totalVol}</Text>
            </View>
        </View>
    );
}

const styles = StyleSheet.create({
    globalFlex: {
        flexDirection: "row",
        justifyContent: "space-evenly",
        alignItems: "center",
        width: "100%",
        marginTop: 50
    },
    headerText: { 
        color: Colors.text_primary, 
        fontSize: 10 
    }
});
