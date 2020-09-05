import React, { useReducer } from 'react';
import CoinsContext from './coinsContext';
import CoinsReducer from './coinsReducer';
import { GET_COINCAP_COINS, COINS_ERROR } from '../types';
import { formatIncomingCoins } from '../../helpers';
import axios from 'axios';

const CoinsState = props => {
  const initialState = {
    coins: [],
    loadingGlobal: true,
  };
  const [state, dispatch] = useReducer(CoinsReducer, initialState);

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

  return (
    <CoinsContext.Provider
      value={{
        globalData: state.coins,
        loadingGlobal: state.loadingGlobal,
        getGlobalData: getCoinGeckoCoins,
      }}
    >
      {props.children}
    </CoinsContext.Provider>
  );
};

export default CoinsState;
