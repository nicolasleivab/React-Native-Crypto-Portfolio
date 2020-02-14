import React, { useState, useEffect } from 'react';
import { StyleSheet, Text, View, FlatList, TouchableWithoutFeedback, Keyboard, ActivityIndicator} from 'react-native';
import CoinBlock from '../../components/CoinBlock/CoinBlock';
import SearchCoin from '../../components/SearchCoin/SearchCoin';
import Icon from 'react-native-vector-icons/Ionicons';
import CoinsHeader from '../../components/CoinsHeader/CoinsHeader';
import CoinFilters from '../../components/CoinFilters/CoinFilters';
import Colors from '../../constants/colors';

export default function Coins(props) {
  const apiKey = {
    key: 'your cmc key' 
  };
  const [coins, setCoins] = useState([]);
  const [storedCoins, setStoredCoins] = useState([]);
  const [favCoins, setFavCoins] = useState([]);
  const [allCoins, setAllCoins] = useState([]);
  const [globalData, setGlobalData] = useState([]);
  const [loadingCoins, setLoadingCoins] = useState(true);
  const [loadingGlobal, setLoadingGlobal] = useState(true);
  const [loadingIcons, setLoadingIcons] = useState(true);
  const [error, setError] = useState(null);
  const [value, onChangeText] = React.useState('');
  const [starOn, setStar] = useState(0);
  const [sortedPrice, setSortedPrice] = useState(0);
  const [sortedChange, setSortedChange] = useState(0);
  const [sortedCap, setSortedCap] = useState(0);
  const [sortedVol, setSortedVol] = useState(0);
  const [rawData, setRawData] = useState(0);
  const [triggerFetch, setTrigger] = useState(0);
  const [filterOn, setFilterState] = useState([false, false, true, false]);
  const [arrowUp, setArrowUp] = useState([false, false, false, true]);


const timer = setInterval(() => setTrigger(!triggerFetch), 60000); //update data every 1 min

useEffect(() => {

// Fetch Top 100 coins from CoinCap
  fetch("https://api.coincap.io/v2/assets")
    .then(res => res.json())
    .then(json => {
      if (json.data) {
        console.log('data ready');
  
        const formattedData = [...json.data];
        //format data
        formattedData.forEach(d => {
          if(d.priceUsd >= 1){
          d.priceUsd = Math.floor(d.priceUsd * 100) / 100;
          }else{
          d.priceUsd = Math.floor(d.priceUsd * 10000) / 10000;
          }
          d.maxSupply = Math.floor(d.maxSupply * 10000) / 10000;
          d.changePercent24Hr = Math.floor(d.changePercent24Hr * 100) / 100;
          d.vwap24Hr = Math.floor(d.vwap24Hr * 10000) / 10000;
          d.marketCapUsd = +d.marketCapUsd;
          if (d.marketCapUsd >= 1000000000) {
            d.marketCapUsd = ((d.marketCapUsd) / 1000000000).toFixed(2) + 'B';
          } else if (d.marketCapUsd >= 1000000) {
            d.marketCapUsd = (d.marketCapUsd / 1000000).toFixed(2) + 'M';
          } else {
            d.marketCapUsd = (d.marketCapUsd / 1000).toFixed(2) + 'K';
          }
          d.volumeUsd24Hr = +d.volumeUsd24Hr;
          if (d.volumeUsd24Hr >= 1000000000) {
            d.volumeUsd24Hr = ((d.volumeUsd24Hr) / 1000000000).toFixed(2) + 'B';
          } else if (d.volumeUsd24Hr >= 1000000) {
            d.volumeUsd24Hr = ((d.volumeUsd24Hr) / 1000000).toFixed(2) + 'M';
          } else {
            d.volumeUsd24Hr = ((d.volumeUsd24Hr) / 1000).toFixed(2) + 'K';
          }
          d.supply = +d.supply;
          if (d.supply >= 1000000000) {
            d.supply = ((d.supply) / 1000000000).toFixed(2) + 'B';
          } else if (d.supply >= 1000000) {
            d.supply = ((d.supply) / 1000000).toFixed(2) + 'M';
          } else {
            d.supply = ((d.supply) / 1000).toFixed(2) + 'K';
          }
          d.star = 0;
        });

        if(coins[0] === undefined){
        setCoins(formattedData)
        }
        if(storedCoins[0] === undefined){
        setStoredCoins(formattedData)
        }else{
        const oldStoredCoins = [...storedCoins];
        for(let i =0; i < formattedData.length; i++){
          formattedData[i]['star'] = oldStoredCoins[i]['star'];
        }
        setStoredCoins(formattedData);
        }
        setLoadingCoins(false)
      }
    })
    .catch(err => {
      setError(err)
      console.log(err)
      setLoadingCoins(false)
    })
}, [triggerFetch]);

useEffect(() => {

  // Fetch all coins from coinmarketcap
  fetch("https://pro-api.coinmarketcap.com/v1/cryptocurrency/map?CMC_PRO_API_KEY="+apiKey.key)
    .then(res => res.json())
    .then(json => {
      if (json.data) {
        const rawData = json.data;;

        console.log('cmc data ready');
        setAllCoins(rawData)
        setLoadingIcons(false)
      }
    })
    .catch(err => {
      setError(err)
      console.log('cmc error')
      setLoadingIcons(false)
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
        setLoadingGlobal(false);
      }
    })
    .catch(err => {
      setError(err)
      console.log('coingecko error');
      setLoadingGlobal(false);
    })
}, [triggerFetch]);

