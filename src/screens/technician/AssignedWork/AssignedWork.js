import React,{useState,useEffect} from "react";

import {View,Text, StyleSheet, ActivityIndicator, ScrollView} from 'react-native'
import TechnicianCard from "../../../components/TechnicianWorkCard/TechnicianCard";
import Colors from "../../../config/colors/Colors";
import CommonStyles from "../../../config/styles/styles";
import { AdminServices } from "./assignedDummy";
import {widthPercentageToDP as wp,heightPercentageToDP as hp} from 'react-native-responsive-screen'
import VerticalList from "../../../components/VerticalList/VerticalList";
import { collection, getDocs, query, where } from "firebase/firestore";
import { auth, db } from "../../../../firebase.config";
import HorizontalList from "../../../components/HorizontalList/HorizontalList";
import Card from "../../../components/Card/Card";
import Button from "../../../components/Button/Button";


const AssignedWork=({navigation})=>{

    const [work,setWork]=useState([])
    const [quickServices,setQuickServices]=useState([])
    const [loading,setLoading]=useState(true)
    const[docIdsAssignedServices,setDocIdsAssignedServices]=useState([])
    const[docIdsQuickServices,setDocIdsQuickServices]=useState([])
    useEffect(()=>{
        const getWork=async()=>{
            
            const dbref= collection(db,'ServiceRequests')
            const q= query(dbref,where('techId','==',auth.currentUser.uid))
            const docs= await getDocs(q)
            const data= docs.docs.map((item)=>item.data())
            const ids= docs.docs.map((item)=> item.id)
            setDocIdsAssignedServices(ids)
            setWork(data)
            
            getQuickServiceRequests()
        }
        getWork()
    },[])
    const getQuickServiceRequests=async()=>{
        const dbref= collection(db,'QuickServices')
        const q= query(dbref,where('requestedTechId','==',auth.currentUser.uid))
        const docs= await getDocs(q)
        const data= docs.docs.map((item)=>item.data())
        const ids= docs.docs.map((item)=> item.id)
        setDocIdsQuickServices(ids)
        const filteredRequests=data.filter((item)=>{ return item.status == 'pending'})
     
        setQuickServices(filteredRequests)
        setLoading(false)
    }
    return(
<View style={CommonStyles.container}>
    <View style={{flex: 0.2,backgroundColor:Colors.deepBlue,justifyContent:'space-evenly',padding:hp('2%')}}>
    <Text style={styles.title}>Hey Techie!!</Text>
    <Text style={styles.title}>How Is Your Day Going!!</Text>
    <Text style={styles.title}>We Have Some New Work For You In Your Area</Text>

    </View>

 
   { !loading && <View style={{flex:0.8}}>
    <ScrollView>

        <View style={{marginVertical:hp('1%')}}>
        {
            work.length >0 &&
            <View style={{height:hp('45%')}}>
                <Text style={[styles.label,{fontSize:18,marginVertical:hp('0.5%')}]}>Assigned Work:</Text>
                <HorizontalList
               
               Data={work}
               
                renderItem={({item,index})=>{
                    const docId= docIdsAssignedServices[index]
                    return(
                        <View style={{paddingHorizontal: hp('2%'),paddingVertical: hp('2%')}}>
        
                            <TechnicianCard
                
                onPress={()=>{navigation.navigate('TechnicianMap',{
                    serviceType:'assigned',
                    item,
docId

                  })}}
                    showButton
                    customerAdress={item.customerAddress}
                    customerName={item.customerName}
                    time={item.time}
                    requestDate={item.requiredDate}
                    serviceName={item.serviceName}
                    customerContact={'03123456789'}
                    />
                            </View>
                    )
                }}
                keyExtractor={(item)=>{return item.serviceId.toString()}}
                />
                </View>
        }
        {
            work.length==0  && <Text style={{fontSize: 15,fontWeight:'bold',alignSelf:'center'}}>You Don't Have Any Assigned Work</Text>
        }

        </View>
        <View>
            {
                <View style={{height:hp('40%')}}>
                <Text style={[styles.label,{fontSize:18,marginVertical:hp('0.5%')}]}>Quick Work:</Text>
       {             quickServices.length >0 ? 
                <HorizontalList
                Data={quickServices}
               
                renderItem={({item,index})=>{
                    const docId= docIdsQuickServices[index]
                    return(
                        <View style={{paddingHorizontal: hp('2%'),paddingVertical: hp('2%')}}>
        
        <Card>
    <View style={{paddingHorizontal: wp('1%'),width:wp('85%'),paddingVertical:hp('1%'),flexDirection:'column',justifyContent:'space-between',alignItems:'center'}}>

   <View style={{justifyContent:'space-evenly',width: wp('75%')}}>
<View style={{flexDirection:'row',justifyContent:'center',paddingHorizontal: hp('0.5%')}}>
    <Text style={{color: Colors.black, fontSize: 18,alignSelf:'center',textAlign:'center',fontWeight:'bold'}}>{item.serviceName} Request From {item.customerName}</Text>
    
</View>

<View style={{flexDirection:'row',alignItems:'center',justifyContent:'center',padding: hp('1%')}}>
 
    <Text style={{color: Colors.red, fontSize: 14,fontWeight:'bold',textAlign:'center'}}>{item.customerAdress}</Text>
</View>
<View style={{flexDirection:'row',alignItems:'center',justifyContent:'space-between',width:wp('80%'),backgroundColor:'gray',borderRadius:10,padding: hp('1%')}}>
    <Text style={{color: Colors.white, fontSize: 16,fontWeight:'bold',width:wp('40%')}}>{item.customerName}'s Contact</Text>
    <Text style={{color: Colors.white, fontSize: 14,fontWeight:'bold',width:wp('40%')}}>{item.customerContact}</Text>
</View>
<View style={{flexDirection:'row',alignItems:'center',justifyContent:'space-between',width:wp('80%'),borderRadius:10,padding: hp('1%')}}>

    <Text style={{color: Colors.black, fontSize: 16,fontWeight:'bold',width:wp('40%')}}>Date</Text>
    <Text style={{color: Colors.black, fontSize: 14,fontWeight:'bold',width:wp('40%')}}>{item.date}</Text>
</View>


 <View style={{flexDirection:'row',justifyContent:'space-between'}}>

    <Button
      onPress={()=>{navigation.navigate('TechnicianMap',{
        serviceType:'quick',
        item,
        docId
      })}}
    title='Start Now'
    height={hp('5%')}
    textSize={14}
    borderRadius={10}
    width={wp('30%')} backgroundColor={Colors.deepBlue}
    />
    <Button
    onPress={()=>{alert('Press')}}
    title='Decline'
    height={hp('5%')}
    textSize={14}
    borderRadius={10}
    width={wp('30%')}
    />
 </View>

   </View>
    </View>

</Card>
                            </View>
                    )
                }}
                keyExtractor={(item)=>{return item.serviceId.toString()}}
                />
                :
                <Text style={{fontSize: 15,fontWeight:'bold',alignSelf:'center'}}>You Don't Have Any Quick Services Requests</Text>}
                </View>
            }
        </View>
    </ScrollView>
       
        
    </View>}
    {
        loading && <View style={{flex:1}}>
           <Text style={[styles.label,{alignSelf:'center'}]}>Getting Your Work.....</Text>
         <ActivityIndicator
         size={'small'}
         color={Colors.deepBlue}
         style={{alignSelf:'center'}}
         
         />
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