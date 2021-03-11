import React from 'react';
import {StatusBar,View} from 'react-native';
import {createAppContainer, createSwitchNavigator} from 'react-navigation'
import WelcomeScreen from './screens/WelcomeScreen'
import HomeScreen from './screens/HomeScreen';
import SessionsScreen from './screens/SessionsScreen'
import {TabNavigator} from './components/TabNavigator'
export default class App extends React.Component{
  render(){
    return(
      <View style={{ flex: 1, marginTop: StatusBar.currentHeight }}>
      <AppContainer/>
      </View>
    )
  }
}

const AppNavigator = createSwitchNavigator({
  WelcomeScreen:{screen:WelcomeScreen},
  TabNavigator:{screen:TabNavigator},
  
});

const AppContainer = createAppContainer(AppNavigator);