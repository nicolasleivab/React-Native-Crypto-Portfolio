import React from "react";
import { StyleSheet, Text, View, TouchableOpacity } from "react-native";
import Colors from "../../constants/colors";
import Icon from 'react-native-vector-icons/Ionicons';

export default function CoinFilters(props) {
    return (
        <View style={styles.filtersFlex}>
            <View style={{ marginLeft: 60, flex: 1.5 }}>
                <Text style={styles.filterText}>COIN</Text>
            </View>
            <View style={styles.flexItem}>
                <TouchableOpacity onPress={props.sortPrice}>
                    <Text style={props.isOn[0]? styles.filterTextOn : styles.filterText}>PRICE</Text>
                </TouchableOpacity>
                <Text style={{ ...styles.filterText, marginHorizontal: 3 }}>{"/"}</Text>
                <TouchableOpacity onPress={props.sortChange}>
                    <Text style={props.isOn[1] ? styles.filterTextOn : styles.filterText}>24H CHG</Text>
                </TouchableOpacity>
                <View style={styles.arrows}>
                {props.arrowUp[0] ? 
                <Icon 
                style={{color: Colors.text_primary}} 
                        name="md-arrow-round-up"
                size={12} 
                />
                :
                <Icon
                    style={{ color: Colors.text_primary }}
                    name="md-arrow-round-down"
                    size={12}
                />
                }
                </View>
            </View>
            <View style={{ ...styles.flexItem, marginLeft: 30 }}>
                <TouchableOpacity onPress={props.sortCap}>
                    <Text style={props.isOn[2] ? styles.filterTextOn : styles.filterText}>M.CAP</Text>
                </TouchableOpacity>
                <Text style={{ ...styles.filterText, marginHorizontal: 3 }}>{"/"}</Text>
                <TouchableOpacity onPress={props.sortVol}>
                    <Text style={props.isOn[3] ? styles.filterTextOn : styles.filterText}>VOL</Text>
                </TouchableOpacity>
                <View style={styles.arrows}>
                {props.arrowUp[1] ?
                <Icon
                    style={{ color: Colors.text_primary }}
                        name="md-arrow-round-up"
                    size={12}
                />
                :
                <Icon
                    style={{ color: Colors.text_primary }}
                    name="md-arrow-round-down"
                    size={12}
                />
                }
                </View>
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
    filterTextOn: {
        color: Colors.text_primary,
        fontSize: 10,
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