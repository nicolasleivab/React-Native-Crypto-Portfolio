import React, { useState, useEffect } from 'react';
import { StyleSheet, Text, View, FlatList, Button, Modal} from 'react-native';
import CoinBlock from '../../components/CoinBlock/CoinBlock';
import SearchCoin from '../../components/SearchCoin/SearchCoin';
import Icon from 'react-native-vector-icons/Ionicons';
import CoinsHeader from '../../components/CoinsHeader/CoinsHeader'

export default function Coins() {
  const apiKey = {
    key: 'your cmc key' 
  };
  const [coins, setCoins] = useState([]);
  const [storedCoins, setStoredCoins] = useState([]);
  const [favCoins, setFavCoins] = useState([]);
  const [allCoins, setAllCoins] = useState([]);
  const [globalData, setGlobalData] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [value, onChangeText] = React.useState('');
  const [starOn, setStar] = useState(0);

useEffect(() => {
  // loading and error states
  setLoading(true)
  setError(null)
// Fetch Top 100 coins from CoinCap
  fetch("https://api.coincap.io/v2/assets")
    .then(res => res.json())
    .then(json => {
      if (json.data) {
        console.log('data ready')
        const formattedData = json.data;
        //format data
        formattedData.forEach(d => {
          if(d.priceUsd >= 1){
          d.priceUsd = Math.floor(d.priceUsd * 100) / 100;
          }else{
          d.priceUsd = Math.floor(d.priceUsd * 10000) / 10000;
          }
          d.supply = Math.floor(d.supply * 10000) / 10000;
          d.maxSupply = Math.floor(d.maxSupply * 10000) / 10000;
          d.marketCapUsd = +d.marketCapUsd;
          if (d.marketCapUsd >= 1000000000) {
            d.marketCapUsd = ((+d.marketCapUsd)/1000000000).toFixed(2)+'B';
          }else if(+d.marketCapUsd >= 1000000){
            d.marketCapUsd = (+d.marketCapUsd/1000000).toFixed(2)+'M';
          }else{
            d.marketCapUsd = +d.marketCapUsd.toFixed(2);
          }
          d.volumeUsd24Hr = +d.volumeUsd24Hr;
          if(d.volumeUsd24Hr >= 1000000000) {
            d.volumeUsd24Hr = ((d.volumeUsd24Hr) / 1000000000).toFixed(2) + 'B';
          }else if (+d.volumeUsd24Hr >= 1000000) {
            d.volumeUsd24Hr = ((d.volumeUsd24Hr)/ 1000000).toFixed(2) + 'M';
          } else {
           d.volumeUsd24Hr = d.volumeUsd24Hr.toFixed(2);
          }
          d.changePercent24Hr= Math.floor(d.changePercent24Hr * 100) / 100;
          d.vwap24Hr = Math.floor(d.vwap24Hr * 10000) / 10000;
        });

        setCoins(formattedData)
        setStoredCoins(formattedData)
        setModState(true)
        setLoading(false)
      }
    })
    .catch(err => {
      setError(err)
      console.log(err)
      setLoading(false)
    })
}, []);

useEffect(() => {
  // Fetch all coins from coinmarketcap
  fetch("https://pro-api.coinmarketcap.com/v1/cryptocurrency/map?CMC_PRO_API_KEY="+apiKey.key)
    .then(res => res.json())
    .then(json => {
      if (json.data) {
        const rawData = json.data;

        console.log('cmc data ready');
        setAllCoins(rawData)
        setLoading(false)
      }
    })
    .catch(err => {
      setError(err)
      console.log('cmc error')
      setLoading(false)
    })
}, []);

useEffect(() => {
  // Fetch global data from coingecko
  fetch('https://api.coingecko.com/api/v3/global')
    .then(res => res.json())
    .then(json => {
      if (json.data) {
        const rawData = json.data;
        
        const formatMarketCap = (rawData['total_market_cap']['usd']/1000000000).toFixed(2) + 'B';
        const formatBTCDom = (rawData['market_cap_percentage']['btc']).toFixed(2) + '%';
        const formatTotalVolume = (rawData['total_volume']['usd'] / 1000000000).toFixed(2) + 'B';
        const formatMarketChange = (rawData["market_cap_change_percentage_24h_usd"]).toFixed(2);

        const formattedData = {...rawData};
        formattedData['total_market_cap']['usd'] = formatMarketCap;
        formattedData['market_cap_percentage']['btc'] = formatBTCDom;
        formattedData['total_volume']['usd'] = formatTotalVolume;
        formattedData["market_cap_change_percentage_24h_usd"] = formatMarketChange;

        setGlobalData(formattedData);
        console.log('global data ready');
        setLoading(false);
      }
    })
    .catch(err => {
      setError(err)
      console.log('coingecko error');
      setLoading(false);
    })
}, []);
  
const filterCoin = () => {
    setStar(0); //restart fav filter on key press
    const currentCoins = [...storedCoins];
    const filteredCoins = currentCoins.filter(d => (d.name).toUpperCase().includes(value.toUpperCase()) ||
      (d.id).toUpperCase().includes(value.toUpperCase()) || (d.symbol).toUpperCase().includes(value.toUpperCase()));
    setCoins(filteredCoins);
    if(value == ''){
      setCoins(storedCoins);
    }
}
const changeStar = () =>{
  setStar(!starOn);
  if (starOn == 0) {
    setCoins(favCoins);
  } else {
    setCoins(storedCoins);
  }
}

const changeStarBlock = (key) => {
  const currentFavCoin = storedCoins.find(d => d['name'] === key);

  if(currentFavCoin['star'] == undefined){
    currentFavCoin['star'] = 1;
  } else if (currentFavCoin['star'] === 0){
    currentFavCoin['star'] = 1;
  } else if (currentFavCoin['star'] === 1) {
    currentFavCoin['star'] = 0;
  }
  
  if (currentFavCoin['star'] == 1){
    const favList = [...favCoins];
    favList.push(currentFavCoin);
    setFavCoins(favList);
  } else if (currentFavCoin['star'] == 0){
    const favList = [...favCoins];
    const filterItem = favList.filter(d => d['name'] !== key);
    setFavCoins(filterItem);
  }
}

return (
  <View style={styles.container}>
    {globalData['total_market_cap'] != undefined && coins[0] != undefined ?
    <View>
      <CoinsHeader
          btcDom={globalData['market_cap_percentage']['btc']}
          mCap={globalData['total_market_cap']['usd']}
          capChange={globalData["market_cap_change_percentage_24h_usd"]}
          totalVol={globalData['total_volume']['usd']}
        />
    <View style={styles.filterFlex}>
  
    <SearchCoin
    filterCoin={filterCoin}
    textChange={text => onChangeText(text)}
    value={value}
    />
    <Icon style={starOn > 0 ? { color: 'yellow', marginTop: 45 } : { color: '#555', marginTop: 45}} name="ios-star" size={35} onPress={changeStar} />
    </View>

    <FlatList  
    style={{ width: '100%', marginTop: 20, marginBottom: 20, paddingRight: 0, paddingLeft: 9 }}
    data={coins}
    renderItem={coin => (
        <CoinBlock
        key={coin.item['id']} 
        changeStar={changeStarBlock}
        favOn={coin.item['star']}
        coinID={allCoins[0] != undefined && coins[0] != undefined ? 
          (allCoins.find(d => d['name'] === coin.item['name'] || d['slug'] === coin.item['id'] || d['symbol'] === coin.item['symbol']))['id'] : 1} 
        coinName={coin.item['name']} 
        coinSymbol={coin.item['symbol']}
        coinChange={coin.item['changePercent24Hr']}
        coinPrice={coin.item['priceUsd']}
        coinMarket={coin.item['marketCapUsd']}
        coinVolume={coin.item['volumeUsd24Hr']}
        />
      )}
        /></View>: <View><Text style={{ color: 'white' }}>{error != null ? 'Error' : 'loading...'}</Text></View>
    }
  </View>
);
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#30344E',
    alignItems: 'center',
    justifyContent: 'center',
  },
  filterFlex:{
    flexDirection: "row",
    justifyContent: 'space-evenly',
    alignItems: 'center'
  }
});