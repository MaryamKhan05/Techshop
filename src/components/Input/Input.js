import React from 'react'

import {View,Text,TextInput, StyleSheet} from 'react-native'
import { heightPercentageToDP as hp,widthPercentageToDP as wp } from 'react-native-responsive-screen'
import Colors from '../../config/colors/Colors'
const Input=({
    title,
    value,
    onChangeText,
    multiline,
    secureTextEntry,
    height,
    width,
    placeholder,
    borderColor,
    textColor,
    disabled
})=>{
    return(
        <View style={styles.inputContainer}>
            <Text style={[styles.title,{color:textColor?textColor:Colors.deepBlue}]}>{title}</Text>
            <TextInput
            
            editable={disabled?false:true}
            placeholder={placeholder}
            placeholderTextColor={borderColor?borderColor:Colors.deepBlue}
            style={[styles.input,{
                borderColor: borderColor?borderColor:Colors.deepBlue,
                height: height?height:hp('7%'),width: width?width:wp('90%')}]}
            multiline={secureTextEntry? false:multiline}
secureTextEntry={secureTextEntry}
            value={value}
            onChangeText={onChangeText}
            />
        </View>
    )
}

export default Input
const styles = StyleSheet.create({
    inputContainer:{
        height: hp('12%'),
        maxHeight: hp('20%'),
        paddingHorizontal:hp('2%'),
        

    },
    input:{
        borderWidth:1,
       
        borderRadius: 10,
        paddingHorizontal: hp('2%')
    },
    title:{
     
fontSize: 16,
fontWeight: 'bold',
marginHorizontal: hp('2%'),
marginVertical: hp('1%')
    }
})