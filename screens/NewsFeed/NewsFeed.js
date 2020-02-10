import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import NewBlock from '../../components/NewBlock/NewBlock';

export default function NewsFeed() {
    return (
        <View style={styles.screen}>
            <FlatList
                style={{ width: '100%'}}
                data={news}
                onScrollBeginDrag={() => Keyboard.dismiss()}
                renderItem={newItem => (
                    <NewBlock
                        
                    />
                )}
            />>
        </View>
    );
};

const styles = StyleSheet.create({
    screen: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: Colors.primary
    },
    newContainer: {

    }
})