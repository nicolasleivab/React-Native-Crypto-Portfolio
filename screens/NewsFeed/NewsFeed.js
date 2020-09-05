import React, { useState, useEffect } from 'react';
import { View, StyleSheet, ActivityIndicator, FlatList, Keyboard } from 'react-native';
import { api } from '../../config/api';
import NewBlock from '../../components/NewBlock/NewBlock';


export default function NewsFeed(props) {
    const apiKey = {
        key: api.newsKey,
    }
    const { screenProps: {Colors: Colors} } = props;
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [news, setNews] = useState([]);

    useEffect(() => {

        // Fetch news
        fetch("https://cryptocontrol.io/api/v1/public/news?key=" + apiKey.key)
            .then(res => res.json())
            .then(json => {
                if (json[0]) {
                    const rawData = json;

                    console.log('news data ready');
                
                    const formattedData = [];
                    //format data for FlatList
                    for(let i = 0; i < rawData.length; i++){
                        const d = rawData[i];
                        const elapsedTime = Date.now() - new Date(d.publishedAt);
                        const formattedTime = elapsedTime/60000
                        let shownTime;
                        if(formattedTime<60){
                            shownTime = formattedTime.toFixed(0) +' minutes ago'
                        }else if (formattedTime>=60 && formattedTime<120){
                            shownTime = (formattedTime/60).toFixed(0) + ' hour ago' 
                        } else if(formattedTime >=120){
                            shownTime = (formattedTime/60).toFixed(0) + ' hours ago'
                        }
                        const obj = {
                            title: d['title'],
                            thumbnail: d['thumbnail'],
                            key: d['_id'],
                            sourceDomain: d['sourceDomain'],
                            time: shownTime,
                            originalImg: d['originalImageUrl'],
                            newLink: d['url']
                        }
                        formattedData.push(obj);
                        if(i === rawData.length-1){
                            setNews(formattedData);
                            setLoading(false);
                        }
                    }
                }
            })
            .catch(err => {
                setError(err)
                console.log('news error')
                setLoading(false)
            })
    }, []);

    //return loading screen when loading
    if (loading !== false) {
        return (
            <View style={styles(Colors).screen}><ActivityIndicator size="large" color={Colors.text_primary}/></View>
        )
    }

    return (
        <View style={styles(Colors).screen}>
            <FlatList
                style={{ width: '100%'}}
                data={news}
                onScrollBeginDrag={() => Keyboard.dismiss()}
                renderItem={newItem => (
                    <NewBlock
                        Colors={Colors}
                        key={newItem.item['key']}
                        thumbnailLink={newItem.item['thumbnail']?
                            newItem.item['thumbnail']
                            : 'https://cdn4.iconfinder.com/data/icons/crypto-currency-and-coin-2/256/bitoin_btc_coin_crypto-512.png'} 
                        title={newItem.item['title']}
                        sourceDomain={newItem.item['sourceDomain']}
                        time={newItem.item['time']}
                        newLink={newItem.item['newLink']}
                    />
                )}
                />
        </View>
    );
};
NewsFeed.navigationOptions = {
    headerStyle: {
        backgroundColor: "#1c1e2e",//Colors.secondary,
      },
    headerTintColor: "#FFF",//Colors.text_primary,
    title: 'News Feed',
    headerTitleAlign: 'center'
}
const styles = (Colors) => StyleSheet.create({
    screen: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: Colors.primary
    },
})