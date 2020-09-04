import React from "react";
import { StyleSheet, Text, View } from "react-native";

export default function CoinsHeader(props) {
    const { Colors } = props;
    return (
        <View style={styles(Colors).globalFlex}>
            <View style={{ alignItems: "flex-end" }}>
                <Text style={styles(Colors).headerText}>BTC DOMINANCE</Text>
                <Text style={styles(Colors).headerText}>{props.btcDom}</Text>
            </View>
            <View style={{ alignItems: "flex-end" }}>
                <Text style={styles(Colors).headerText}>TOTAL MARKET CAP</Text>
                <View style={{ flexDirection: "row" }}>
                    <Text style={styles(Colors).headerText}>{props.mCap}</Text>
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
                <Text style={styles(Colors).headerText}>TOTAL VOLUME</Text>
                <Text style={styles(Colors).headerText}>{props.totalVol}</Text>
            </View>
        </View>
    );
}

const styles = (Colors) => StyleSheet.create({
    globalFlex: {
        flexDirection: "row",
        justifyContent: "space-evenly",
        alignItems: "center",
        width: "100%",
        marginTop: 10
    },
    headerText: { 
        color: Colors.text_primary, 
        fontSize: 10 
    }
});
