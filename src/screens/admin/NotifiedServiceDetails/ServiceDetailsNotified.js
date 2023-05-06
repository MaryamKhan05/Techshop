import React, { useEffect,useState } from "react";

import {View,Text,StyleSheet,Linking} from 'react-native'
import CommonStyles from "../../../config/styles/styles";
import { widthPercentageToDP as wp,heightPercentageToDP as hp } from "react-native-responsive-screen";
import Colors from "../../../config/colors/Colors";
import { collection, doc, getDocs, query, updateDoc, where } from "firebase/firestore";
import { db } from "../../../../firebase.config";
import { ActivityIndicator } from "react-native";
import Button from "../../../components/Button/Button";



const ServiceDetailsNotified=({navigation,route})=>{
    const{item}= route.params
    const[loading,setLoading]=useState(true)
  
    useEffect(()=>{
        if(item.readByAdmin==''){

            const getUpdateDoc=async()=>{
                const dbRef= collection(db,'Notifications')
                const q=query(dbRef,where('serviceId','==',item.serviceId))
                const snapshots= await getDocs(q)
                const docs= snapshots.docs.map((item)=>item.id)
                const docId=docs[0]
                const docRef= doc(db,'Notifications',docId)
                updateDoc(docRef,{
                    readByAdmin: 'read'
                }).then(()=>{
                    setLoading(false)
                }).catch(()=>{
                    setLoading(false)
                 alert('There Is Some Issue Please Try Again')
                 navigation.goBack()
                })
            }
            getUpdateDoc()
        }
        else{
            console.log('Already Opened')
            setLoading(false)
        }

    },[])
    return(
<View style={[CommonStyles.container,{justifyContent:'flex-start'}]}>
    <View style={{flex:0.2}}>

    <Text style={[styles.textStyles]}>Service Details</Text>
    </View>
   {!loading && <View style={{flex:0.8,}}>
   

   <View style={{justifyContent:'center',paddingHorizontal:hp('3%'),alignSelf:'center',width: wp('100%')}}>




<View style={{borderBottomWidth:1,margin:hp('0.5%'),flexDirection:'row',alignItems:'center',justifyContent:'space-between',width:wp('80%'),borderRadius:10,padding: hp('1%')}}>
    <Text style={{color: Colors.black, fontSize: 18,fontWeight:'bold',width:wp('40%')}}>Technician's Contact</Text>
    <Text style={{color: Colors.black, fontSize: 16,fontWeight:'bold',width:wp('40%')}}>{item.techContact}</Text>
</View>
<View style={{borderBottomWidth:1,margin:hp('0.5%'),flexDirection:'row',alignItems:'center',justifyContent:'space-between',width:wp('80%'),borderRadius:10,padding: hp('1%')}}>
    <Text style={{color: Colors.black, fontSize: 18,fontWeight:'bold',width:wp('40%')}}>Service Name</Text>
    <Text style={{color: Colors.black, fontSize: 16,fontWeight:'bold',width:wp('40%')}}>{item.serviceName}</Text>
</View>
<View style={{borderBottomWidth:1,margin:hp('0.5%'),flexDirection:'row',alignItems:'center',justifyContent:'space-between',width:wp('80%'),borderRadius:10,padding: hp('1%')}}>
    <Text style={{color: Colors.black, fontSize: 18,fontWeight:'bold',width:wp('40%')}}>Service Request Date</Text>
    <Text style={{color: Colors.black, fontSize: 16,fontWeight:'bold',width:wp('40%')}}>{item.date}</Text>
</View>
{item.requiredDate && <View style={{borderBottomWidth:1,margin:hp('0.5%'),flexDirection:'row',alignItems:'center',justifyContent:'space-between',width:wp('80%'),borderRadius:10,padding: hp('1%')}}>
    <Text style={{color: Colors.black, fontSize: 18,fontWeight:'bold',width:wp('40%')}}>Service Required Date</Text>
    <Text style={{color: Colors.black, fontSize: 16,fontWeight:'bold',width:wp('40%')}}>{item.requiredDate}</Text>
</View>}
<View style={{borderBottomWidth:1,margin:hp('0.5%'),flexDirection:'row',alignItems:'center',justifyContent:'space-between',width:wp('80%'),borderRadius:10,padding: hp('1%')}}>
    <Text style={{color: Colors.black, fontSize: 18,fontWeight:'bold'}}>Read By Technician : { item.readByTechnician?'Has Read The Schedule Alert':'Not Yet Read'}</Text>

</View>
<View style={{borderBottomWidth:1,margin:hp('0.5%'),flexDirection:'row',alignItems:'center',justifyContent:'space-between',width:wp('80%'),borderRadius:10,padding: hp('1%')}}>
    <Text style={{color: Colors.black, fontSize: 18,fontWeight:'bold'}}>Read By Customer : { item.readByCustomer?'Has Read The Schedule Alert':'Not Yet Read'}</Text>

</View>
<View style={{flexDirection:'row',marginVertical:hp('1.5%'),width:wp('90%'),justifyContent:'space-between'}}>
    <Button
    width={wp('35%')}
    onPress={()=>{Linking.openURL(`tel:${item.customerContact}`);}}
    title={`Call ${item.customerName.split(' ')[0]}`}
    />
    <Button
    width={wp('35%')}
    onPress={()=>{Linking.openURL(`tel:${item.techContact}`);}}
    title={`Call ${item.techName}`}
    />
    </View>



   </View>
   

</View>}
{
    loading && 
    <View>
    <Text style={[styles.textStyles]}>Getting Details</Text>
    <ActivityIndicator
    size={'small'}
    style={{alignSelf:'center'}}
    color={Colors.deepBlue}
    
    />
    </View>
}

    
</View>
    )
}

const styles= StyleSheet.create({
   
    textStyles:{
        fontSize: 18,
        
        fontSize:22,alignSelf:'center',margin:hp('2%'),}
   


})

export default ServiceDetailsNotified