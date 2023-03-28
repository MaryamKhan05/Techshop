import React,{useState} from 'react'

import {View,Text,TouchableOpacity, ScrollView, StyleSheet} from 'react-native'
import Input from '../../../components/Input/Input'
import CommonStyles from '../../../config/styles/styles'
import { heightPercentageToDP as hp,widthPercentageToDP as wp } from 'react-native-responsive-screen'
import Button from '../../../components/Button/Button'
import Colors from '../../../config/colors/Colors'

const RequestService=({navigation,route})=>{
    const {name}= route.params
   
    const[serviceName,setServiceName]=useState(name)
    const[customerName,setCustomerName]=useState('Hammad')
    const[customerAddress,setCustomerAddress]=useState('Farooq Coorperation Murree Road Shamsabad  Rawalpindi')
    const[date,setDate]=useState(new Date().toDateString())
    const[time,setTime]=useState('')
    const[desc,setDesc]=useState('')
    return(
        <View style={{flex:1,justifyContent:'space-between',paddingBottom:hp('2%')}}>
            <View style={{height: hp('7%'),justifyContent:'center'}}>

            <Text style={styles.title}>Service Request</Text>
            </View>
     <View >
     <ScrollView style={{ height: hp('75%')}} contentContainerStyle={{paddingBottom: hp('10%')}}>
  <View style={styles.inputView}>
    <Input value={date} title="Request Date" disabled />
  </View>
  <View style={styles.inputView}>
    <Input value={serviceName} title="Service Name" disabled />
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
      placeholder={'Enter A Suitable Time You Want Service'}
      onChangeText={(text) => {
        setTime(text);
      }}
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
</ScrollView>
     </View>
    <View style={styles.buttonView}>
    <Button
      onPress={()=>{alert('Pressed')}}
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
     }
})