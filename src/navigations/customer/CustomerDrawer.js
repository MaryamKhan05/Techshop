import React,{useState} from 'react'
import { createDrawerNavigator } from '@react-navigation/drawer'

import {View,Text,TouchableOpacity,Image} from 'react-native'

import ViewServices from '../../screens/customer/ViewServices'
import Colors from '../../config/colors/Colors'
import { DrawerContentScrollView,DrawerItem ,DrawerItemList} from '@react-navigation/drawer';
import { DrawerActions, useNavigation } from "@react-navigation/native";

import Home from '../../screens/customer/Home/Home'
import Services from '../../screens/customer/Services/Services'
import SpareParts from '../../screens/customer/SpareParts/SpareParts'
import Vechiles from '../../screens/customer/Vechiles/Vechiles'
import SellVechileForm from '../../screens/customer/SellVechile/SellVechileForm'
import { heightPercentageToDP as hp,widthPercentageToDP as wp } from 'react-native-responsive-screen'
import { image } from '../../screens/customer/Services/DummyServices'
import ServiceStatus from '../../screens/customer/ServiceStatus/ServiceStatus'
import SparePartStatus from '../../screens/customer/SparePartStatus/SparePartsStatus'
import VechileAdStatus from '../../screens/customer/VechileStatus/VechileAdStatus'
import { auth } from '../../../firebase.config'
import { signOut } from 'firebase/auth'
import { ColorSpace } from 'react-native-reanimated'

import { widthPercentageToDP } from 'react-native-responsive-screen'
import { AntDesign, MaterialIcons,Ionicons,Entypo,MaterialCommunityIcons } from '@expo/vector-icons';
const drawer =createDrawerNavigator()
const CustomerDrawer=()=>{
    const navigation= useNavigation();
    function CustomDrawerContent(props){
      const color= Colors.deepBlue;
      const size=30;
      const[itemColor,setItemColor]=useState(false)
      return(
        <View style={{flex: 1,justifyContent:'center',top: hp('2%')}}>
          <Image
          source={{uri:image}}
          style={{height: hp('10%'),top:hp('3%'),width:wp('50%'),alignSelf:'center'}}
          
          />
               <DrawerContentScrollView {...props}>
      <DrawerItemList {...props} />
                <TouchableOpacity
                style={{ backgroundColor: itemColor?Colors.deepBlue:'white',flexDirection:'row',justifyContent:'space-between',marginVertical:hp('0.5%'),paddingHorizontal:wp('5%'),paddingVertical:hp('1%')}}
                onPress={()=>{
                  
                  setItemColor(true)
                  signOut(auth).then(()=>{console.log('Logged out')}).catch((err)=>{console.log(err)})}}
                >
                  <AntDesign name="logout" size={24} color={Colors.deepBlue}/>
                  <Text style={{color: itemColor?Colors.white:Colors.deepBlue,fontWeight:'bold',flex:0.85,alignSelf:'flex-start'}}>Log Out</Text>
                </TouchableOpacity>
      {/* <DrawerItem
        label="Settings"
        onPress={() => navigation.navigate('Settings')}
      /> */}
    </DrawerContentScrollView>

        <View>
          <Text style={{textAlign: 'center'}}>App Version 2.8</Text>
          </View>
          </View>
      )
  }
    return(
  
      <drawer.Navigator 

      drawerContent={CustomDrawerContent} 
      screenOptions={{headerShown: true,drawerStyle:{width:300},
      headerRight: () => (
        [
<View style={{flexDirection:'row',width:widthPercentageToDP('25%'),justifyContent:'space-evenly'}}>

          <TouchableOpacity
          onPress={()=>{navigation.navigate('CustomerNotifications')}}
          >
  <Entypo name="bell" size={35} color={Colors.deepBlue} />
              
          </TouchableOpacity>
       
</View>
          
        ]
       
        ),
        headerTintColor: Colors.deepBlue,
        // headerStyle:{backgroundColor:Colors.white}
        
    }}
      
      >
         <drawer.Screen component={Home} name='Home' options={{drawerLabel:'Home',drawerActiveBackgroundColor:Colors.deepBlue,drawerActiveTintColor:Colors.white,
         drawerInactiveTintColor:Colors.deepBlue,
         drawerIcon: ({ focused, size }) => (
        
          <AntDesign name="home" size={24} color={focused?Colors.white: Colors.deepBlue}/>
            
          
        ),
        
        }}/>
         <drawer.Screen component={Services} name='Services' options={{drawerLabel:'Services',drawerActiveBackgroundColor:Colors.deepBlue,drawerActiveTintColor:Colors.white, drawerInactiveTintColor:Colors.deepBlue,
       drawerIcon: ({ focused, size }) => (
        
        <AntDesign name="heart" size={24} color={focused?Colors.white: Colors.deepBlue}/>
          
        
      ),
        }}/>
         <drawer.Screen component={SpareParts} name='SpareParts' options={{drawerLabel:'SpareParts',drawerActiveBackgroundColor:Colors.deepBlue,drawerActiveTintColor:Colors.white, drawerInactiveTintColor:Colors.deepBlue,
        drawerIcon: ({ focused, size }) => (
        
          <MaterialCommunityIcons name="car-battery" size={24} color={focused?Colors.white: Colors.deepBlue}/>
            
          
        ),
        }}/>
         <drawer.Screen component={Vechiles} name='Vechiles' options={{drawerLabel:'Vechiles',drawerActiveBackgroundColor:Colors.deepBlue,drawerActiveTintColor:Colors.white, drawerInactiveTintColor:Colors.deepBlue,
          drawerIcon: ({ focused, size }) => (
        
            <AntDesign name="car" size={24} color={focused?Colors.white: Colors.deepBlue}/>
              
            
          ),
        }}/>
         <drawer.Screen component={SellVechileForm} name='SellVechileForm' options={{drawerLabel:'Sell Vechile',drawerActiveBackgroundColor:Colors.deepBlue,drawerActiveTintColor:Colors.white, drawerInactiveTintColor:Colors.deepBlue,
         drawerIcon: ({ focused, size }) => (
        
          <Ionicons name="cash" size={24} color={focused?Colors.white: Colors.deepBlue}/>
            
          
        ),
        
        
        }}/>
         <drawer.Screen component={ServiceStatus} name='ServiceStatus' options={{drawerLabel:'Service Request Status',drawerActiveBackgroundColor:Colors.deepBlue,drawerActiveTintColor:Colors.white, drawerInactiveTintColor:Colors.deepBlue,
        
        drawerIcon: ({ focused, size }) => (
        
          <MaterialCommunityIcons name="calendar-heart" size={24} color={focused?Colors.white: Colors.deepBlue}/>
            
          
        ),
      
        }}/>
         <drawer.Screen component={SparePartStatus} name='SparePartStatus' options={{drawerLabel:'Spare Part Request Status',drawerActiveBackgroundColor:Colors.deepBlue,drawerActiveTintColor:Colors.white, drawerInactiveTintColor:Colors.deepBlue,
          drawerIcon: ({ focused, size }) => (
        
            <MaterialIcons
            name="category"size={24} color={focused?Colors.white: Colors.deepBlue}/>
              
            
          ),
        }}/>
         <drawer.Screen component={VechileAdStatus} name='VechileAdStatus' options={{drawerLabel:'Vechile Ad Status',drawerActiveBackgroundColor:Colors.deepBlue,drawerActiveTintColor:Colors.white, drawerInactiveTintColor:Colors.deepBlue,
         drawerIcon: ({ focused, size }) => (
        
          <MaterialIcons name="local-car-wash" size={24} color={focused?Colors.white: Colors.deepBlue}/>
            
          
        ),
        }}/>
        
      </drawer.Navigator>
    )
  }


