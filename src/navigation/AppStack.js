import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import Ionicons from 'react-native-vector-icons/Ionicons';

import HomeScreen from '../screens/HomeScreen';
import ProfileScreen from '../screens/ProfileScreen';
import NewPickupScreen from '../screens/NewPickupScreen';
import ViewPickupScreen from '../screens/ViewPickupScreen';
import PickupDetailsScreen from '../screens/PickupDetailsScreen';
import EditPickupDetailsScreen from '../screens/EditPickupDetailsScreen';
import EditProfileScreen from '../screens/EditProfileScreen';

const Stack = createStackNavigator();
const Tab = createBottomTabNavigator();

const HomeStack = ({ navigation }) => (
  <Stack.Navigator>
    <Stack.Screen
      name="Dashboard"
      component={HomeScreen}
      options={{ headerShown: false }}
    />
    <Stack.Screen
      name="NewPickup"
      component={NewPickupScreen}
      options={{
        headerTitle: 'New Pickup',
        headerBackTitleVisible: false,
        headerTitleAlign: 'center',
        headerStyle: {
          backgroundColor: '#fff',
          shadowColor: '#fff',
          elevation: 0,
        },
        headerTitleStyle: { color: '#051d5f' },
        headerTintColor: 'blue'
      }}
    />
    <Stack.Screen
      name="ViewPickup"
      component={ViewPickupScreen}
      options={{
        headerTitle: 'Pickup History',
        headerBackTitleVisible: false,
        headerTitleAlign: 'center',
        headerStyle: {
          backgroundColor: '#fff',
          shadowColor: '#fff',
          elevation: 0,
        },
        headerTitleStyle: { color: '#051d5f' },
        headerTintColor: 'blue'
      }}
    />
    <Stack.Screen
      name="PickupDetails"
      component={PickupDetailsScreen}
      options={{
        headerTitle: 'Pickup Details',
        headerBackTitleVisible: false,
        headerTitleAlign: 'center',
        headerStyle: {
          backgroundColor: '#fff',
          shadowColor: '#fff',
          elevation: 0,
        },
        headerTitleStyle: { color: '#051d5f' },
        headerTintColor: 'blue'
      }}
    />
    <Stack.Screen
      name="EditPickupDetails"
      component={EditPickupDetailsScreen}
      options={{ headerShown: false }}
    />
  </Stack.Navigator>
);


const SearchStack = ({ navigation }) => (
  <Stack.Navigator>
    <Stack.Screen
      name="search"
      component={SearchScreen}
      options={{
        headerShown: false,
      }}
    />
  </Stack.Navigator>
);

const ChatStack = ({ navigation }) => (
  <Stack.Navigator>
    <Stack.Screen
      name="chat"
      component={ChatScreen}
      options={{
        headerShown: false,
      }}
    />
  </Stack.Navigator>
);

const ProfileStack = ({ navigation }) => (
  <Stack.Navigator>
    <Stack.Screen
      name="userProfile"
      component={ProfileScreen}
      options={{
        headerShown: false,
      }}
    />
    <Stack.Screen
      name="EditProfile"
      component={EditProfileScreen}
      options={{
        headerTitle: 'Edit Profile',
        headerBackTitleVisible: false,
        headerTitleAlign: 'center',
        headerStyle: {
          backgroundColor: '#fff',
          shadowColor: '#fff',
          elevation: 0,
        },
        headerTitleStyle: { color: '#051d5f' },
        headerTintColor: 'blue'
      }}
    />
  </Stack.Navigator>
);

const AppStack = () => {
  //console.log('AppStack')
  return (
    <Tab.Navigator>
      <Tab.Screen
        name="Home"
        component={HomeStack}
        options={({ route }) => ({
          headerShown: false,
          tabBarIcon: ({ color, size }) => (
            <MaterialCommunityIcons
              name="home"
              color={color}
              size={size}
            />
          ),
        })}
      />
      <Tab.Screen
        name="Search"
        component={SearchStack}
        options={{
          headerShown: false,
          tabBarIcon: ({ color, size }) => (
            <Ionicons name="search-sharp" color={color} size={size} />
          ),
        }}
      />
      <Tab.Screen
        name="Chat"
        component={ChatStack}
        options={{
          headerShown: false,
          tabBarIcon: ({ color, size }) => (
            <Ionicons name="chatbubble-sharp" color={color} size={size} />
          ),
        }}
      />
      <Tab.Screen
        name="Profile"
        component={ProfileStack}
        options={{
          headerShown: false,
          tabBarIcon: ({ color, size }) => (
            <Ionicons name="person-sharp" color={color} size={size} />
          ),
        }}
      />
    </Tab.Navigator>
  );
};

export default AppStack;