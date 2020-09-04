import React from 'react';
import { createStackNavigator } from 'react-navigation-stack';
import { createBottomTabNavigator } from 'react-navigation-tabs';
import { createAppContainer } from 'react-navigation';
import Coins from '../../screens/Coins/Coins';
import Chart from '../../screens/Chart/Chart';
import Portfolio from '../../screens/Portfolio/Portfolio';
import NewsFeed from '../../screens/NewsFeed/NewsFeed';
import Settings from '../../screens/Settings/Settings';
import Icon from 'react-native-vector-icons/Ionicons';

const ChartNavigator = createStackNavigator({
    Coins: {
        screen: Coins,  
},
    Chart: {
        screen: Chart,
    }
},
{
    defaultNavigationOptions: {
        animationEnabled: true,
        animationTypeForReplace: 'push',
        cardShadowEnabled: false,
        gestureDirection: 'horizontal'
        
    }
}
)
const PortfolioTab = createStackNavigator({
    Portfolio: {
        screen: Portfolio,
    }
}
)
const NewsFeedTab = createStackNavigator({
    NewsFeed: {
        screen: NewsFeed,
    }
}
)
const SettingsTab = createStackNavigator({
    Coins: {
        screen: Settings,
    }
}
)

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
        screen:PortfolioTab,
        navigationOptions: {
            tabBarIcon: (tabInfo) => {
                return <Icon name="ios-pie" size={25} color={tabInfo.tintColor}></Icon>
            }  
        }
    },
    NewsFeed: {
        screen: NewsFeedTab,
        navigationOptions: {
            tabBarIcon: (tabInfo) => {
                return <Icon name="ios-list-box" size={25} color={tabInfo.tintColor}></Icon>
            },
            title: 'News Feed'
        }
    },
    Settings: {
        screen: SettingsTab,
        navigationOptions: {
            tabBarIcon: (tabInfo) => {
                return <Icon name="ios-settings" size={25} color={tabInfo.tintColor}></Icon>
            }  
        }
    }
}, {
    tabBarOptions: (screenProps) => ({
        activeBackgroundColor: screenProps.Colors.primary,
        inactiveBackgroundColor: screenProps.Colors.secondary,
        activeTintColor: screenProps.Colors.text_primary,

    }),
    defaultNavigationOptions:{
        animations: {
            pop: {
                content: {
                    alpha: {
                        from: 1,
                        to: 0,
                        duration: 300,
                        startDelay: 0,
                        interpolation: 'accelerate'
                    }
                }
            },
            push: {
                waitForRender: true,
                content: {
                    alpha: {
                        from: 0,
                        to: 1,
                        duration: 300,
                        startDelay: 0,
                        interpolation: 'accelerate'
                    }
                }
            }
        }
    }

})

export default createAppContainer(AppNavigator);