//return loading screen when loading
if(loadingGlobal !== false || loadingCoins !== false){
  console.log({loadingCoins, loadingGlobal, loadingIcons});
  return (
    <View style={styles.container}><ActivityIndicator size="large" color={Colors.text_primary} /></View>
  )
}

//return error
if(error !== null){
  console.log({error});
  return (
    <View style={styles.container}><Text color={Colors.text_primary}>{error}</Text></View>
  )
}

const filterCoin = () => {
    setStar(0); //restart fav filter on key press
    const currentCoins = [...storedCoins];
    const filteredCoins = currentCoins.filter(d => (d.name).toUpperCase().includes(value.toUpperCase()) ||
      (d.id).toUpperCase().includes(value.toUpperCase()) || (d.symbol).toUpperCase().includes(value.toUpperCase()));
    setCoins(filteredCoins);
    if(value == ''){
      setFilterState([false, false, true, false]);
      setArrowUp([false, false, false, true]);
      setCoins(storedCoins);
    }
}
const changeStar = () =>{
   Keyboard.dismiss();
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
    if (starOn == 1) {
      setCoins(filterItem);
    }
    
  }
}

const sortByPrice = () =>{
  const allCoins = [...storedCoins];
  if(sortedPrice === 0){
    const sortedCoins = allCoins.sort((aCoin, bCoin) => aCoin.priceUsd - bCoin.priceUsd);
    setSortedPrice(1);
    setCoins(sortedCoins);
    setFilterState([true, false, false, false]);
    setArrowUp([false, false, true, false]);
  }else{
    const sortedCoins = allCoins.sort((aCoin, bCoin) => bCoin.priceUsd - aCoin.priceUsd); 
    setSortedPrice(0);
    setCoins(sortedCoins);
    setFilterState([true, false, false, false]);
    setArrowUp([true, false, true, false]);
  
  }
}

const sortByChange = () =>{
  const allCoins = [...storedCoins];
  if (sortedChange === 0) {
    const sortedCoins = allCoins.sort((aCoin, bCoin) => aCoin.changePercent24Hr - bCoin.changePercent24Hr);
    setSortedChange(1);
    setCoins(sortedCoins);
    setFilterState([false, true, false, false]);
    setArrowUp([false, false, true, false]);
  } else {
    const sortedCoins = allCoins.sort((aCoin, bCoin) => bCoin.changePercent24Hr - aCoin.changePercent24Hr);
    setSortedChange(0);
    setCoins(sortedCoins);
    setFilterState([false, true, false, false]);
    setArrowUp([true, false, true, false]);
  
  }
}
const sortByCap = () =>{
  const allCoins = [...storedCoins];
  //format data for the sort function
  allCoins.forEach(d => { //reformat data
    if (d.marketCapUsd.slice(-1) === 'B') {
      d.marketCapUsd = d.marketCapUsd.slice(0, d.marketCapUsd.length -1) * 1000000000;
    } else if (d.marketCapUsd.slice(-1) === 'M') {
      d.marketCapUsd = d.marketCapUsd.slice(0, d.marketCapUsd.length - 1) * 1000000;
    } else {
      d.marketCapUsd = d.marketCapUsd.slice(0, d.marketCapUsd.length - 1) * 1000;
    }
  });
  
  let sortedCoins;

  if (sortedCap === 0) {
    sortedCoins = allCoins.sort((aCoin, bCoin) => aCoin.marketCapUsd - bCoin.marketCapUsd);
    setSortedCap(1);
    setFilterState([false, false, true, false]);
    setArrowUp([false, false, false, true]);
  } else {
    sortedCoins = allCoins.sort((aCoin, bCoin) => bCoin.marketCapUsd - aCoin.marketCapUsd);
    setSortedCap(0);
    setFilterState([false, false, true, false]);
    setArrowUp([false, true, false, true]);

  }

  sortedCoins.forEach(d => { //reformat data
    d.marketCapUsd = +d.marketCapUsd;
    if (d.marketCapUsd >= 1000000000) {
      d.marketCapUsd = ((d.marketCapUsd) / 1000000000).toFixed(2) + 'B';
    } else if (d.marketCapUsd >= 1000000) {
      d.marketCapUsd = (d.marketCapUsd / 1000000).toFixed(2) + 'M';
    } else {
      d.marketCapUsd = (d.marketCapUsd / 1000).toFixed(2) + 'K';
    }
  });

  setCoins(sortedCoins);
}
const sortByVol = () =>{
  const allCoins = [...storedCoins];
  //format data for the sort function
  allCoins.forEach(d => { //reformat data
    if (d.volumeUsd24Hr.slice(-1) === 'B') {
      d.volumeUsd24Hr = d.volumeUsd24Hr.slice(0, d.volumeUsd24Hr.length - 1) * 1000000000;
    } else if (d.volumeUsd24Hr.slice(-1) === 'M') {
      d.volumeUsd24Hr = d.volumeUsd24Hr.slice(0, d.volumeUsd24Hr.length - 1) * 1000000;
    } else {
      d.volumeUsd24Hr = d.volumeUsd24Hr.slice(0, d.volumeUsd24Hr.length - 1) * 1000;
    }
  });

  let sortedCoins;

  if (sortedVol === 0) {
    sortedCoins = allCoins.sort((aCoin, bCoin) => aCoin.volumeUsd24Hr - bCoin.volumeUsd24Hr);
    setSortedVol(1);
    setFilterState([false, false, false, true]);
    setArrowUp([false, false, false, true]);
  } else {
    sortedCoins = allCoins.sort((aCoin, bCoin) => bCoin.volumeUsd24Hr - aCoin.volumeUsd24Hr);
    setSortedVol(0);
    setFilterState([false, false, false, true]);
    setArrowUp([false, true, false, true]);
    
  }

  sortedCoins.forEach(d => { //reformat data
    d.volumeUsd24Hr = +d.volumeUsd24Hr;
    if (d.volumeUsd24Hr >= 1000000000) {
      d.volumeUsd24Hr = ((d.volumeUsd24Hr) / 1000000000).toFixed(2) + 'B';
    } else if (d.volumeUsd24Hr >= 1000000) {
      d.volumeUsd24Hr = (d.volumeUsd24Hr / 1000000).toFixed(2) + 'M';
    } else {
      d.volumeUsd24Hr = (d.volumeUsd24Hr / 1000).toFixed(2) + 'K';
    }
  });

  setCoins(sortedCoins);
}

