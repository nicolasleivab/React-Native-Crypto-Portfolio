import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import Colors from '../../constants/colors';

export default function Settings() {
    return (
        <View style={styles.screen}>
            <Text>Settings Screen</Text>
        </View>
    );
};
Settings.navigationOptions = {
    headerStyle: {
        backgroundColor: Colors.secondary,
    },
    headerTintColor: Colors.text_primary,
    title: 'Settings',
    headerTitleAlign: 'center'
}
const styles = StyleSheet.create({
    screen: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    }
})