import React from 'react';
import { View, Text, StyleSheet, Image, TouchableOpacity } from 'react-native';
import {Linking} from 'expo';

export default function NewBlock(props){

    linkHanlder = () => {
        Linking.openURL(props.newLink);
    };

    return (
        <TouchableOpacity onPress={linkHanlder}>
        <View style={styles.newBlock}>
            <View style={styles.thumbnail}>
                <Image
                    source={{ uri: props.thumbnailLink }}
                />
            </View>
            <View style={styles.newcontainer}>
                <Text>{props.title}</Text>
                <View style={styles.sourceContainer}>
                    <Text>{props.sourceDomain}</Text>
                    <Text>{props.time}</Text>
                </View>
            </View>
        </View>
        </TouchableOpacity>
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