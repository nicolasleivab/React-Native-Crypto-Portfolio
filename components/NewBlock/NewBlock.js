import React from 'react';
import Colors from '../../constants/colors'
import { View, Text, StyleSheet, Image, TouchableOpacity } from 'react-native';
import {Linking} from 'expo';

export default function NewBlock(props){

    const linkHandler = () => {
        console.log('working');
        Linking.openURL(props.newLink);
    };

    return (
        <TouchableOpacity onPress={linkHandler}>
        <View style={styles.newBlock}>
            <View style={styles.thumbnail}>
                <Image
                    style={{ width: '100%', height: '100%' }}
                    source={{ uri: props.thumbnailLink }}
                />
            </View>
            <View style={styles.newcontainer}>
                <View>
                <Text>{props.title}</Text>
                </View>
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
        flexDirection: 'row'
    }
})