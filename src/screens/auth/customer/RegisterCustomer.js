import React, { useState } from "react";

import {View,Text, TouchableOpacity,Image, ScrollView, KeyboardAvoidingView} from 'react-native'
import Button from "../../../components/Button/Button";
import Input from "../../../components/Input/Input";
import CommonStyles from "../../../config/styles/styles";

import {widthPercentageToDP as wp,heightPercentageToDP as hp} from 'react-native-responsive-screen'
import Colors from "../../../config/colors/Colors";
import { auth, db } from "../../../../firebase.config";
import { createUserWithEmailAndPassword } from "firebase/auth";
import { doc, setDoc } from "firebase/firestore";
import AsyncStorage from "@react-native-async-storage/async-storage";


const RegisterScreen=({navigation})=>{

    const[email,setEmail]=useState('')
    const[password,setPassword]=useState('')
    const[name,setName]=useState('')
    
    const[PhoneNo,setPhoneNo]=useState('')
    const isValidEmail=(email)=>{
      const pattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      const test = pattern.test(email);
      return test
    }
  
    const RegisterCustomer=()=>{
      const validEmail= isValidEmail(email)
      if(email===''){return alert('Email Is Required')}
      if(name===''){return alert('Name Is Required')}
      if(PhoneNo===''){return alert('Contact No Is Required')}
      if(password===''){return alert('Password Is Required')}
      if(!validEmail){return alert('Provide a Valid Email')}
      else{
        createUserWithEmailAndPassword(auth, email, password)
        .then(async(userCredential)=>{
          const uid= userCredential.user.uid
          await AsyncStorage.setItem('UserType', 'Customer')
          await setDoc(doc(db, "Customers", uid),{
            uid,
            name,
            email:email.toLocaleLowerCase(),
            PhoneNo,
            type: 'Customer'
          })
         
        }).catch((err)=>{
          console.log(err)
          alert('Something Went Wrong')
        })
      }
    }
  




    
    return(
<View style={[CommonStyles.container,{}]}>
   

  <View  style={{flex:0.25,justifyContent:'flex-end',}}>

<Image
source={require('./../../../../assets/logo.png')}
style={{height: hp('15%'),width:wp('25%'),alignSelf:'center'}}
resizeMode='contain'
/>
  </View>
  <View style={{justifyContent:'center',flex:0.75}}>
<KeyboardAvoidingView behavior="padding">

<ScrollView >

<View style={{paddingVertical:hp('1%')}}>

    <Input
      value={name}
      title="Name"
      onChangeText={(text) => {
        setName(text);
      }}
      placeholder='Enter Your Name'
    />
</View>
<View style={{paddingVertical:hp('1%')}}>

    <Input
      value={email}
      title="Email"
      onChangeText={(text) => {
        setEmail(text);
      }}
      placeholder='Enter Your Email'
    />
</View>
<View style={{paddingVertical:hp('1%')}}>

    <Input
      value={PhoneNo}
      title="Contact No"
      onChangeText={(text) => {
        setPhoneNo(text);
      }}
      placeholder='Enter Your Phone No'
    />
</View>

<View style={{paddingVertical:hp('1%')}}>

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
<View style={{paddingVertical:hp('1%')}}>

    <Button
    title={'Register'}
    borderRadius={10}
    width={wp('50%')}
   onPress={()=>{RegisterCustomer()}}
   
    />
</View>


    <View style={{flexDirection:'row',alignSelf:'center'}}>
        <Text style={{fontSize:12}}>Already Registered?</Text>
        <TouchableOpacity 
       onPress={()=>{navigation.goBack()}}
        style={{marginLeft: hp('0.3%')}}>
        <Text style={{fontSize:12,fontWeight:'bold',color:Colors.red}}>Login</Text>

        </TouchableOpacity>

    </View>
</ScrollView>
</KeyboardAvoidingView>

  </View>


</View>
    )
}

export default RegisterScreen