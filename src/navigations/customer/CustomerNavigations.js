import React, { useEffect ,useState} from 'react'
import { createNativeStackNavigator } from '@react-navigation/native-stack'

import {View,Text,TouchableOpacity} from 'react-native'

import CustomerDrawer from './CustomerDrawer'
import RequestService from '../../screens/customer/ServiceRequestForm/RequestForm'
import Colors from '../../config/colors/Colors'
import RequestSparePart from '../../screens/customer/SparePartRequestForm/SparePartRequest'
import LoginScreen from '../../screens/auth/customer/LoginCustomer'
import RegisterScreen from '../../screens/auth/customer/RegisterCustomer'
import { onAuthStateChanged } from 'firebase/auth'
import { auth, db } from '../../../firebase.config'
import RequestQuickService from '../../screens/customer/QuickService/QuickService'
import CustomerNotifications from '../../screens/customer/Notifications/Notifications'
import ServiceDetails from '../../screens/customer/ServiceDetails/ServiceDetails'
import { doc, getDoc } from 'firebase/firestore'
import AsyncStorage from '@react-native-async-storage/async-storage'

const stack= createNativeStackNavigator()
const CustomerNavigations=()=>{
    const [user,setUser]=useState('')
    useEffect(()=>{
const checkUser=()=>{
  const subscriber=  onAuthStateChanged(auth, async(userExists)=>{
        if(userExists){

       
   const docRef=   doc  (db,'Customers' ,auth.currentUser.uid)
   const docResult=await getDoc(docRef)

 await  AsyncStorage.setItem('UserName',docResult.data().name)
await   AsyncStorage.setItem('UserPhoneNo',docResult.data().PhoneNo)

   setUser(userExists)
       }
        else{
          setUser('')
        }
       
        return subscriber
      })
}
checkUser()
    },[])
    return(
        <stack.Navigator screenOptions={{headerShown:false}}>
            
      {
user ?
       
         
            
                <stack.Group>
                <stack.Screen component={CustomerDrawer} name="CustomerDrawer" />
            <stack.Screen component={RequestService} name="RequestService" options={{headerShown:true,headerTitle:'Request Service', headerTitleAlign:'center'}}/>
            <stack.Screen component={RequestQuickService} name="RequestQuickService" options={{headerShown:true,headerTitle:'Request Service', headerTitleAlign:'center'}}/>
            <stack.Screen component={RequestSparePart} name="RequestSparePart" options={{headerShown:true,headerTitle:'Request Spare Parts', headerTitleAlign:'center'}}/>
            <stack.Screen component={CustomerNotifications} name="CustomerNotifications" options={{headerShown:true,headerTitle:'Request Spare Parts', headerTitleAlign:'center'}}/>
            <stack.Screen component={ServiceDetails} name="ServiceDetails" options={{headerShown:true,headerTitle:'Request Spare Parts', headerTitleAlign:'center'}}/>
                </stack.Group>

                :
                <stack.Group>

                <stack.Screen component={LoginScreen} name="LoginScreen" />
               <stack.Screen component={RegisterScreen} name="RegisterScreen" />
            </stack.Group>
      } 
        </stack.Navigator>
    )
}

export default CustomerNavigations