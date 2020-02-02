import React from 'react';
import {View, Text, StyleSheet} from 'react-native';

export default function Chart (){
    return (
        <View style ={styles.screen}>
            <Text>Chart Screen</Text>
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