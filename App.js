import React, { useState, useEffect } from 'react';
import AppNavigator from './navigation/AppNavigator/AppNavigator';
import { enableScreens } from 'react-native-screens';
import Colors from './constants/colors';
import ThemeState from "./context/theme/ThemeState";

//enableScreens();
export default function App() {
return (
  <ThemeState>
    <AppNavigator style={{flex:1, backgroundColor: Colors.primary}}/>
  </ThemeState>
);
}
