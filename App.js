import React from 'react';
import Ionicons from 'react-native-vector-icons/Ionicons';
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { DataProvider } from './components/dataprovider';
import List from './components/list';
import Generator from './components/generator';
import "./App.css";

const Tab = createBottomTabNavigator();

export default function App() {
  return (
    <DataProvider>
      <NavigationContainer>
        <Tab.Navigator
          screenOptions={({ route }) => ({
            tabBarIcon: ({ focused, color, size }) => {
              let iconName;

              if (route.name === 'Generator') {
                iconName = focused ? 'calculator' : 'calculator';
              } else if (route.name === 'List') {
                iconName = focused ? 'list' : 'list';
              }

              // You can return any component that you like here!
              return <Ionicons name={iconName} size={size} color={color} />;
            },
            tabBarActiveTintColor: 'green',
            tabBarInactiveTintColor: 'gray',
            tabBarStyle: {
              backgroundColor: 'black', // Set the background color
            },
            headerStyle: {
              backgroundColor: '#000000', // set the background color of the header
            },
            headerTintColor: '#fff', // set the text color of the header
          })}
          tabBarOptions={{
            style: {
              backgroundColor: 'black', // Set the background color
            },
          }}>
          <Tab.Screen name="Generator" component={Generator} />
          <Tab.Screen name="List" component={List} />
        </Tab.Navigator>
      </NavigationContainer>
    </DataProvider>
  );
}
