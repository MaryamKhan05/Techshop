import "react-native-gesture-handler";
import React, { useContext } from "react";
import { StyleSheet } from "react-native";
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import Home from "../../screens/admin/Home/Home";
import SparePartsReq from "../../screens/admin/SparePartsReq/SparePartsReq";
import VehicleReq from "../../screens/admin/VehicleReq/VehicleReq";
import CustomerServiceReq from "../../screens/admin/CustomerServiceReq/CustomerServiceReq";
import Services from "../../screens/admin/Services/Services";
import AdminDrawer from "./adminDrawer";
import AddService from "../../screens/admin/Services/AddServices";
import EditService from "../../screens/admin/Services/EditServices";
import Detail from "../../screens/admin/ServiceDetail/ServiceDetail";
import AddParts from "../../screens/admin/SparePartsReq/AddSpareParts";
import EditSpareParts from "../../screens/admin/SparePartsReq/EditSpareParts";

const Stack = createStackNavigator();

const AdminStack = () => {
  return (
   
      <Stack.Navigator>

        <Stack.Screen
          name="AdminDrawer"
          component={AdminDrawer}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name="Home"
          component={Home}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name="SparePartsReq"
          component={SparePartsReq}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name="VehicleReq"
          component={VehicleReq}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name="CustomerServiceReq"
          component={CustomerServiceReq}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name="Services"
          component={Services}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name="AddService"
          component={AddService}
          options={{ headerTitle: 'Add New Service',headerTitleAlign:'center' }}
        />
        <Stack.Screen
          name="EditService"
          component={EditService}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name="Detail"
          component={Detail}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name="AddParts"
          component={AddParts}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name="EditSpareParts"
          component={EditSpareParts}
          options={{ headerShown: false }}
        />
      </Stack.Navigator>
 
  );
};
export default AdminStack;
const styles = StyleSheet.create({});
