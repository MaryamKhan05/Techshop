import React, { useEffect,useState } from "react";

import {View,Text,StyleSheet, TouchableOpacity, ActivityIndicator} from 'react-native'
import CommonStyles from "../../../config/styles/styles";
import { collection, getDocs, query, where } from "firebase/firestore";
import { auth, db } from "../../../../firebase.config";
import VerticalList from "../../../components/VerticalList/VerticalList";
import Card from "../../../components/Card/Card";
import { widthPercentageToDP as wp,heightPercentageToDP as hp } from "react-native-responsive-screen";
import Colors from "../../../config/colors/Colors";



const TechNotifications=({navigation})=>{
    const[notifications,setNotifications]=useState([])
    const[loading,setLoading]=useState(true)
    const[readNotiIndex,setReadNotiIndex]=useState(null)
 
    
    useEffect(()=>{
        const getUpdates=async()=>{
            const dbRef= collection(db,'Notifications')
            
            const q=query(dbRef,where('requestedTechId','==',auth.currentUser.uid))
            const querySnapshot= await getDocs(q)
            const data= querySnapshot.docs.map((item)=>item.data())
            const filteredData= data.filter((item)=> {return item.status != 'completed'} )
           
          
            setNotifications(filteredData)
            setLoading(false)
          
        }
        getUpdates()
    },[])
    return(
        <View style={[CommonStyles.container,{justifyContent:'flex-start'}]}>
<Text style={[styles.notiText,{fontSize:22,alignSelf:'center',margin:hp('2%')}]}>My Schedule Alerts</Text>
{loading ?
<ActivityIndicator
size={'small'}
color={Colors.deepBlue}
style={{alignSelf:'center'}}

/>:

<VerticalList
Data={notifications}
numColumns={1}
renderItem={({item,index})=>{
    return(
     
            <TouchableOpacity
            onPress={()=>{
                setReadNotiIndex(index)
                navigation.navigate('ServiceDetails',{
                    item
                })
            }}
            style={[styles.card,{backgroundColor: item.readByTechnician == 'read'?Colors.white:index==readNotiIndex?Colors.white:Colors.deepBlue}]}>
            
                <Text style={[styles.notiText,{color: item.readByTechnician == 'read'?Colors.black:index==readNotiIndex?Colors.black:Colors.white}]}>{item.customerName} is waiting for you for a {item.serviceName} Service</Text>
                <Text style={[styles.date,{color: item.readByTechnician == 'read'?Colors.black:index==readNotiIndex?Colors.black:Colors.white}]}>{item.date} {item?.time}</Text>
            </TouchableOpacity>
      
    )
}}
keyExtractor={(item,index)=>{return index.toString()}}

/>}
        </View>
    )
}

const styles= StyleSheet.create({
    card: {
      width:wp('100%'),
      alignSelf:'center',
        paddingHorizontal:hp('2%'),
        height: hp('8%'),
        marginBottom:hp('1%'),
        elevation:5
    
    },
    notiText:{
        fontSize: 16,
        
    },
    date:{
        fontSize:10,
        alignSelf:'flex-end'
    
    }


})
export default TechNotifications