import React, { useState, useEffect } from 'react';
import Coins from './screens/Coins/Coins';
import ChartNavigator from './navigation/ChartNavigator/ChartNavigator';

export default function App() {

return (
  <ChartNavigator
  screen={Coins}/>
);
}