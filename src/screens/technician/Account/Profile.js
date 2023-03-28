import React from "react";

import {View,Text, StyleSheet, Image, TouchableOpacity} from 'react-native'
import Colors from "../../../config/colors/Colors";
import CommonStyles from "../../../config/styles/styles";

import {widthPercentageToDP as wp,heightPercentageToDP as hp} from 'react-native-responsive-screen'
const TechnicianProfile=({navigation})=>{
    return(
<View style={[CommonStyles.container,{justifyContent:'space-between'}]}>
    <View>
<Image
source={require('./../../../../assets/logo.png')}
style={{height: hp('15%'),width:wp('25%'),alignSelf:'center'}}
resizeMode='contain'
/>
    </View>
<View style={{padding: hp('2%')}}>

    <View style={styles.rowHolder}>
        <Text style={styles.label}>Name</Text>
        <Text style={styles.text}>Ali</Text>
    </View>
    <View style={styles.rowHolder}>
        <Text style={styles.label}>Email</Text>
        <Text style={styles.text}>Ali123@gmail.com</Text>
    </View>
    <View style={styles.rowHolder}>
        <Text style={styles.label}>Contact No</Text>
        <Text style={styles.text}>03123456789</Text>
    </View>
    <View style={styles.rowHolder}>
        <Text style={styles.label}>Location</Text>
        <Text style={styles.text}>Shamsabad RawalPindi</Text>
    </View>
    <View style={styles.rowHolder}>
    <Text style={styles.label}>Member Since</Text>
        <Text style={styles.text}>20-03-2023</Text>
    </View>
    <View style={styles.rowHolder}>
    <Text style={styles.label}>Completed Orders</Text>
        <Text style={styles.text}>30</Text>
    </View>
    <TouchableOpacity
    style={[styles.rowHolder,{justifyContent:'center'}]}
    >
        <Text style={[styles.label,{alignSelf:'center'}]}>My Wallet</Text>
    </TouchableOpacity>
    <TouchableOpacity
    onPress={()=>{navigation.navigate('TechnicianWorkHistory')}}
      style={[styles.rowHolder,{justifyContent:'center'}]}
    >
         <Text style={[styles.label,{alignSelf:'center'}]}>My Work History</Text>
    </TouchableOpacity>
    <TouchableOpacity
      style={[styles.rowHolder,{justifyContent:'center'}]}
    >
         <Text style={[styles.label,{alignSelf:'center'}]}>Log Out</Text>
    </TouchableOpacity>

</View>


</View>
    )
}

export default TechnicianProfile

const styles=StyleSheet.create({
    title :{
        fontSize: 20,
        color: Colors.deepBlue,
        alignSelf:'center'
    },
    label:{
        fontSize: 16,
        fontWeight:'bold',
        color:Colors.white
    },
    text:{
        fontSize: 18,
        alignSelf:'center',
        color:Colors.white

    },
    rowHolder:{
        flexDirection:'row',
        backgroundColor:Colors.deepBlue,
        elevation:5,
         padding:hp('2%') ,
          justifyContent:'space-between',
          marginVertical: hp('0.5%'),
          alignItems:'center'}
})