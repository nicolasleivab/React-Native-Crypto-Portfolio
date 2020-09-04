import React, { useContext } from 'react';
import ThemeContext from "../context/theme/themeContext";

const Colors = () => {
const themeContext = useContext(ThemeContext);
const { theme } = themeContext;
const Colors = {...theme};

return {
   ...Colors
};
}

export default Colors;
