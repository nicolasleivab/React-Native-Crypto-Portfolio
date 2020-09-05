import { GET_COINCAP_COINS, COINS_ERROR } from '../types';

export default (state, action) => {
  switch (action.type) {
    case GET_COINCAP_COINS:
      return  {
        ...state,
        coins: action.payload,
        loadingGlobal: false,
        };
    case COINS_ERROR:
        return {
            ...state,
            error: action.payload,
            loadingGlobal: false,
        };
    default:
      return state;
  }
};
