import React from "react";
import { StyleSheet, Text, View, TouchableOpacity} from "react-native";
import Colors from './../../constants/colors';

export default function MainButton(props) {
    return (
        <TouchableOpacity onPress={props.btnMethod}>
            <View style={styles.btnPrimary}>
                <Text>{props.btnText}</Text>
            </View>
        </TouchableOpacity>
    );
}

const styles = StyleSheet.create({
    btnPrimary: {
    }
});