import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

export default function Settings() {
    return (
        <View style={styles.screen}>
            <Text>Settings Screen</Text>
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