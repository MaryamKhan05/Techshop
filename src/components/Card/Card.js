import React from 'react'

import {View,Text,TouchableOpacity, StyleSheet} from 'react-native'
import { widthPercentageToDP as wp,heightPercentageToDP as hp } from 'react-native-responsive-screen'
import Colors from '../../config/colors/Colors'

const Card=({children})=>{
    return(
        <View style={styles.card}>
           {children}
        </View>
    )
}

export default Card

const styles=StyleSheet.create({
    card:{
        elevation: 10,
        backgroundColor:'white',
        shadowColor: Colors.deepBlue,
        alignSelf:'center',
        paddingHorizontal: wp('2%'),
        paddingVertical: hp('2%'),
        borderRadius:20,
        
    }
})