export const formatIncomingCoins = (coins) => {
      
      const rawData = coins.data;
      
      const formatMarketCap = (rawData['total_market_cap']['usd']/1000000000).toFixed(2) + 'B';
      const formatBTCDom = (rawData['market_cap_percentage']['btc']).toFixed(2) + '%';
      const formatTotalVolume = (rawData['total_volume']['usd'] / 1000000000).toFixed(2) + 'B';
      const formatMarketChange = (rawData["market_cap_change_percentage_24h_usd"]).toFixed(2);

      const formattedData = {...rawData};
      formattedData['total_market_cap']['usd'] = formatMarketCap;
      formattedData['market_cap_percentage']['btc'] = formatBTCDom;
      formattedData['total_volume']['usd'] = formatTotalVolume;
      formattedData["market_cap_change_percentage_24h_usd"] = formatMarketChange;

      console.log('global data ready');

      return formattedData;
}
