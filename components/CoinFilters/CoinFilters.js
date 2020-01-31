import React from 'react';
import { StyleSheet, Text, View, TouchableOpacity} from 'react-native';

export default function CoinFilters(props) {

return (
<View style={styles.filtersFlex}>
    <TouchableOpacity style={{marginLeft: 60, flex:1.5}}>
        <Text style={{color: '#CCC', fontSize: 10}}>COIN</Text>
    </TouchableOpacity>
    <View style={{ flexDirection: 'row', flex:1.5}}>
        <TouchableOpacity onPress={props.sortPrice}>
            <Text style={{ color: '#CCC', fontSize: 10}}>PRICE</Text>
        </TouchableOpacity>
            <Text style={{ color: '#CCC', fontSize: 10, marginHorizontal: 3}}>{'/'}</Text>
            <TouchableOpacity onPress={props.sortChange}>
            <Text style={{ color: '#CCC', fontSize: 10}}>24H CHG</Text>
        </TouchableOpacity>
    </View>
    <View style={{ flexDirection: 'row', flex:1.5, marginLeft: 30}}>
            <TouchableOpacity onPress={props.sortCap}>
            <Text style={{ color: '#CCC', fontSize: 10}}>M.CAP</Text>
        </TouchableOpacity>
            <Text style={{ color: '#CCC', fontSize: 10, marginHorizontal: 3}}>{'/'}</Text>
            <TouchableOpacity onPress={props.sortVol}>
            <Text style={{ color: '#CCC', fontSize: 10}}>VOL</Text>
        </TouchableOpacity>
    </View>
        <View style={{ flexDirection: 'row', flex: 1.5 }}>
    </View>
</View>
);
}

const styles = StyleSheet.create({
    filtersFlex: {
        flexDirection: "row",
        justifyContent: 'space-evenly',
        alignItems: 'center',
        width: '100%',
        height: 35,
        marginTop: 20,
        backgroundColor: '#1c1e2e'
    },
});