return (
  <View style={styles.container}>
    <View style={styles.headerContainer}>
    <TouchableWithoutFeedback onPress={() => Keyboard.dismiss()}>
    <View style={{width:'100%', marginTop: 1}}>
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
    placeholder={'Filter coins...'}
    />
    <Icon style={starOn > 0 ? { color: Colors.star_on, marginTop: 30 } : { color: Colors.star_off, marginTop: 30}} name="ios-star" size={35} onPress={changeStar} />
    </View>
    <CoinFilters
      sortPrice={sortByPrice}
      sortChange={sortByChange}
      sortCap={sortByCap}
      sortVol={sortByVol}
      isOn={filterOn}
      arrowUp={arrowUp}
    />
    </View>
    </TouchableWithoutFeedback>
    <FlatList  
    style={{ width: '100%',marginBottom: 1, paddingLeft: 9 }}
    data={coins}
    onScrollBeginDrag={()=> Keyboard.dismiss()}
    renderItem={coin => (
        <CoinBlock
        navigate={()=>props.navigation.navigate({ 
          routeName: 'Chart', 
          params:{
            coinID: coin.item['id'],
            coinName: coin.item['name'],
            coinVol: coin.item['volumeUsd24Hr'],
            coinChange: coin.item['changePercent24Hr'],
            coinSupply: coin.item['supply'],
            coinMarketCap: coin.item['marketCapUsd'],
            coinPrice: coin.item['priceUsd']
          }
        }
        )}
        key={coin.item['id']} 
        changeStar={changeStarBlock}
        favOn={coin.item['star']}
        ranking={coin.item['rank']}
        coinID={allCoins[0] != undefined ? 
                (allCoins.find(d => d['name'] === coin.item['name'] || d['slug'] === coin.item['id'] || 
                d['symbol'] === coin.item['symbol']))['id'] : 1} 
        coinName={coin.item['name']} 
        coinSymbol={coin.item['symbol']}
        coinChange={coin.item['changePercent24Hr']}
        coinPrice={coin.item['priceUsd']}
        coinMarket={coin.item['marketCapUsd']}
        coinVolume={coin.item['volumeUsd24Hr']}
        />
      )}
    />
    </View>
  </View>

);
}
Coins.navigationOptions = {
  headerStyle: {
    backgroundColor: Colors.secondary,
  },
  headerTintColor: Colors.text_primary,
  title: 'Coins',
  headerTitleAlign: 'center',
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.primary,
    alignItems: 'center',
    justifyContent: 'center',
  },
  filterFlex:{
    flexDirection: "row",
    justifyContent: 'space-evenly',
    alignItems: 'center'
  },
  headerContainer:{
    flex:1,
    width: '100%'
  }
});