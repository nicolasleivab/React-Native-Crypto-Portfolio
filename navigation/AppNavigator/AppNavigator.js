import { createStackNavigator } from 'react-navigation-stack';
import { createBottomTabNavigator } from 'react-navigation-tabs';
import { createAppContainer } from 'react-navigation';
import Coins from '../../screens/Coins/Coins';
import Chart from '../../screens/Chart/Chart';
import Portfolio from '../../screens/Portfolio/Portfolio';
import NewsFeed from '../../screens/NewsFeed/NewsFeed';
import Settings from '../../screens/Settings/Settings';

const ChartNavigator = createStackNavigator({
    Coins: {
        screen: Coins,  
},
    Chart: Chart,
})

const AppNavigator = createBottomTabNavigator({
    Coins :{
        screen: ChartNavigator
    },
    Portfolio: Portfolio,
    NewsFeed: NewsFeed,
    Settings: Settings
})

export default createAppContainer(AppNavigator);