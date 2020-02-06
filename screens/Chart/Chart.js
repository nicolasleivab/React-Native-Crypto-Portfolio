import React from 'react';
import {View, Text, StyleSheet, Button} from 'react-native';

export default function Chart (props){
    const currentCoin = props.navigation.getParam('coinID');
    return (
        <View style ={styles.screen}>
            <Text>Chart Screen</Text>
            <Button title='GET ID' onPress={()=>console.log(currentCoin)}/>
        </View>
    );
};

const styles = StyleSheet.create({
    screen: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    }
})