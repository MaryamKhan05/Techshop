import React from 'react'

import {View,Text,TouchableOpacity, StyleSheet} from 'react-native'
import { heightPercentageToDP as hp,widthPercentageToDP as wp } from 'react-native-responsive-screen'
import Colors from '../../config/colors/Colors'

const Button=({
onPress,
title,
backgroundColor,
height,
textSize,
width,
borderRadius
})=>{
    return(
        <View>
            <TouchableOpacity
            onPress={onPress}
            style={[styles.button,{
                backgroundColor:backgroundColor?backgroundColor: Colors.deepBlue,
                height:height?height: hp('6%'),
                width:width?width: wp('80%'),
                borderRadius: borderRadius?borderRadius: 100
            }]}
            >
            <Text style={[styles.title,{fontSize: textSize?textSize: 18}]}>{title}</Text>
                </TouchableOpacity>
        </View>
    )
}

export default Button

const styles= StyleSheet.create({
    button: {

alignSelf:'center',
justifyContent:'center',
alignItems:'center',
elevation:5


    },
    title:{
        
        color: Colors.white,
        fontWeight:'bold'

    }
})