import React, { useEffect,useState } from "react";
import { View, Text, Image, StyleSheet } from "react-native";
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from "react-native-responsive-screen";
import { SafeAreaView } from "react-native-safe-area-context";
import Button from "../../../components/Button/Button";
import Card from "../../../components/Card/Card";
import Colors from "../../../config/colors/Colors";
import { Spacer } from "../../../components/Spacer/Spacer";
import { collection, getDocs, query, updateDoc, where } from "firebase/firestore";
import { db } from "../../../../firebase.config";
import HorizontalList from "../../../components/HorizontalList/HorizontalList";
const Detail = ({ navigation,route }) => {
  const { reuqestCategory } = route.params;
  
  const[data,setData]=useState([])
const[loading,setLoading]=useState(false)
  useEffect(()=>{
    const fetchRequests=async()=>{
      setLoading(true)
const dbref= collection(db,'ServiceRequests')
const q= query(dbref, where('requestCategory','==',reuqestCategory),where('status','==','pending'))

const querySnapshot = await getDocs(q);
const requestsData = querySnapshot.docs.map((doc) => doc.data());


setData(requestsData)
setLoading(false)
    }
    console.log(data)
    fetchRequests()
  },[])

  const rejectUserRequest=(serviceid)=>{
    const dbRef= collection(db,'ServiceRequests')
    const q= query(dbRef,where('serviceId','==', serviceid))
    updateDoc(q,{
      status: 'cancelled'
    })
  }
  const renderItem=({item})=>{
    return(
      <View style={{paddingHorizontal:hp('2%')}}>

      <Card>

      <View style={{height: hp('20%'),width:wp('85%'),paddingHorizontal:wp('3%'),marginVertical:hp('1%'),paddingVertical:hp('2%')}}>
          <Text style={{fontSize:14 ,fontWeight:'800',textTransform:'capitalize'}}>status: {item.status}</Text>
          <Text style={{fontSize:14 ,fontWeight:'800',textTransform:'capitalize'}}>Service Name: {item.serviceName}</Text>
          <Text style={{fontSize:14 ,fontWeight:'800',textTransform:'capitalize'}}>Request Date: {item.date}</Text>
          <Text style={{fontSize:14 ,fontWeight:'800',textTransform:'capitalize'}}>Requested Time: {item.time}</Text>
          <View style={{flexDirection:'row',justifyContent:'space-evenly',marginVertical:hp('2%')}}>
            
            <Button
            title={'Approve'}
            width={wp('30%')}
            onPress={()=>{navigation.navigate('RequestApprovalScreen')}}
            />
            <Button
            title={'Reject'}
            width={wp('30%')}
            onPress={()=>{rejectUserRequest()}}
            />
          </View>
      </View>
      </Card>
      </View>
  )
  }
  return (
    <SafeAreaView
      style={{
        backgroundColor:Colors.white,
        flex: 1,
        alignItems: "center",
      }}
    >
      <Text
        style={{
          fontSize: hp("2.5"),
          fontWeight: "700",
          color: Colors.black,
          textAlign: "center",
        }}
      >
        Customer Details
      </Text>
      {/* <Image source={{uri:image}} style={{height:hp('10'), width:wp('10')}}/> */}
      <View>
       {loading && <Text>Loading...</Text>}
       {!loading && <View>
         { data &&<HorizontalList
    Data={data}
    renderItem={renderItem}
    keyExtractor={(item,index)=>{return index.toString()}}
    />}
   { !data &&<Text>No Requests Yet</Text>}
        </View>
        }
      </View>
  
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  text: {
    fontSize: hp("1.8"),
    fontWeight: "400",
    margin: hp("1"),
    color: Colors.deepBlue,
    // backgroundColor:'red',
    // width: wp("70%"),
  },
});

export default Detail;
