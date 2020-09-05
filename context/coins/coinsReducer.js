import { GET_COINCAP_COINS, COINS_ERROR, GET_ICON_COINS, ICONS_ERROR } from '../types';

export default (state, action) => {
  switch (action.type) {
    case GET_COINCAP_COINS:
        return  {
        ...state,
        coins: action.payload,
        loadingGlobal: false,
        };
    case GET_ICON_COINS:
        return  {
        ...state,
        allCoins: action.payload,
        loadingIcons: false,
        };
    case COINS_ERROR:
        return {
            ...state,
            error: action.payload,
            loadingGlobal: false,
        };
    case ICONS_ERROR:
        return {
            ...state,
            error: action.payload,
            loadingIcons: false,
        };
    default:
      return state;
  }
};
