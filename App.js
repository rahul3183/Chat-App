import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View } from 'react-native';
import AddChat from './screens/AddChat';
import ChatScreen from './screens/ChatScreen';
import Home from './screens/Home';
import LoginScreen from './screens/LoginScreen';
import RegisterScreen from './screens/RegisterScreen';
import User from './screens/User';

const Stack = createNativeStackNavigator();

export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName='login' >
        <Stack.Screen name="login" component={LoginScreen} options={{headerShown:false}} />
        <Stack.Screen name="register" component={RegisterScreen} options={{headerShown:false}}/>
        <Stack.Screen name="home" component={Home} />
        <Stack.Screen name="profile" component={User} />
        <Stack.Screen name="addChat" component={AddChat} />
        <Stack.Screen name="chat" component={ChatScreen} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}