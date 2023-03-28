import { createNativeStackNavigator } from '@react-navigation/native-stack'
import React from 'react'
import WelcomeScreen from '../../screens/common/WelcomeScreen'


import CustomerNavigations from '../customer/CustomerNavigations'
import TechnicianNavigation from '../technician/TechnicianNavigations'

const stack= createNativeStackNavigator()
const AppStack=()=>{
    return(
        <stack.Navigator screenOptions={{headerShown:false}}>
            <stack.Screen component={WelcomeScreen} name="WelcomeScreen" />
            <stack.Screen component={CustomerNavigations} name="CustomerNavigations" />
            <stack.Screen component={TechnicianNavigation} name="TechnicianNavigation" />
        </stack.Navigator>
    )
}

export default AppStack