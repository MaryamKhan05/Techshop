import React,{useEffect, useState} from 'react'

import {View,Text,TouchableOpacity, ScrollView, StyleSheet, KeyboardAvoidingView} from 'react-native'
import Input from '../../../components/Input/Input'
import CommonStyles from '../../../config/styles/styles'
import { heightPercentageToDP as hp,widthPercentageToDP as wp } from 'react-native-responsive-screen'
import Button from '../../../components/Button/Button'
import Colors from '../../../config/colors/Colors'
import HorizontalList from '../../../components/HorizontalList/HorizontalList'

import { addDoc, collection, getDocs, query, where } from 'firebase/firestore'
import { auth, db } from '../../../../firebase.config'
import { ToastAndroid } from 'react-native'
import { ActivityIndicator } from 'react-native'
import AsyncStorage from '@react-native-async-storage/async-storage'

const RequestQuickService=({navigation,route})=>{
    const {name,charges,reuqestCategory}= route.params
  
    const[serviceName,setServiceName]=useState(name)
    const[serviceCharges,setServiceCharges]=useState(charges)
    const[customerName,setCustomerName]=useState('Hammad')
    const[customerContactNo,setCustomerContactNo]=useState('Hammad')
    const[customerAddress,setCustomerAddress]=useState('Farooq Coorperation Murree Road Shamsabad  Rawalpindi')
    const[date,setDate]=useState(new Date().toDateString())
    const[selectedIndex,setSelectedIndex]=useState('')
    const[technicianName,setTechnicianName]=useState('')
    const[technicianId,setTechnicianId]=useState('')
    const[technicianContact,setTechnicianContact]=useState('')
    const[allTechnicians,setAllTechnicians]=useState([])
    const[loading,setLoading]=useState(true)
    const[postloading,setPostLoading]=useState(true)
    useEffect(()=>{
AsyncStorage.getItem('UserName').then((val)=>{

setCustomerName(val)
}).then(()=>{
  AsyncStorage.getItem('UserPhoneNo').then((val)=>{
    setCustomerContactNo(val)

  })
})
    },[customerContactNo,customerName])
    const clearForm=()=>{
  
      setTechnicianName('')
    
      navigation.goBack()
    }
useEffect(()=>{

  const getTechnicians=async()=>{
    const dbref= collection(db,'Technicians')
    const q= query(dbref,where('city','==','rawalpindi'))
    const querySnapshot=await getDocs(q)
    const data= querySnapshot.docs.map((doc)=>doc.data())
    setAllTechnicians(data)
    setLoading(false)
  }
  getTechnicians()
},[])
    const PostRequest=async()=>{
      setPostLoading(true)
if(!technicianName){
  setPostLoading(false)
  return(alert('Technician Name Is Required For Quick Service'))}
else if(!customerAddress){
  setPostLoading(false)
  return(alert('CustomerAddress Is Required For Quick Service'))}
else{
  const dbref= collection(db,'QuickServices')
const serviceId=auth.currentUser.uid + new Date().toTimeString()+ customerName+ technicianName 
 addDoc(dbref,{
    date,
    customerId: auth.currentUser.uid,
    serviceCharges: serviceCharges.toString(),
    serviceName,
    customerAddress,
    customerName,
   customerContact: customerContactNo,
    status:'pending',
    requestedTech:technicianName,
    requestedTechId:technicianId,
    requestedTechContact: technicianContact,
    reuqestCategory:'quick service',
    serviceId
  }).then(()=>{
    setPostLoading(false)
    ToastAndroid.show('Quick Service Request Posted',ToastAndroid.SHORT)
    clearForm()
  }).catch((err)=>{
    setPostLoading(false)
    console.log(err)})
    setPostLoading(false)
}
    }
    return(
      <View style={{flex:1,justifyContent:'center'}}>

        { !loading && <View style={{flex:1,justifyContent:'space-between',backgroundColor:Colors.white,paddingBottom:hp('2%')}}>
            
        {
          postloading && <View>
          <ActivityIndicator
          color={Colors.deepBlue}
          size={'small'}
          style={{alignSelf:'center'}}
          
          />
            </View>
         }
             <View style={{height: hp('7%'),justifyContent:'center'}}>
 
             <Text style={styles.title}>Quick Service Request</Text>
             </View>
      <View >
 
      <ScrollView style={{ height: hp('75%')}} contentContainerStyle={{paddingBottom: hp('10%')}}>
       <KeyboardAvoidingView style={{flex:1}} behavior='position'>
   <View style={styles.inputView}>
     <Input value={date} title="Request Date" disabled />
   </View>
   <View style={styles.inputView}>
   <Input
       value={technicianName}
       title="Technician"
       disabled
       placeholder={'Choose A Technician'}
       onChangeText={(text) => {
         setTechnicianName(text);
       }}
     />
     <HorizontalList
     Data={allTechnicians}
     renderItem={({item,index})=>{
       return(
         <TouchableOpacity 
         onPress={()=>{
           setSelectedIndex(index)
           setTechnicianName(item.name.toString())
           setTechnicianContact(item.PhoneNo)
          setTechnicianId(item.uid)
          }}
         style={[styles.timeslotsContainer,{backgroundColor: index== selectedIndex? Colors.red:Colors.deepBlue}]}>
           <Text style={styles.timeslotsTitle}>{item.name}</Text>
           </TouchableOpacity>
       )
     }}
     keyExtractor={(item,index)=>{return index.toString()}}
     />
    
   </View>
   <View style={styles.inputView}>
     <Input value={serviceName} title="Service Name" disabled />
   </View>
   <View style={styles.inputView}>
     <Input value={serviceCharges+" PKR"} title="Service Charges" disabled />
   </View>
   <View style={styles.inputView}>
     <Input value={customerName} title="Customer Name" disabled />
   </View>
   <View style={styles.inputView}>
     <Input
       value={customerAddress}
       title="Customer Address"
       onChangeText={(text) => {
         setCustomerAddress(text);
       }}
     />
   </View>
 
       </KeyboardAvoidingView>
 </ScrollView>
      </View>
     <View style={styles.buttonView}>
     <Button
       onPress={()=>{PostRequest()}}
       title='Submit My Request'
       
       />
     </View>
         </View>}
         {
          loading && <View>
          <ActivityIndicator
          color={Colors.deepBlue}
          size={'small'}
          style={{alignSelf:'center'}}
          
          />
            </View>
         }
      </View>
    )
}

export default RequestQuickService
const styles= StyleSheet.create({
    title:{
        fontSize:26,
        color:Colors.black,
        alignSelf:'center'
    },
    inputView:{ 
        paddingVertical: hp('1%')
     },
     buttonView:{
        borderTopWidth:1,
        paddingBottom: hp('1%'),
        height: hp('10%'),
        justifyContent:'center'
     },
     timeslotsContainer:{
      backgroundColor: Colors.deepBlue,
      paddingHorizontal: wp('8%'),
      paddingVertical: hp('1%'),
      borderRadius: 50,
      marginHorizontal: wp('3%')
     },
     timeslotsTitle:{
      color: Colors.white,
      fontSize: 14,
      fontWeight:'bold'
     }
})