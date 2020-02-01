import React from "react";
import { StyleSheet, Text, View, TouchableOpacity } from "react-native";
import Colors from "../../constants/colors";

export default function CoinFilters(props) {
    return (
        <View style={styles.filtersFlex}>
            <View style={{ marginLeft: 60, flex: 1.5 }}>
                <Text style={styles.filterText}>COIN</Text>
            </View>
            <View style={styles.flexItem}>
                <TouchableOpacity onPress={props.sortPrice}>
                    <Text style={styles.filterText}>PRICE</Text>
                </TouchableOpacity>
                <Text style={{ ...styles.filterText, marginHorizontal: 3 }}>{"/"}</Text>
                <TouchableOpacity onPress={props.sortChange}>
                    <Text style={styles.filterText}>24H CHG</Text>
                </TouchableOpacity>
            </View>
            <View style={{ ...styles.flexItem, marginLeft: 30 }}>
                <TouchableOpacity onPress={props.sortCap}>
                    <Text style={styles.filterText}>M.CAP</Text>
                </TouchableOpacity>
                <Text style={{ ...styles.filterText, marginHorizontal: 3 }}>{"/"}</Text>
                <TouchableOpacity onPress={props.sortVol}>
                    <Text style={styles.filterText}>VOL</Text>
                </TouchableOpacity>
            </View>
            <View style={styles.flexItem}></View>
        </View>
    );
}

const styles = StyleSheet.create({
    filtersFlex: {
        flexDirection: "row",
        justifyContent: "space-evenly",
        alignItems: "center",
        width: "100%",
        height: 35,
        marginTop: 20,
        backgroundColor: Colors.secondary,
    },
    filterText: {
        color: Colors.text_secondary,
        fontSize: 10
    },
    flexItem: {
        flexDirection: "row",
        flex: 1.5
    }
});