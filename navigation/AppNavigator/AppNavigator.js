import React from 'react';
import { createStackNavigator } from 'react-navigation-stack';
import { createBottomTabNavigator } from 'react-navigation-tabs';
import { createAppContainer } from 'react-navigation';
import Coins from '../../screens/Coins/Coins';
import Chart from '../../screens/Chart/Chart';
import Portfolio from '../../screens/Portfolio/Portfolio';
import NewsFeed from '../../screens/NewsFeed/NewsFeed';
import Settings from '../../screens/Settings/Settings';
import Colors from '../../constants/colors';
import Icon from 'react-native-vector-icons/Ionicons';

const ChartNavigator = createStackNavigator({
    Coins: {
        screen: Coins,  
},
    Chart: {
        screen: Chart,
    }
})

const AppNavigator = createBottomTabNavigator({
    Coins :{
        screen: ChartNavigator,
        navigationOptions: {
            tabBarIcon: (tabInfo)=> {
                return <Icon name="logo-bitcoin" size={25} color={tabInfo.tintColor}></Icon>
            }
        }
    },
    Portfolio:{
        screen:Portfolio,
        navigationOptions: {
            tabBarIcon: (tabInfo) => {
                return <Icon name="ios-pie" size={25} color={tabInfo.tintColor}></Icon>
            }  
        }
    },
    NewsFeed: {
        screen: NewsFeed,
        navigationOptions: {
            tabBarIcon: (tabInfo) => {
                return <Icon name="ios-list-box" size={25} color={tabInfo.tintColor}></Icon>
            }  
        }
    },
    Settings: {
        screen: Settings,
        navigationOptions: {
            tabBarIcon: (tabInfo) => {
                return <Icon name="ios-settings" size={25} color={tabInfo.tintColor}></Icon>
            }  
        }
    }
}, {
    tabBarOptions: {
        activeBackgroundColor: Colors.primary,
        inactiveBackgroundColor: Colors.secondary,
        activeTintColor: Colors.text_primary,
        

    }

})
//Hide tab nav for stacked screens
ChartNavigator.navigationOptions = ({ navigation }) => {
    let tabBarVisible = true;
    if (navigation.state.index > 0) {
        tabBarVisible = false;
    }

    return {
        tabBarVisible,
    };
};

export default createAppContainer(AppNavigator);