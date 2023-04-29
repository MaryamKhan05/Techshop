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
import { auth } from '../../../firebase.config'
import RequestQuickService from '../../screens/customer/QuickService/QuickService'

const stack= createNativeStackNavigator()
const CustomerNavigations=()=>{
    const [user,setUser]=useState('')
    useEffect(()=>{
const checkUser=()=>{
  const subscriber=  onAuthStateChanged(auth, (userExists)=>{
        if(userExists){

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