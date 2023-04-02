import React,{useState,useEffect} from 'react'
import { createNativeStackNavigator } from '@react-navigation/native-stack'


import AssignedWork from '../../screens/technician/AssignedWork/AssignedWork'
import TechnicianWallet from '../../screens/technician/Wallet/Wallet'
import TechnicianProfile from '../../screens/technician/Account/Profile'
import TechnicianWorkHistory from '../../screens/technician/WorkHistory/WorkHistory'
import { Ionicons } from '@expo/vector-icons';

import { useNavigation } from '@react-navigation/native'
import { TouchableOpacity ,View} from 'react-native'
import Colors from '../../config/colors/Colors'
import LoginScreen from '../../screens/auth/technician/LoginTechnician'
import RegisterScreen from '../../screens/auth/technician/RegisterTechnician'
import { onAuthStateChanged } from 'firebase/auth'
import { auth } from '../../../firebase.config'
import AsyncStorage from "@react-native-async-storage/async-storage";
const stack= createNativeStackNavigator()
const TechnicianNavigation=()=>{
    const navigation=useNavigation()
    
  const [user,setUser]=useState('')
  useEffect(()=>{
const checkUser=()=>{
const subscriber=  onAuthStateChanged(auth, (userExists)=>{
      if(userExists){
AsyncStorage.getItem('userType').then((val)=>{
  setUser(userExists)
// if(val=='Technician'){
//   setUser(userExists)
// }
// else{
//   setUser('')
// }
})
       
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
          { user ? 
            <stack.Group>

           
           
            <stack.Screen component={AssignedWork} name="AssignedWork" options={{
                headerShown:true,
                headerTitle:'TechShop', 
                headerTitleAlign:'center',
                headerRight: () => (
                    <TouchableOpacity
                    onPress={()=>{navigation.navigate('TechnicianWallet')}}
                    >
              <Ionicons name="ios-wallet" size={35}  color={Colors.deepBlue} />
                        
                    </TouchableOpacity>
                 
                  ),
                 
                headerLeft: () => (
                    <TouchableOpacity
                    onPress={()=>{navigation.navigate('TechnicianProfile')}}
                    >
                        
              <Ionicons name="md-person-circle" size={35}  color={Colors.deepBlue} />
                        
                    </TouchableOpacity>
                 
                  ),

                
                
            }}
                />
            <stack.Screen component={TechnicianWallet} name="TechnicianWallet" options={{headerShown:true,headerTitle:'TechShop', headerTitleAlign:'center'}}/>
            <stack.Screen component={TechnicianProfile} name="TechnicianProfile" options={{headerShown:true,headerTitle:'TechShop', headerTitleAlign:'center'}}/>
            <stack.Screen component={TechnicianWorkHistory} name="TechnicianWorkHistory" options={{headerShown:true,headerTitle:'TechShop', headerTitleAlign:'center'}}/>
            </stack.Group>:
            <stack.Group>
            <stack.Screen component={LoginScreen} name="LoginScreen" />
            <stack.Screen component={RegisterScreen} name="RegisterScreen" />
                 </stack.Group>}
        </stack.Navigator>
    )
}

export default TechnicianNavigation