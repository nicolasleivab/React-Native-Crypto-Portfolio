import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Switch} from 'react-native';
import Colors from '../../constants/colors';
import Icon from 'react-native-vector-icons/Ionicons';

export default function Settings() {

    const [isDark, setTheme] = useState(true);

    return (
        <View style={styles.screen}>
            <View style={styles.userSection}>
                <Text style={styles.sectionText}>THEME</Text>
                <View style={styles.block}>
                    <Text style={styles.blockText}>Dark mode</Text>
                    <Switch 
                    trackColor={{true: Colors.positive_value, false: Colors.text_secondary}}
                    thumbColor={Colors.positive_value}
                    value={isDark}
                    onValueChange={() => setTheme(!isDark)}
                    />
                </View>
                <Text style={styles.sectionText}>USER</Text>
                <TouchableOpacity style={styles.block}>
                    <Text style={styles.blockText}>Login</Text>
                    <Icon name='ios-arrow-forward' size={25} color={Colors.text_primary}/>
                </TouchableOpacity>
            </View>
            <View style={styles.aboutSection}>
                <Text style={styles.sectionText}>ABOUT</Text>
                <TouchableOpacity style={styles.block}>
                    <Text style={styles.blockText}>Review This App</Text>
                    <Icon name='ios-arrow-forward' size={25} color={Colors.text_primary} />
                </TouchableOpacity>
                <TouchableOpacity style={styles.block}>
                    <Text style={styles.blockText}>Privacy Policy</Text>
                    <Icon name='ios-arrow-forward' size={25} color={Colors.text_primary} />
                </TouchableOpacity>
                <TouchableOpacity style={styles.block}>
                    <Text style={styles.blockText}>Terms And Conditions</Text>
                    <Icon name='ios-arrow-forward' size={25} color={Colors.text_primary} />
                </TouchableOpacity>
                <TouchableOpacity style={styles.block}>
                    <Text style={styles.blockText}>App Version</Text>
                    <Icon name='ios-arrow-forward' size={25} color={Colors.text_primary} />
                </TouchableOpacity>
            </View>
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
        backgroundColor: Colors.primary
    },
    userSection:{
        marginBottom: 40,
        alignItems: 'flex-start',
        justifyContent: 'flex-start',
        width: '100%'
    },
    aboutSection:{
        alignItems: 'flex-start',
        justifyContent: 'flex-start' ,
        width: '100%'
    },
    block:{
        backgroundColor: Colors.secondary,
        flexDirection: 'row',
        height: 40,
        width: '100%',
        marginVertical: 5,
        justifyContent: 'space-between',
        alignItems: 'center',
        paddingHorizontal: 10
    },
    blockText: {
        color: Colors.text_primary,
        fontSize: 15,
    },
    sectionText: {
        color: Colors.text_secondary,
        fontSize: 15,
        marginLeft: 10
    }
})