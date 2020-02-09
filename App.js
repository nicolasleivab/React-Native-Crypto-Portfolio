import React, { useState, useEffect } from 'react';
import AppNavigator from './navigation/AppNavigator/AppNavigator';
import { enableScreens } from 'react-native-screens';

enableScreens();

export default function App() {

return (
  <AppNavigator/>
);
}