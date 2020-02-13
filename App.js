import React, { useState, useEffect } from 'react';
import AppNavigator from './navigation/AppNavigator/AppNavigator';
import { enableScreens } from 'react-native-screens';
import Colors from './constants/colors';

//enableScreens();

export default function App() {

return (
  <AppNavigator style={{flex:1, backgroundColor: Colors.primary}}/>
);
}