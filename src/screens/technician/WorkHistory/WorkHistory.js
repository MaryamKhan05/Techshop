import React from "react";

import {View,Text, StyleSheet} from 'react-native'
import TechnicianCard from "../../../components/TechnicianWorkCard/TechnicianCard";
import Colors from "../../../config/colors/Colors";
import CommonStyles from "../../../config/styles/styles";

import {widthPercentageToDP as wp,heightPercentageToDP as hp} from 'react-native-responsive-screen'
import VerticalList from "../../../components/VerticalList/VerticalList";
import { AdminServices } from "../AssignedWork/assignedDummy";

const TechnicianWorkHistory=()=>{
    return(
<View style={CommonStyles.container}>
    <View style={{flex: 0.2,backgroundColor:Colors.deepBlue,justifyContent:'space-evenly',padding:hp('2%')}}>
    <Text style={styles.title}>Hey Techie!!</Text>
    <Text style={styles.title}>We Apperciate Your Interest And Time</Text>
    <Text style={styles.title}>Here Is Your Love You Spent With Us</Text>

    </View>

    <View style={{flex:0.8}}>
        <VerticalList
        Data={AdminServices}
        numColumns={1}
        renderItem={({item})=>{
            return(
                <View style={{paddingHorizontal: hp('2%'),paddingVertical: hp('2%')}}>

                    <TechnicianCard
        
           
            customerAdress={item.customerAdress}
            customerName={item.customerName}
            time={item.time}
            requestDate={item.requestDate}
            serviceName={item.serviceName}
            customerContact={'03123456789'}
            />
                    </View>
            )
        }}
        keyExtractor={(item)=>{return item.id.toString()}}
        />
        
    </View>
</View>
    )
}

export default TechnicianWorkHistory

const styles= StyleSheet.create({
    title:{
        fontSize: 18,
        color: Colors.white
    },
    label:{
        fontSize: 16,
        fontWeight:'bold',
        color: Colors.deepBlue,
        margin: hp('1%'),
        paddingHorizontal: hp('2%') 
    }
})