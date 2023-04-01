import React,{useState} from 'react'

import {View,Text,TouchableOpacity, ScrollView, StyleSheet, KeyboardAvoidingView} from 'react-native'
import Input from '../../../components/Input/Input'
import CommonStyles from '../../../config/styles/styles'
import { heightPercentageToDP as hp,widthPercentageToDP as wp } from 'react-native-responsive-screen'
import Button from '../../../components/Button/Button'
import Colors from '../../../config/colors/Colors'
import HorizontalList from '../../../components/HorizontalList/HorizontalList'
import timeslots from './TimeSlots'
import { addDoc, collection } from 'firebase/firestore'
import { auth, db } from '../../../../firebase.config'
import { ToastAndroid } from 'react-native'

const RequestService=({navigation,route})=>{
    const {name,charges,reuqestCategory}= route.params
   
    const[serviceName,setServiceName]=useState(name)
    const[serviceCharges,setServiceCharges]=useState(charges)
    const[customerName,setCustomerName]=useState('Hammad')
    const[customerAddress,setCustomerAddress]=useState('Farooq Coorperation Murree Road Shamsabad  Rawalpindi')
    const[date,setDate]=useState(new Date().toDateString())
    const[time,setTime]=useState('')
    const[desc,setDesc]=useState('')
    const[selectedIndex,setSelectedIndex]=useState('')
    const clearForm=()=>{
  
      setTime('')
      setDesc('')
      navigation.goBack()
    }

    const PostRequest=async()=>{
if(!time){return(alert('Service Time Is Required '))}
else{
  const dbref= collection(db,'ServiceRequests')
const serviceId=auth.currentUser.uid + new Date().toTimeString()+ customerName+ time 
 addDoc(dbref,{
    date,
    customerId: auth.currentUser.uid,
    serviceCharges: serviceCharges.toString(),
    serviceName,
    customerAddress,
    customerName,
    desc: desc?desc:'',
    status:'pending',
    assignedTo: '',
    time,
    reuqestCategory,
    serviceId
  }).then(()=>{
    ToastAndroid.show('Service Request Posted',ToastAndroid.SHORT)
    clearForm()
  }).catch((err)=>{
    console.log(err)})
  
}
    }
    return(
        <View style={{flex:1,justifyContent:'space-between',backgroundColor:Colors.white,paddingBottom:hp('2%')}}>
            <View style={{height: hp('7%'),justifyContent:'center'}}>

            <Text style={styles.title}>Service Request</Text>
            </View>
     <View >

     <ScrollView style={{ height: hp('75%')}} contentContainerStyle={{paddingBottom: hp('10%')}}>
      <KeyboardAvoidingView style={{flex:1}} behavior='position'>
  <View style={styles.inputView}>
    <Input value={date} title="Request Date" disabled />
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
  <View style={styles.inputView}>
  <Input
      value={time}
      title="Time"
      disabled
      placeholder={'Choose A suitable time'}
      onChangeText={(text) => {
        setTime(text);
      }}
    />
    <HorizontalList
    Data={timeslots}
    renderItem={({item,index})=>{
      return(
        <TouchableOpacity 
        onPress={()=>{
          setSelectedIndex(index)
          setTime(item.time.toString())}}
        style={[styles.timeslotsContainer,{backgroundColor: index== selectedIndex? Colors.red:Colors.deepBlue}]}>
          <Text style={styles.timeslotsTitle}>{item.time}</Text>
          </TouchableOpacity>
      )
    }}
    keyExtractor={(item)=>{return item.id.toString()}}
    />
   
  </View>
  <View style={styles.inputView}>
    <Input
      value={desc}
      title="Description (Optional)"
      placeholder={
        'Add A Description So We Can Know What You Really Require'
      }
      height={hp('15%')}
      onChangeText={(text) => {
        setDesc(text);
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
        </View>
    )
}

export default RequestService
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
      paddingHorizontal: wp('3%'),
      paddingVertical: hp('1%'),
      borderRadius: 50,
      marginHorizontal: wp('1%')
     },
     timeslotsTitle:{
      color: Colors.white,
      fontSize: 14,
      fontWeight:'bold'
     }
})