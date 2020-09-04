import React from "react";
import { StyleSheet, Text, View, TouchableOpacity } from "react-native";
import Icon from 'react-native-vector-icons/Ionicons';

export default function CoinFilters(props) {
    const { Colors } = props;
    return (
        <View style={styles(Colors).filtersFlex}>
            <View style={{ marginLeft: 50, flex: 1.5 }}>
                <Text style={styles(Colors).filterText}>COIN</Text>
            </View>
            <View style={styles(Colors).flexItem}>
                <TouchableOpacity onPress={props.sortPrice}>
                    <Text style={props.isOn[0]? styles(Colors).filterTextOn : styles(Colors).filterText}>PRICE</Text>
                </TouchableOpacity>
                <Text style={{ ...styles(Colors).filterText, marginHorizontal: 3 }}>{"/"}</Text>
                <TouchableOpacity onPress={props.sortChange}>
                    <Text style={props.isOn[1] ? styles(Colors).filterTextOn : styles(Colors).filterText}>24H CHG</Text>
                </TouchableOpacity>
                <View style={styles(Colors).arrows}>
                {props.arrowUp[0] ? 
                <Icon 
                    style={props.arrowUp[2] ? { color: Colors.text_primary, opacity: 1 } : { color: Colors.text_primary, opacity: 0}} 
                    name="md-arrow-round-up"
                    size={12} 
                />
                :
                <Icon
                    style={props.arrowUp[2] ? { color: Colors.text_primary, opacity: 1 } : { color: Colors.text_primary, opacity: 0 }}
                    name="md-arrow-round-down"
                    size={12}
                />
                }
                </View>
            </View>
            <View style={{ ...styles(Colors).flexItem, marginLeft: 40 }}>
                <TouchableOpacity onPress={props.sortCap}>
                    <Text style={props.isOn[2] ? styles(Colors).filterTextOn : styles(Colors).filterText}>M.CAP</Text>
                </TouchableOpacity>
                <Text style={{ ...styles(Colors).filterText, marginHorizontal: 3 }}>{"/"}</Text>
                <TouchableOpacity onPress={props.sortVol}>
                    <Text style={props.isOn[3] ? styles(Colors).filterTextOn : styles(Colors).filterText}>VOL</Text>
                </TouchableOpacity>
                <View style={styles(Colors).arrows}>
                {props.arrowUp[1] ?
                <Icon
                    style={props.arrowUp[3] ? { color: Colors.text_primary, opacity: 1 } : { color: Colors.text_primary, opacity: 0}}
                    name="md-arrow-round-up"
                    size={12}
                />
                :
                <Icon
                    style={props.arrowUp[3] ? { color: Colors.text_primary, opacity: 1 } : { color: Colors.text_primary, opacity: 0}}
                    name="md-arrow-round-down"
                    size={12}
                />
                }
                </View>
            </View>
            <View style={styles(Colors).flexItem}></View>
        </View>
    );
}

const styles = (Colors) => StyleSheet.create({
    filtersFlex: {
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "center",
        width: "100%",
        height: 35,
        marginTop: 20,
        backgroundColor: Colors.secondary,
    },
    filterText: {
        color: Colors.text_secondary,
        fontSize: 11
    },
    filterTextOn: {
        color: Colors.text_primary,
        fontSize: 11,
        fontWeight: 'bold'
    },
    flexItem: {
        flexDirection: "row",
        flex: 1.5
    },
    arrows:{
        marginHorizontal: 3,
    }
});
