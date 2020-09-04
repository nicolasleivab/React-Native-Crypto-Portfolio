import React from 'react';
import NavigatorContainer from './navigatorContainer';
import ThemeState from "./context/theme/ThemeState";

//enableScreens();
export default function App() {
return (
  <ThemeState>
    <NavigatorContainer />
  </ThemeState>
);
}
