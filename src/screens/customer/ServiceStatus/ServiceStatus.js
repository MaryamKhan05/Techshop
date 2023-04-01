import { collection, getDocs, query, where } from "firebase/firestore";
import React, { useEffect, useState } from "react";
 
import {View,Text, ScrollView} from 'react-native'
import { auth, db } from "../../../../firebase.config";
import { set } from "react-native-reanimated";
import VerticalList from "../../../components/VerticalList/VerticalList";
import CommonStyles from "../../../config/styles/styles";
import Card from "../../../components/Card/Card";
import { widthPercentageToDP as wp,heightPercentageToDP as hp } from "react-native-responsive-screen";
import HorizontalList from "../../../components/HorizontalList/HorizontalList";
import Colors from "../../../config/colors/Colors";

const ServiceStatus=()=>{
    const[pendingdata,setPendingData]=useState([])
    const[approveddata,setApprovedData]=useState([])
    const[cancelleddata,setCancelledData]=useState([])
    const[loading,setLoading]=useState(false)
   
    useEffect(()=>{
        const getUserRequests = async () => {
            setLoading(true)
            const dbref = collection(db, 'ServiceRequests');
            try {
                const q = query(dbref, where('customerId', '==', auth.currentUser.uid));
                const querySnapshot = await getDocs(q);
                const requestsData = querySnapshot.docs.map((doc) => doc.data());
                const pendingRequests= requestsData.filter((item)=>{return item.status=='pending'})
                const approvedRequests= requestsData.filter((item)=>{return item.status=='approved'})
                const canceledRequests= requestsData.filter((item)=>{return item.status=='cancelled'})
             
            
                setPendingData(pendingRequests);
                setApprovedData(approvedRequests)
                setCancelledData(canceledRequests)
            } catch (error) {
                console.log(error);
            }
            setLoading(false)
        };
        getUserRequests();
    }, []);
    
    const renderItemPending=({item})=>{
        return(
            <View style={{paddingHorizontal:hp('2%')}}>

            <Card>

            <View style={{height: hp('20%'),width:wp('85%'),paddingHorizontal:wp('3%'),marginVertical:hp('1%'),paddingVertical:hp('2%')}}>
                <Text style={{fontSize:14 ,fontWeight:'800',textTransform:'capitalize'}}>status: {item.status}</Text>
                <Text style={{fontSize:14 ,fontWeight:'800',textTransform:'capitalize'}}>Service Name: {item.serviceName}</Text>
                <Text style={{fontSize:14 ,fontWeight:'800',textTransform:'capitalize'}}>Request Date: {item.date}</Text>
                <Text style={{fontSize:14 ,fontWeight:'800',textTransform:'capitalize'}}>Requested Time: {item.time}</Text>
                <Text style={{fontSize:14 ,fontWeight:'800',textTransform:'capitalize',color:Colors.red}}>This Reqeust Is Pending It Will Be Updated Soon</Text>
            </View>
            </Card>
            </View>
        )
    }
    const renderItemApproved=({item})=>{
        return(
            <View style={{paddingHorizontal:hp('2%')}}>

            <Card>

            <View style={{height: hp('20%'),width:wp('85%'),paddingHorizontal:wp('3%'),marginVertical:hp('1%'),paddingVertical:hp('2%')}}>
                <Text style={{fontSize:14 ,fontWeight:'800',textTransform:'capitalize'}}>status: {item.status}</Text>
                <Text style={{fontSize:14 ,fontWeight:'800',textTransform:'capitalize'}}>Service Name: {item.serviceName}</Text>
                <Text style={{fontSize:14 ,fontWeight:'800',textTransform:'capitalize'}}>Request Date: {item.date}</Text>
                <Text style={{fontSize:14 ,fontWeight:'800',textTransform:'capitalize'}}>Requested Time: {item.time}</Text>
                <Text style={{fontSize:14 ,fontWeight:'800',textTransform:'capitalize'}}>TechShop Professional: {item.assignedTo}</Text>
                <Text style={{fontSize:14 ,fontWeight:'800',textTransform:'capitalize'}}>TechShop Professional's Contact: {item.techContact}</Text>
                <Text style={{fontSize:14 ,fontWeight:'800',textTransform:'capitalize',color:Colors.red}}>Request Approved</Text>
            </View>
            </Card>
            </View>
        )
    }
    const renderItemCancelled=({item})=>{
        return(
            <View style={{paddingHorizontal:hp('2%')}}>

            <Card>

            <View style={{paddingHorizontal:wp('3%'),height: hp('20%'),width:wp('85%'),marginVertical:hp('1%'),paddingVertical:hp('2%')}}>
                <Text style={{fontSize:14 ,fontWeight:'800',textTransform:'capitalize'}}>status: {item.status}</Text>
                <Text style={{fontSize:14 ,fontWeight:'800',textTransform:'capitalize'}}>Service Name: {item.serviceName}</Text>
                <Text style={{fontSize:14 ,fontWeight:'800',textTransform:'capitalize'}}>Request Date: {item.date}</Text>
                <Text style={{fontSize:14 ,fontWeight:'800',textTransform:'capitalize'}}>Requested Time: {item.time}</Text>
                <Text style={{fontSize:14 ,fontWeight:'800',textTransform:'capitalize',color:Colors.red,textAlign:'center'}}>This Reqeust Is Cancelled Due To Insufficient Resources TechShop Aplogizes For The Inconvienance</Text>
       
            </View>
            </Card>
            </View>
        )
    }
    return(
        <View style={CommonStyles.container}>
            <Text style={{fontSize:20,color: Colors.deepBlue,alignSelf:'center'}}>Your TechShop Requests</Text>
            
            
     { loading && <Text style={{alignSelf:'center'}}>Loading</Text> }
     
     {!loading && <ScrollView contentContainerStyle={{paddingBottom: hp('3%')}}>

<View>
<Text style={{fontSize: 16,fontWeight:'bold',color: Colors.deepBlue,marginHorizontal: hp('4%'),marginVertical:hp('1.5%')}}>Pending Requests</Text>
{pendingdata && <HorizontalList
            Data={pendingdata}
            renderItem={renderItemPending}
            keyExtractor={(item,index)=>{return index.toString()}}
            />}
            {
                !pendingdata && <Text>No Reqeusts Found</Text>
            }
</View>
<View>
<Text style={{fontSize: 16,fontWeight:'bold',color: Colors.deepBlue,marginHorizontal: hp('4%'),marginVertical:hp('1.5%')}}>Approved Requests</Text>
{approveddata.length>0 && <HorizontalList
            Data={approveddata}
            renderItem={renderItemApproved}
            keyExtractor={(item,index)=>{return index.toString()}}
            />}
            {
                approveddata.length==0 && <Text style={{alignSelf:'center'}}>No Requests Found</Text>
            }
</View>
<View>
<Text style={{fontSize: 16,fontWeight:'bold',color: Colors.deepBlue,marginHorizontal: hp('4%'),marginVertical:hp('1.5%')}}>Cancelled Requests</Text>
{cancelleddata.length >0 ? <HorizontalList
            Data={cancelleddata}
            renderItem={renderItemCancelled}
            keyExtractor={(item,index)=>{return index.toString()}}
            />
            :
<Text style={{alignSelf:'center'}}>No Reqeusts Found</Text>
            }
           
</View>
            </ScrollView>}


           
           
        </View>
    )
}

export default ServiceStatus