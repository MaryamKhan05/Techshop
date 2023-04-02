import React,{useState,useEffect} from "react";

import {View,Text, StyleSheet} from 'react-native'
import TechnicianCard from "../../../components/TechnicianWorkCard/TechnicianCard";
import Colors from "../../../config/colors/Colors";
import CommonStyles from "../../../config/styles/styles";
import { AdminServices } from "./assignedDummy";
import {widthPercentageToDP as wp,heightPercentageToDP as hp} from 'react-native-responsive-screen'
import VerticalList from "../../../components/VerticalList/VerticalList";
import { collection, getDocs, query, where } from "firebase/firestore";
import { auth, db } from "../../../../firebase.config";


const AssignedWork=()=>{

    const [work,setWork]=useState([])
    const [loading,setLoading]=useState(false)
    useEffect(()=>{
        const getWork=async()=>{
            setLoading(true)
            const dbref= collection(db,'ServiceRequests')
            const q= query(dbref,where('techId','==',auth.currentUser.uid))
            const docs= await getDocs(q)
            const data= docs.docs.map((item)=>item.data())
            setWork(data)
            setLoading(false)
        }
        getWork()
    },[])
    return(
<View style={CommonStyles.container}>
    <View style={{flex: 0.2,backgroundColor:Colors.deepBlue,justifyContent:'space-evenly',padding:hp('2%')}}>
    <Text style={styles.title}>Hey Techie!!</Text>
    <Text style={styles.title}>How Is Your Day Going!!</Text>
    <Text style={styles.title}>We Have Some New Work For You In Your Area</Text>

    </View>
{
  loading ? <Text style={{fontSize:18,alignSelf:'center'}}>Getting Work ....</Text>  
  :
     <View style={{flex:0.8}}>
        {
            work &&
            <VerticalList
            Data={work}
            numColumns={1}
            renderItem={({item})=>{
                return(
                    <View style={{paddingHorizontal: hp('2%'),paddingVertical: hp('2%')}}>
    
                        <TechnicianCard
            
                onPress={()=>{alert('You Are Starting')}}
                showButton
                customerAdress={item.customerAddress}
                customerName={item.customerName}
                time={item.time}
                requestDate={item.date}
                serviceName={item.serviceName}
                customerContact={'03123456789'}
                />
                        </View>
                )
            }}
            keyExtractor={(item)=>{return item.serviceId.toString()}}
            />
        }
        {
            !work && <Text style={{fontSize: 15,fontWeight:'bold',alignSelf:'center'}}>You Don't Have Any Assigned Work</Text>
        }
       
        
    </View>
}
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