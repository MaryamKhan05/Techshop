import React from "react";

import {View,Text,StyleSheet, Image, TouchableOpacity} from 'react-native'
import { heightPercentageToDP as hp,widthPercentageToDP as wp} from "react-native-responsive-screen";
import Button from "../../components/Button/Button";
import Colors from "../../config/colors/Colors";
import CommonStyles from "../../config/styles/styles";
import { image } from "../customer/Services/DummyServices";


const WelcomeScreen=({navigation})=>{
    return(
        <View style={[CommonStyles.container,{justifyContent:'space-between'}]}>
            <View style={{height: hp('25%'),justifyContent:'center'}}>
                <Image
                source={{uri: image}}

                style={{height: hp('10%'),width:wp('40%'),alignSelf:'center'}}
                
                />
            </View>
            
            <View style={styles.viewConatiner}>
                <View style={styles.buttonConatiner}>

                <Button
                title={'Buy Our Services'}
                onPress={()=>{navigation.navigate('CustomerNavigations')}}
                backgroundColor={Colors.deepBlue}
                height={hp('8%')}
                width={wp('90%')}
                borderRadius={10}
                />
                </View>
                <View style={styles.buttonConatiner}>
                <Button
                title={'Join Our Professionals'}
                onPress={()=>{navigation.navigate('CustomerNavigations')}}
                backgroundColor={Colors.deepBlue}
                height={hp('8%')}
                width={wp('90%')}
                borderRadius={10}
                />
                </View>
            </View>

            <View style={{justifyContent:'center',alignItems:'center',height:hp('25%')}}>
                <TouchableOpacity>
                    <Text style={styles.adminTitle}>Admin ?</Text>
                </TouchableOpacity>
            </View>

        </View>
    )
}
export default WelcomeScreen
const styles= StyleSheet.create({
    adminTitle: {
        fontSize: 16,
        fontWeight:'bold',
        color: Colors.red
    },
    viewConatiner:{
        height: hp('50%'),
        justifyContent:'center',
      
    },
    buttonConatiner:{
        marginVertical: hp('3%')
    }
})