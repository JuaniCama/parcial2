import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import DestinationsScreen from '../screens/DestinationsScreen';
import AddorEditDestinationScreen from '../screens/AddorEditDestinationScreen';

const Stack = createStackNavigator();
const Tab = createBottomTabNavigator();

const DestinationsStack = () => (
  <Stack.Navigator>
    <Stack.Screen name="Destinos" component={DestinationsScreen} />
    <Stack.Screen name="Editar Destino" component={AddorEditDestinationScreen} />
  </Stack.Navigator>
);

const AddStack = () => (
  <Stack.Navigator>
    <Stack.Screen name="Agregar Destino" component={AddorEditDestinationScreen} />
  </Stack.Navigator>
);

const AppNavigator: React.FC = () => {
  return (
    <Tab.Navigator  screenOptions={{ headerShown: false }}>
      <Tab.Screen name="Destinos" component={DestinationsStack} />
      <Tab.Screen name="Agregar" component={AddStack} />
    </Tab.Navigator>
  );
};

export default AppNavigator;