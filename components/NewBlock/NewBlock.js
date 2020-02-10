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
        <TouchableOpacity onPress={linkHandler} style={styles.block}>
        <View style={styles.newBlock}>
            <View style={styles.thumbnail}>
                <Image
                    style={styles.thumbnailImg}
                    source={{ uri: props.thumbnailLink }}
                />
            </View>
            <View style={styles.newcontainer}>
                <View style={{marginBottom: 5}}>
                    <Text style={{ color: Colors.text_primary }}>{props.title}</Text>
                </View>
                <View style={styles.sourceContainer}>
                    <Image
                        style={{width:15, height: 15, marginRight: 5}}
                            source={{ uri: 'https://'+props.sourceDomain + '/favicon.ico'}}
                    />
                    <Text style={{color: Colors.text_primary, fontSize: 10, marginRight: 10}}>{props.sourceDomain}</Text>
                    <Text style={{ color: Colors.text_primary, fontSize: 10 }}>{props.time}</Text>
                </View>
            </View>
        </View>
        </TouchableOpacity>
    );

}

const styles = StyleSheet.create({
    block:{
        marginVertical: 5,
        borderBottomColor: Colors.text_secondary,
        borderBottomWidth: 1,
    },
    newBlock: {
        flexDirection: 'row',
        justifyContent: 'flex-start',
        alignItems: 'center',
        backgroundColor: Colors.primary,
        marginBottom: 10,
        height: 100,
        width: '98%'
    },
    thumbnail:{
        flex:1,
    },
    thumbnailImg:{
        width: '100%',
        height: '100%',
        borderRadius: 5,
        marginHorizontal: 10,
    },
    newcontainer:{
        flex:3,
        marginLeft: 20,
    },
    sourceContainer:{
        flexDirection: 'row'
    }
})