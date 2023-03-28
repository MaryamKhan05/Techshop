import React from "react";

import {View,Text, StyleSheet} from 'react-native'
import TechnicianCard from "../../../components/TechnicianWorkCard/TechnicianCard";
import Colors from "../../../config/colors/Colors";
import CommonStyles from "../../../config/styles/styles";
import { AdminServices } from "./assignedDummy";
import {widthPercentageToDP as wp,heightPercentageToDP as hp} from 'react-native-responsive-screen'
import VerticalList from "../../../components/VerticalList/VerticalList";


const AssignedWork=()=>{

    return(
<View style={CommonStyles.container}>
    <View style={{flex: 0.2,backgroundColor:Colors.deepBlue,justifyContent:'space-evenly',padding:hp('2%')}}>
    <Text style={styles.title}>Hey Techie!!</Text>
    <Text style={styles.title}>How Is Your Day Going!!</Text>
    <Text style={styles.title}>We Have Some New Work For You In Your Area</Text>

    </View>

    <View style={{flex:0.8}}>
        <VerticalList
        Data={AdminServices}
        numColumns={1}
        renderItem={({item})=>{
            return(
                <View style={{paddingHorizontal: hp('2%'),paddingVertical: hp('2%')}}>

                    <TechnicianCard
        
            onPress={()=>{alert('You Are Starting')}}
            showButton
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

export default AssignedWork

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