import "react-native-gesture-handler";
import React, { useContext } from "react";
import { StyleSheet } from "react-native";
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
// import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";

// import HomeScreen from '../screens/HomeScreen'
// import NotificationScreen from "../screens/NotificationScreen";
// import BottomTab from "./tabNavigator";
import WelcomeScreen from "../screens/common/WelcomeScreen";
import RequestService from "../screens/customer/RequestService";
import Home from "../screens/customer/Home/Home";
import CustomerNavigations from "../navigations/customer/CustomerNavigations";
// import Dashboard from "../screens/NjangiDashboard";
// import Create from "../screens/CreateNjanigiScreen";
// import Manage from "../screens/ManageNjangiesScreen";

const Stack = createStackNavigator();

const MainStack = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator >
        <Stack.Screen
          name="Home"
          component={Home}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name="WelcomeScreen"
          component={WelcomeScreen}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name="RequestService"
          component={RequestService}
          options={{ headerShown: false }}
        />
        {/* <Stack.Screen
          name="CustomerNavigations"
          component={CustomerNavigations}
          options={{ headerShown: false }}
        /> */}

      </Stack.Navigator>
    </NavigationContainer>
  );
};
export default MainStack;
const styles = StyleSheet.create({});
