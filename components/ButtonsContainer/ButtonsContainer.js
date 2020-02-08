import React, { useState, useEffect } from 'react';
import { StyleSheet, Text, View, TouchableOpacity } from "react-native";
import Colors from './../../constants/colors';
import MainButton from '../../components/MainButton/MainButton';

export default function ButtonsContainer(props) {
    const [isActive, setActive] = useState([true, false, false, false, false]);

    const dataHandler = (btn) => {
        
        if(btn === 'day'){
            console.log('Im 24Hr');
            setActive([true, false, false, false, false]);
        }
        if (btn === 'oneWeek') {
            console.log('Im 7d');
            setActive([false, true, false, false, false]);
        }
        if (btn === 'twoWeeks') {
            console.log('Im 14d');
            setActive([false, false, true, false, false]);
        }
        if (btn === 'oneMonth') {
            console.log('Im 30d');
            setActive([false, false, false, true, false]);
        }
        if (btn === 'twoMonths') {
            console.log('Im 60d');
            setActive([false, false, false, false, true]);
        }
        props.sliceData(btn);
        
    }

    return (
        <View style={styles.buttonsContainer}>
            <MainButton
                btnText={'24Hr'}
                dataHandler={dataHandler}
                isActive={isActive[0]}
                btnId={'day'}
            />
            <MainButton
                btnText={'7d'}
                dataHandler={dataHandler}
                isActive={isActive[1]}
                btnId={'oneWeek'}
            />
            <MainButton
                btnText={'14d'}
                dataHandler={dataHandler}
                isActive={isActive[2]}
                btnId={'twoWeeks'}
            />
            <MainButton
                btnText={'30d'}
                dataHandler={dataHandler}
                isActive={isActive[3]}
                btnId={'oneMonth'}
            />
            <MainButton
                btnText={'60d'}
                dataHandler={dataHandler}
                isActive={isActive[4]}
                btnId={'twoMonths'}
            />
        </View>
    );
}

const styles = StyleSheet.create({
    buttonsContainer: {
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center'
    }
});