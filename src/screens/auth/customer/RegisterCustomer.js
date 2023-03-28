import React, { useState } from "react";

import {View,Text, TouchableOpacity,Image} from 'react-native'
import Button from "../../../components/Button/Button";
import Input from "../../../components/Input/Input";
import CommonStyles from "../../../config/styles/styles";

import {widthPercentageToDP as wp,heightPercentageToDP as hp} from 'react-native-responsive-screen'
import Colors from "../../../config/colors/Colors";
const RegisterScreen=({navigation})=>{

    const[email,setEmail]=useState('')
    const[password,setPassword]=useState('')
    const[name,setName]=useState('')
    
    const[PhoneNo,setPhoneNo]=useState('')
    return(
<View style={[CommonStyles.container,{}]}>
   
<View style={{justifyContent:'center'}}>
<Image
source={require('./../../../../assets/logo.png')}
style={{height: hp('15%'),width:wp('25%'),alignSelf:'center'}}
resizeMode='contain'
/>
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
   onPress={()=>{navigation.navigate('CustomerDrawer')}}
   
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
</View>

</View>
    )
}

export default RegisterScreen