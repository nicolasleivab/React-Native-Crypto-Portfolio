import React from 'react';
import NavigatorContainer from './navigatorContainer';
import ThemeState from "./context/theme/ThemeState";
import CoinState from "./context/coins/CoinsState";

//enableScreens();
export default function App() {
return (
  <CoinState>
    <ThemeState>
      <NavigatorContainer />
    </ThemeState>
  </CoinState>
);
}
