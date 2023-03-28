import React from 'react'
import { createNativeStackNavigator } from '@react-navigation/native-stack'
import { NavigationContainer } from '@react-navigation/native';
import AppStack from './AppStack'

const stack= createNativeStackNavigator()
const MainAppRoutes=()=>{
    return(
        <NavigationContainer>
        <stack.Navigator screenOptions={{headerShown:false}}>
            <stack.Screen component={AppStack} name="AppStack" />
        </stack.Navigator>
      </NavigationContainer>
    )
}
export default MainAppRoutes