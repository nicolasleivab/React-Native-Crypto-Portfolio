import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

export default function NewBlock(props){

    return (
        <View style={styles.newBlock}>
            <View style={styles.thumbnail}>
            </View>
            <View style={styles.newcontainer}>
                <View>{props.title}</View>
                <View style={styles.sourceContainer}>
                    <View>{props.sourceDomain}</View>
                    <View>{props.time}</View>
                </View>
            </View>
        </View>
    );

}

const styles = StyleSheet.create({
    newBlock: {
        flexDirection: 'row',
        justifyContent: 'flex-start',
        alignItems: 'center',
        backgroundColor: Colors.coinblock,
        borderRadius: 5,
        marginTop: 20,
        marginLeft: 0,
        marginRight: 12,
        height: 100,
        width: '98%'
    },
    thumbnail:{
        flex:1,
    },
    newcontainer:{
        flex:3
    },
    sourceContainer:{
        flexDirection: row
    }
})