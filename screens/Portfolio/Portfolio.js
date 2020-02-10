import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import Colors from '../../constants/colors';

export default function Portfolio() {
    return (
        <View style={styles.screen}>
            <Text>Portfolio Screen</Text>
        </View>
    );
};
Portfolio.navigationOptions = {
    headerStyle: {
        backgroundColor: Colors.secondary,
    },
    headerTintColor: Colors.text_primary,
    title: 'Portfolio',
    headerTitleAlign: 'center'
}
const styles = StyleSheet.create({
    screen: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    }
})