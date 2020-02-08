import React, { useState, useEffect } from 'react';
import { StyleSheet, Text, View, TouchableOpacity } from "react-native";
import Colors from './../../constants/colors';
import MainButton from '../../components/MainButton/MainButton';

export default function ButtonsContainer(props) {
    const [isActive, setActive] = useState([false, false, false, false, false]);

    const dataHandler = (btn) => {
        setActive(!isActive);
        if(btn === 'day'){
            console.log('Im 24Hr');
        }
        if (btn === 'oneWeek') {
            console.log('Im 7d');
        }
        if (btn === 'twoWeeks') {
            console.log('Im 14d');
        }
        if (btn === 'oneMonth') {
            console.log('Im 30d');
        }
        if (btn === 'twoMonths') {
            console.log('Im 60d');
        }
        props.sliceData();
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