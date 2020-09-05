import React, { useReducer } from 'react';
import CoinsContext from './coinsContext';
import CoinsReducer from './coinsReducer';
import { GET_COINCAP_COINS, COINS_ERROR, GET_ICON_COINS, ICONS_ERROR } from '../types';
import { formatIncomingCoins } from '../../helpers';
import { api } from '../../config/api';
import axios from 'axios';

const CoinsState = props => {
  const initialState = {
    coins: [],
    allCoins: [],
    loadingGlobal: true,
    loadingIcons: true,
  };
  const [state, dispatch] = useReducer(CoinsReducer, initialState);

  const apiKey = {
    key: api.cmcKey,
  };

  // Get Coins
  const getCoinGeckoCoins = async () => {
      try {
        const res = await axios.get('https://api.coingecko.com/api/v3/global');
        const formattedCoins = formatIncomingCoins(res.data);
        dispatch({ type: GET_COINCAP_COINS, payload: formattedCoins });

      } catch (err) {
        dispatch({ type: COINS_ERROR, payload: err.response.msg });
      }
  };

  // Get Icons
  const getCoinIcons = async () => {
    try {
        const res = await axios.get("https://pro-api.coinmarketcap.com/v1/cryptocurrency/map?CMC_PRO_API_KEY="+apiKey.key);
        const rawData = res.data;
        
        dispatch({ type: GET_ICON_COINS, payload: rawData });

      } catch (err) {
          console.log(err.response.msg);
        dispatch({ type: ICONS_ERROR, payload: err.response.msg });
      }
  }

  return (
    <CoinsContext.Provider
      value={{
        globalData: state.coins,
        allCoins: state.allCoins.data,
        loadingGlobal: state.loadingGlobal,
        loadingIcons: state.loadingIcons,
        getGlobalData: getCoinGeckoCoins,
        getCoinIcons,
      }}
    >
      {props.children}
    </CoinsContext.Provider>
  );
};

export default CoinsState;
