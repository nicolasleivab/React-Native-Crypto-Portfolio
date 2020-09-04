import React, { useReducer } from 'react';
import ThemeContext from './themeContext';
import themeReducer from './themeReducer';
import { SET_LIGHT_THEME, SET_DARK_THEME } from '../types';

const ThemeState = props => {
  const initialState = {
    theme: {
    primary: '#FFF',
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
  const [state, dispatch] = useReducer(themeReducer, initialState);

  // Set Theme
  const setLightTheme = () => {
      dispatch({ type: SET_LIGHT_THEME });
  };

  const setDarkTheme = () => {
    console.log('CALLING');
    dispatch({ type: SET_DARK_THEME})
  }

  return (
    <ThemeContext.Provider
      value={{
        theme: state.theme,
        setLightTheme,
        setDarkTheme,
      }}
    >
      {props.children}
    </ThemeContext.Provider>
  );
};

export default ThemeState;
