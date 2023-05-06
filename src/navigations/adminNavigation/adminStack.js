import "react-native-gesture-handler";
import React, { useContext,useEffect,useState } from "react";
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
import RequestApprovalScreen from "../../screens/admin/ServiceDetail/RequestApproval";
import LoginScreen from "../../screens/auth/admin/AdminLogin";
import { onAuthStateChanged } from 'firebase/auth'
import { auth } from '../../../firebase.config'
import AsyncStorage from "@react-native-async-storage/async-storage";
import AdminNotifications from "../../screens/admin/Notifications/AdminNotifications";
import ServiceDetailsNotified from "../../screens/admin/NotifiedServiceDetails/ServiceDetailsNotified";
const Stack = createStackNavigator();

const AdminStack = () => {

  const [user,setUser]=useState('')
  useEffect(()=>{
const checkUser=()=>{
const subscriber=  onAuthStateChanged(auth, (userExists)=>{
      if(userExists){
        setUser(userExists)
// AsyncStorage.getItem('userType').then((val)=>{
// if(val=='Admin'){
//   setUser(userExists)
// }
// else{
//   setUser('')
// }
// })
       
     }
      else{
        setUser('')
      }
     
      return subscriber
    })
}
checkUser()
  },[])
  return (
   
      <Stack.Navigator>
      {user? 
<Stack.Group>


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
          name="RequestApprovalScreen"
          component={RequestApprovalScreen}
          options={{ headerTitle: 'Assign TechShop Professional',headerTitleAlign:'center' }}
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
        <Stack.Screen
          name="AdminNotifications"
          component={AdminNotifications}
          options={{ headerShown: true,headerTitle:'Notifications' }}
        />
        <Stack.Screen
          name="ServiceDetailsNotified"
          component={ServiceDetailsNotified}
          options={{ headerShown: true,headerTitle:'Service Details' }}
        />
        </Stack.Group>:
         <Stack.Group>
         <Stack.Screen
           name="LoginScreen"
           component={LoginScreen}
           options={{ headerShown: false }}
         />
         </Stack.Group>
         
        }
      </Stack.Navigator>
 
  );
};
export default AdminStack;
const styles = StyleSheet.create({});
