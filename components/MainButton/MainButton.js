import React from 'react';
import { StyleSheet, Text, View, TouchableOpacity} from "react-native";
import Colors from './../../constants/colors';

export default function MainButton(props) {


    return (
        <TouchableOpacity activeOpacity={.7} onPress={()=>props.dataHandler(props.btnId)} style={{marginHorizontal: 3, width: 45, height: 30}}>
            <View style={props.isActive === true? styles.btnActive : styles.btnPrimary}>
                <Text style={{color: Colors.text_primary, textAlign: 'center'}}>{props.btnText}</Text>
            </View>
        </TouchableOpacity>
    );
}

const styles = StyleSheet.create({
    btnPrimary: {
        width: '100%',
        height: '100%',
        padding: 5,
        borderRadius: 5,
        elevation: 7,
        backgroundColor: Colors.coinblock
    },
    btnActive : {
        width: '100%',
        height: '100%',
        padding: 5,
        borderRadius: 5,
        backgroundColor: Colors.secondary
    }
});