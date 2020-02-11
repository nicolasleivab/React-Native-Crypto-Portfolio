import React from 'react';
import { View, Text, StyleSheet, TextInput } from 'react-native';
import Colors from '../../constants/colors';

export default function Portfolio() {

const fetchAdress = (ethAddress)=> {
React.useEffect(() => {
    // Fetch eth address token balances
    fetch("https://api.ethplorer.io/getAddressInfo/" + ethAddress +'?apiKey=freekey')
        .then(res => res.json())
        .then(json => {
            if (json['address']) {
                const rawData = json;

                console.log('ethAddress data ready');
                setPortfolio(rawData);
                setLoading(false);
                    
                
            }
        })
        .catch(err => {
            setError(err)
            console.log('news error')
            setLoading(false)
        })
    
}, [])

}

    return (
        <View style={styles.screen}>
            <TextInput/>
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
        backgroundColor: Colors.primary
    }
})