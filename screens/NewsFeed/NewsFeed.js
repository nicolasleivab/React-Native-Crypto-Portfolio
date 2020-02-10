import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import NewBlock from '../../components/NewBlock/NewBlock';


export default function NewsFeed() {
    const apiKey = {
        key: 'your api key'
    }
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

                    console.log('cmc data ready');
                    setNews(rawData)
                    setLoading(false)
                }
            })
            .catch(err => {
                setError(err)
                console.log('cmc error')
                setLoading(false)
            })
    }, []);

    return (
        <View style={styles.screen}>
            <FlatList
                style={{ width: '100%'}}
                data={news}
                onScrollBeginDrag={() => Keyboard.dismiss()}
                renderItem={newItem => (
                    <NewBlock
                        key={newItem.item['id']}
                        thumbnailLink={newItem.item['thumbnail']?
                            newItem.item['thumbnail']
                            : 'https://cdn4.iconfinder.com/data/icons/crypto-currency-and-coin-2/256/bitoin_btc_coin_crypto-512.png'} 
                        title={newItem.item['title']}
                        sourceDomain={newItem.item['sourceDomain']}
                        time={newItem.item['publishedAt']}
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
})