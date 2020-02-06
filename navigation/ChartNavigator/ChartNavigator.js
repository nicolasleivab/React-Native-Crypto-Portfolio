import { createStackNavigator } from 'react-navigation-stack';
import { createAppContainer } from 'react-navigation';
import Coins from '../../screens/Coins/Coins';
import Chart from '../../screens/Chart/Chart';

const ChartNavigator = createStackNavigator({
    Coins: {
        screen: Coins,  
},
    Chart: Chart,
})

export default createAppContainer(ChartNavigator);