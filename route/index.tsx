import React from 'react'
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import MapScreen from '../screens/Map';
import MapDetail from '../screens/MapDetails'


const Stack = createStackNavigator();
function Route() {
  return (
    <NavigationContainer>
      <Stack.Navigator
        headerMode="none"
        initialRouteName="map"
      >
        <Stack.Screen name="map" component={MapScreen} />
        <Stack.Screen name="detail" component={MapDetail} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}

export default Route;
