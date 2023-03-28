import React, { useState } from "react";

import {View,Text, TouchableOpacity,Image} from 'react-native'
import Button from "../../../components/Button/Button";
import Input from "../../../components/Input/Input";
import CommonStyles from "../../../config/styles/styles";

import {widthPercentageToDP as wp,heightPercentageToDP as hp} from 'react-native-responsive-screen'
import Colors from "../../../config/colors/Colors";
const LoginScreen=({navigation})=>{

    const[email,setEmail]=useState('')
    const[password,setPassword]=useState('')
    return(
<View style={[CommonStyles.container,{}]}>
   
<View style={{justifyContent:'center'}}>
<Image
source={require('./../../../../assets/logo.png')}
style={{height: hp('15%'),width:wp('25%'),alignSelf:'center'}}
resizeMode='contain'
/>
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
   onPress={()=>{navigation.navigate('AssignedWork')}}
   
    />
</View>


    <View style={{flexDirection:'row',alignSelf:'center'}}>
        <Text style={{fontSize:12}}>Not Yet Registered?</Text>
        <TouchableOpacity 
       onPress={()=>{navigation.navigate('RegisterScreen')}}
        style={{marginLeft: hp('0.3%')}}>
        <Text style={{fontSize:12,fontWeight:'bold',color:Colors.red}}>Resgister Now</Text>

        </TouchableOpacity>

    </View>
</View>

</View>
    )
}

export default LoginScreen