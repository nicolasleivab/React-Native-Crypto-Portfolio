import React, { useContext } from 'react';
import AppNavigator from './navigation/AppNavigator/AppNavigator';
import ThemeContext from "./context/theme/themeContext";

const NavigatorContainer = () => {
const themeContext = useContext(ThemeContext);
const { theme } = themeContext;
const Colors = {...theme};

const screenProps = {
    Colors,
  }

return  <AppNavigator style={{flex:1, backgroundColor: Colors.primary}} screenProps={screenProps} />
}

export default NavigatorContainer;
