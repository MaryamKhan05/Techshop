import React from "react";

import {View,Text,StyleSheet, Image} from 'react-native'
import Colors from "../../../config/colors/Colors";
import CommonStyles from "../../../config/styles/styles";
import {widthPercentageToDP as wp,heightPercentageToDP as hp} from 'react-native-responsive-screen'
import Card from "../../../components/Card/Card";

const TechnicianWallet=()=>{
    return(
<View style={CommonStyles.container}>
    <View>

    <Text style={styles.title}>My Wallet</Text>
    <Image
source={require('./../../../../assets/logo.png')}
style={{height: hp('15%'),width:wp('25%'),alignSelf:'center'}}
resizeMode='contain'
/>
    </View>
    <View style={{flexDirection:'row',justifyContent:'space-evenly'}}>
    <Card>
        <View style={{height: hp('20%'),width:wp('30%'),justifyContent:'space-evenly'}}>
        <Text style={styles.label}>Total Orders</Text>
<Text style={styles.text}>20</Text>
        </View>
    </Card>
    <Card>
        <View style={{height: hp('20%'),width:wp('30%'),justifyContent:'space-evenly'}}>
        <Text style={styles.label}>Completed Orders</Text>
<Text style={styles.text}>18</Text>
        </View>
    </Card>

    </View>
    <View style={{flexDirection:'row',justifyContent:'space-evenly'}}>
  
    <Card>
        <View style={{height: hp('20%'),width:wp('30%'),justifyContent:'space-evenly'}}>
        <Text style={styles.label}>Pending Orders</Text>
<Text style={styles.text}>2</Text>
        </View>
    </Card>
    <Card>
        <View style={{height: hp('20%'),width:wp('30%'),justifyContent:'space-evenly'}}>
        <Text style={styles.label}>Total Cash</Text>
<Text style={[styles.text,{fontSize:20}]}>Rs 20000</Text>
        </View>
    </Card>
    </View>
</View>
    )
}

export default TechnicianWallet


const styles=StyleSheet.create({
    title :{
        fontSize: 20,
        color: Colors.deepBlue,
        alignSelf:'center'
    },
    label:{
        fontSize: 16,
        fontWeight:'bold',
        color:Colors.deepBlue,
        alignSelf:'center',
        textAlign:'center'
    },
    text:{
        fontSize: 30,
        alignSelf:'center',
        color:Colors.red

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