export default CustomerDrawer



// {/* <DrawerContentScrollView {...props}>
  
// <Image style={{height:100,width:100,resizeMode:'contain',borderRadius:30,alignSelf:'center'}} source={{uri: 'https://seeklogo.com/images/A/arid-agriculture-university-rawalpindi-logo-6A71D404ED-seeklogo.com.png'}}/>
// <View  style={{flex: 1,alignContent:'space-between'}}>
// <DrawerItem
//   labelStyle={{color:Colors.black}}
//  label="Home"
//   onPress={()=>{navigation.navigate('Home')}}
//   />
// <DrawerItem
//   labelStyle={{color:Colors.black}}
//  label="Services"
//   onPress={()=>{navigation.navigate('Services')}}
//   />
// <DrawerItem
//   labelStyle={{color:Colors.black}}
//  label="Spare Parts"
//   onPress={()=>{navigation.navigate('SpareParts')}}
//   />
// <DrawerItem
//   labelStyle={{color:Colors.black}}
//  label="Vechiles"
//   onPress={()=>{navigation.navigate('Vechiles')}}
//   />
// {/* <DrawerItem
// activeBackgroundColor={Colors.deepBlue}
// activeTintColor={Colors.red}
// icon={()=>(<MaterialCommunityIcons name="home"size={24} color={Colors.white} />)}
//   labelStyle={{color:Colors.black}}
//  label="Sell My Vechile"
//   onPress={()=>{navigation.navigate('SellVechileForm')}}
//   /> */}
// {/* <DrawerItem

// label="View Recieved Requests"
// icon={()=>(<MaterialCommunityIcons name="account-plus"size={size}color={color} />)}
// onPress={()=>{navigation.navigate('RecievedRequests')}}
// /> */}

// </View>
// </DrawerContentScrollView> */}