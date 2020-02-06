import React from 'react';
import {View, Text, StyleSheet, Button} from 'react-native';
import Colors from '../../constants/colors';

export default function Chart (props){

    const currentCoinID = props.navigation.getParam('coinID');

    return (
        <View style ={styles.screen}>
            <Text>Chart Screen</Text>
            <Button title='GET ID' onPress={()=>console.log(currentCoinID)}/>
        </View>
    );
};
//Dynamic navigation options with passed params
Chart.navigationOptions = coinParams => {
    const currentCoinName = coinParams.navigation.getParam('coinName');
    return {headerStyle: {
        backgroundColor: Colors.secondary,
    },
    headerTintColor: Colors.text_primary,
    title: currentCoinName,
    headerTitleAlign: 'center'
}
}

const styles = StyleSheet.create({
    screen: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    }
})