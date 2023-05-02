import { collection, getDocs, query, where } from "firebase/firestore";
import React, { useEffect,useState } from "react";
 
import {View,Text,ScrollView} from 'react-native'
import { auth, db } from "../../../../firebase.config";
import CommonStyles from "../../../config/styles/styles";
import HorizontalList from "../../../components/HorizontalList/HorizontalList";
import { heightPercentageToDP as hp,widthPercentageToDP as wp} from "react-native-responsive-screen";
import Colors from "../../../config/colors/Colors";
import Card from "../../../components/Card/Card";

const VechileAdStatus=()=>{
    const[approvedAds,setApprovedAds]=useState([])
    const[pendingAds,setPendingAds]=useState([])
    const[rejectedAds,setRejectedAds]=useState([])
    const[loading,setLoading]=useState(true)
    useEffect(()=>{
        const getUserVechileAds=async()=>{


const dbref = collection(db, 'VehicleRequests');
try {
    const q = query(dbref, where('customerId', '==', auth.currentUser.uid));
    const querySnapshot = await getDocs(q);
    const requestsData = querySnapshot.docs.map((doc) => doc.data());
    const pendingRequests= requestsData.filter((item)=>{return item.status=='pending'})
    const approvedRequests= requestsData.filter((item)=>{return item.status=='approved'})
    const canceledRequests= requestsData.filter((item)=>{return item.status=='cancelled'})
 

  setApprovedAds(approvedRequests)
setPendingAds(pendingRequests)
setRejectedAds(canceledRequests)
} catch (error) {
    console.log(error);
}

setTimeout(() => {
    setLoading(false)
}, 1500);
        }
        getUserVechileAds()
    },[])

    const renderItemPending=({item})=>{
        return(
            <View style={{paddingHorizontal:hp('2%')}}>

            <Card>

            <View style={{paddingHorizontal:wp('3%'),height: hp('20%'),width:wp('85%'),marginVertical:hp('1%'),paddingVertical:hp('2%')}}>
                <Text style={{fontSize:14 ,fontWeight:'800',textTransform:'capitalize'}}>status: {item.status}</Text>
                <Text style={{fontSize:14 ,fontWeight:'800',textTransform:'capitalize'}}>Request Date: {item.date}</Text>
                <Text style={{fontSize:14 ,fontWeight:'800',textTransform:'capitalize'}}>Vechile Name: {item.vechileName}</Text>
                <Text style={{fontSize:14 ,fontWeight:'800',textTransform:'capitalize'}}>Demand: {item.demand} lacs</Text>
                <Text style={{fontSize:14 ,fontWeight:'800',textTransform:'capitalize',color:Colors.red,textAlign:'center'}}>This Reqeust Is Pending, TechShop Will Be Updating You Soon !</Text>
       
            </View>
            </Card>
            </View>
        )
    }
    const renderItemApproved=({item})=>{
        return(
            <View style={{paddingHorizontal:hp('2%')}}>

            <Card>

            <View style={{paddingHorizontal:wp('3%'),height: hp('20%'),width:wp('85%'),marginVertical:hp('1%'),paddingVertical:hp('2%')}}>
                <Text style={{fontSize:14 ,fontWeight:'800',textTransform:'capitalize'}}>status: {item.status}</Text>
                <Text style={{fontSize:14 ,fontWeight:'800',textTransform:'capitalize'}}>Request Date: {item.date}</Text>
                <Text style={{fontSize:14 ,fontWeight:'800',textTransform:'capitalize'}}>Vechile Name: {item.vechileName}</Text>
                <Text style={{fontSize:14 ,fontWeight:'800',textTransform:'capitalize'}}>Demand: {item.demand} lacs</Text>
                <Text style={{fontSize:14 ,fontWeight:'800',textTransform:'capitalize',color:Colors.red,textAlign:'center'}}>This Reqeust Is Approved, TechShop Interested Valued Customers Will Contact You For Further Details!</Text>
       
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
                <Text style={{fontSize:14 ,fontWeight:'800',textTransform:'capitalize'}}>Request Date: {item.date}</Text>
                <Text style={{fontSize:14 ,fontWeight:'800',textTransform:'capitalize'}}>Vechile Name: {item.vechileName}</Text>
                <Text style={{fontSize:14 ,fontWeight:'800',textTransform:'capitalize'}}>Demand: {item.demand} lacs</Text>
                <Text style={{fontSize:14 ,fontWeight:'800',textTransform:'capitalize',color:Colors.red,textAlign:'center'}}>This Reqeust Is Cancelled Due To Over Charged Demand , TechShop Aplogizes For The Inconvienance</Text>
       
            </View>
            </Card>
            </View>
        )
    }

    return(
        <View style={CommonStyles.container}>
        <Text style={{fontSize:20,color: Colors.deepBlue,alignSelf:'center'}}>Your TechShop Requests</Text>
        
        
 { loading && <Text style={{alignSelf:'center'}}>Getting...</Text> }
 
 {!loading && <ScrollView contentContainerStyle={{paddingBottom: hp('3%')}}>

<View>
<Text style={{fontSize: 16,fontWeight:'bold',color: Colors.deepBlue,marginHorizontal: hp('4%'),marginVertical:hp('1.5%')}}>Pending Requests</Text>
{pendingAds && <HorizontalList
        Data={pendingAds}
        renderItem={renderItemPending}
        keyExtractor={(item,index)=>{return index.toString()}}
        />}
        {
            !pendingAds && <Text>No Reqeusts Found</Text>
        }
</View>
<View>
<Text style={{fontSize: 16,fontWeight:'bold',color: Colors.deepBlue,marginHorizontal: hp('4%'),marginVertical:hp('1.5%')}}>Approved Requests</Text>
{approvedAds.length>0 && <HorizontalList
        Data={approvedAds}
        renderItem={renderItemApproved}
        keyExtractor={(item,index)=>{return index.toString()}}
        />}
        {
            approvedAds.length==0 && <Text style={{alignSelf:'center'}}>No Requests Found</Text>
        }
</View>
<View>
<Text style={{fontSize: 16,fontWeight:'bold',color: Colors.deepBlue,marginHorizontal: hp('4%'),marginVertical:hp('1.5%')}}>Cancelled Requests</Text>
{rejectedAds.length >0 ? <HorizontalList
        Data={rejectedAds}
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

export default VechileAdStatus