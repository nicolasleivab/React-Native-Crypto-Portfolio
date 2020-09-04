import { SET_LIGHT_THEME, SET_DARK_THEME } from '../types';

export default (state, action) => {
  switch (action.type) {
    case SET_DARK_THEME:
      return  {
        ...state,
        theme: {
        primary: '#30344E',
        secondary: '#1c1e2e',
        coinblock: '#445378',
        text_primary: '#FFF',
        text_secondary: '#CCC',
        star_on: '#ffff80',
        star_off: '#555',
        star_off2: '#AAA',
        positive_value: '#00ff80',
        negative_value: '#ff6666',
        shadow: '#000',
        }
    };
    case SET_LIGHT_THEME:
      return {
        ...state,
        theme: {
        primary: '#FFF',
        secondary: '#DDD',
        coinblock: '#CCC',
        text_primary: '#000',
        text_secondary: '#555',
        star_on: '#ffff80',
        star_off: '#555',
        positive_value: '#00ff80',
        negative_value: '#ff6666',
        shadow: '#000',
      }
    };
    default:
      return state;
  }
};
