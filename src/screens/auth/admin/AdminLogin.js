import React, { useState } from "react";

import {View,Text, TouchableOpacity,Image, ActivityIndicator} from 'react-native'
import Button from "../../../components/Button/Button";
import Input from "../../../components/Input/Input";
import CommonStyles from "../../../config/styles/styles";

import {widthPercentageToDP as wp,heightPercentageToDP as hp} from 'react-native-responsive-screen'
import Colors from "../../../config/colors/Colors";
import { signInWithEmailAndPassword } from "firebase/auth";
import { auth, db } from "../../../../firebase.config";
import { collection, getDocs, query, where } from "firebase/firestore";
import AsyncStorage from "@react-native-async-storage/async-storage";

const LoginScreen=({navigation})=>{

    const[email,setEmail]=useState('')
    const[password,setPassword]=useState('')
    const[loading,setLoading]=useState(false)

    const handleLogin=async()=>{
      setLoading(true)
      try {
        const dbref= collection(db,"Admin")
        const q= query(dbref,where('email','==',email.toLocaleLowerCase()))
        const docs= await getDocs(q)
        const users= docs.docs.map((doc)=>{doc.data()})
        if(users.length==1){
          signInWithEmailAndPassword(auth,email,password).then(()=>{
            AsyncStorage.setItem('userType','Admin')
            
           }).catch((err)=>{
            console.log(err)
            alert('Wrong Email or Password')
           })
    
        }
        else{
          alert('This Email Is Not Registered')
        }
      } catch (error) {
        alert('Something Went Wrong Try Again!')
      }
   setLoading(false)
    }
      return(
<View style={[CommonStyles.container,{}]}>
   
<View style={{justifyContent:'center'}}>
<Image
source={require('./../../../../assets/logo.png')}
style={{height: hp('15%'),width:wp('25%'),alignSelf:'center'}}
resizeMode='contain'
/>
{
  loading && <ActivityIndicator color={Colors.deepBlue} size={'large'} style={{alignSelf:'center'}}/>
}
<View style={{paddingVertical:hp('2%')}}>

    <Input
      value={email}
      title="Email"
      onChangeText={(text) => {
        setEmail(text);
      }}
      placeholder='Enter Your Email'
    />
</View>
<View style={{paddingVertical:hp('2%')}}>

    <Input
      value={password}
      title="Password"
      onChangeText={(text) => {
        setPassword(text);
      }}
      secureTextEntry
      placeholder='Enter Password'
    />
</View>
<View style={{paddingVertical:hp('2%')}}>

    <Button
    title={'Login'}
    borderRadius={10}
    width={wp('50%')}
   onPress={()=>{handleLogin()}}
   
    />
</View>


</View>

</View>
    )
}

export default LoginScreen