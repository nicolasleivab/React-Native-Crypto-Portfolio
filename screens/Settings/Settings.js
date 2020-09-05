import React, { useState, useEffect, useContext } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Switch} from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
import ThemeContext from "../../context/theme/themeContext";

export default function Settings(props) {
    const { screenProps: {Colors: Colors} } = props;
    const [isDark, setTheme] = useState(true);
    const themeContext = useContext(ThemeContext);
    const { setLightTheme, setDarkTheme } = themeContext;

    useEffect(()=>{
        if (isDark) {
            setDarkTheme();
        } else {
            setLightTheme();
        }
    }, [isDark])

    return (
        <View style={styles(Colors).screen}>
            <View style={styles(Colors).userSection}>
                <Text style={styles(Colors).sectionText}>THEME</Text>
                <View style={styles(Colors).block}>
                    <Text style={styles(Colors).blockText}>Dark mode</Text>
                    <Switch 
                    trackColor={{true: Colors.positive_value, false: Colors.text_secondary}}
                    thumbColor={Colors.positive_value}
                    value={isDark}
                    onValueChange={() => setTheme(!isDark)}
                    />
                </View>
                <Text style={styles(Colors).sectionText}>USER</Text>
                <TouchableOpacity style={styles(Colors).block}>
                    <Text style={styles(Colors).blockText}>Login</Text>
                    <Icon name='ios-arrow-forward' size={25} color={Colors.text_primary}/>
                </TouchableOpacity>
            </View>
            <View style={styles(Colors).aboutSection}>
                <Text style={styles(Colors).sectionText}>ABOUT</Text>
                <TouchableOpacity style={styles(Colors).block}>
                    <Text style={styles(Colors).blockText}>Review This App</Text>
                    <Icon name='ios-arrow-forward' size={25} color={Colors.text_primary} />
                </TouchableOpacity>
                <TouchableOpacity style={styles(Colors).block}>
                    <Text style={styles(Colors).blockText}>Privacy Policy</Text>
                    <Icon name='ios-arrow-forward' size={25} color={Colors.text_primary} />
                </TouchableOpacity>
                <TouchableOpacity style={styles(Colors).block}>
                    <Text style={styles(Colors).blockText}>Terms And Conditions</Text>
                    <Icon name='ios-arrow-forward' size={25} color={Colors.text_primary} />
                </TouchableOpacity>
                <TouchableOpacity style={styles(Colors).block}>
                    <Text style={styles(Colors).blockText}>App Version</Text>
                    <Icon name='ios-arrow-forward' size={25} color={Colors.text_primary} />
                </TouchableOpacity>
            </View>
        </View>
    );
};
Settings.navigationOptions = {
    headerStyle: {
        backgroundColor: "#1c1e2e",//Colors.secondary,
    },
    headerTintColor: "#FFF",//Colors.text_primary,
    title: 'Settings',
    headerTitleAlign: 'center'
}
const styles = (Colors) => StyleSheet.create({
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