import React, { useState,useEffect } from "react";
import { View, Text, FlatList, Image, StyleSheet,ToastAndroid, ActivityIndicator } from "react-native";
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from "react-native-responsive-screen";
import Button from "../../../components/Button/Button";
import Card from "../../../components/Card/Card";
import { Spacer } from "../../../components/Spacer/Spacer";
import Colors from "../../../config/colors/Colors";
import { collection,getDocs,where,query,updateDoc,getDoc,doc } from "firebase/firestore";
import { db } from "../../../../firebase.config";
const VehicleReq = () => {
  const [requests, setRequests] = useState([
    {
      id: "1",
      vehicle: "Honda Civic",
      model: "Sedan",
      year: "2022",
      price: "20000",
      description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit.",
      image:
        "https://img.freepik.com/free-photo/red-luxury-sedan-road_114579-5079.jpg?size=626&ext=jpg&uid=R94214209&ga=GA1.1.1081558094.1677063520&semt=ais",
    },
    {
      id: "2",
      vehicle: "Toyota Corolla",
      model: "Sedan",
      year: "2021",
      price: "18000",
      description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit.",
      image:
        "https://img.freepik.com/free-photo/blue-sport-sedan-parked-yard_114579-5078.jpg?size=626&ext=jpg&uid=R94214209&ga=GA1.1.1081558094.1677063520&semt=ais",
    },
    {
      id: "3",
      vehicle: "Ford F-150",
      model: "Pickup Truck",
      year: "2020",
      price: "25000",
      description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit.",
      image:
        "https://img.freepik.com/free-photo/yellow-sport-car-with-black-autotuning-road_114579-5051.jpg?size=626&ext=jpg&uid=R94214209&ga=GA1.1.1081558094.1677063520&semt=ais",
    },
  ]);
  const[vechileRequests,setVehicleRequests]=useState([])
  const[loading,setLoading]=useState(true)
  const[showLoader,setShowLoader]=useState(false)
  const[loaderIndex,setLoaderIndex]=useState(null)
  useEffect(()=>{
    const getUserVechileAds=async()=>{


const dbref = collection(db, 'VehicleRequests');
try {
const q = query(dbref, where('status','==','pending'));
const querySnapshot = await getDocs(q);
const requestsData = querySnapshot.docs.map((doc) => doc.data());
setVehicleRequests(requestsData)
} catch (error) {
console.log(error);
}

setTimeout(() => {
setLoading(false)
}, 1500);
    }
    getUserVechileAds()
},[])

const updateReq =async (reqID,status,index) => {
  setLoaderIndex(index)
  setShowLoader(true)
  const dbRef = collection(db, "VehicleRequests");
  const q = query(dbRef, where("requestID", "==", reqID));
  const foundDocs= await getDocs(q)
  const docIds= foundDocs.docs.map((docs)=>docs.id)
const docId=docIds[0]
const updateDocRef=doc(db,"VehicleRequests",docId)
  updateDoc(updateDocRef, {
    status,
  }).then(()=>{
    ToastAndroid.show(`Requested ${status} Successfully!`,ToastAndroid.SHORT)
    setLoaderIndex(null)
    setShowLoader(false)
  }).catch((err)=>{alert('Something Went Wrong')})
};

  const renderItem = ({ item,index }) => (
    <View
      style={{
        margin: hp("1"),
      }}
    >
      <Card>
        <View
          style={{
            flexDirection: "row",
            width: wp("90"),
          }}
        >
          <View
            style={{
              alignItems: "center",
              justifyContent: "center",
              width: wp("30"),
            }}
          >
            <Image
              source={{ uri: item.imageUrl }}
              style={{
                height: hp("15"),
                width: wp("30"),
                // resizeMode:'contain'
              }}
            />
          </View>
          <View
            style={{
              margin: hp("1"),
              width: wp("70"),
            }}
          >
          {loaderIndex==index && showLoader && <ActivityIndicator
           
           size={'small'}
           color={Colors.deepBlue}
           style={{alignSelf:'center'}}
           />}
            <Text style={styles.text}>Model: {item.vechileName}</Text>
            <Text style={styles.text}>Company Name: {item.companyName}</Text>
            <Text style={styles.text}>Year: {item.modalYear}</Text>
            <Text style={styles.text}>Demand: {item.demand} lacs</Text>
            <Text style={styles.text}>Used: {item.used} km</Text>
            <Text style={styles.text}>Owner Name: {item.ownerName}</Text>
            <Text style={styles.text}>Owner Contact: {item.contactNo}</Text>
          </View>
        </View>
        <View
        style={{
          flexDirection:'row',
          alignItems:'center',
          alignSelf:'center',
          justifyContent:'space-between',
          width:wp('55'),
          marginTop:hp('2')

        }}
        >
          <Button title='Approve'
          onPress={()=>{updateReq(item.requestID,'approved',index)}}
          
          width={wp('25')} height={hp('5')} />
          <Button title='Reject' width={wp('25')} height={hp('5')} 
             onPress={()=>{updateReq(item.requestID,'cancelled')}}
             
          />
        </View>
      </Card>
    </View>
  );

  return (
    <View
      style={{
        backgroundColor: Colors.white,
        flex: 1,
      }}
    >
   {!loading &&    <View
        style={{
          padding: hp("1"),
        }}
      >
       {vechileRequests.length >0 ? <FlatList
          data={vechileRequests}
          showsVerticalScrollIndicator={false}
          renderItem={renderItem}
          keyExtractor={(item,index) => {return index.toString()}}
        />
        :
<Text>No Requests Right Now</Text>
        }
      </View>}
      {
        loading && <View style={{flex:1,justifyContent:'center',alignSelf:'center'}}>
          <Text>Loading...</Text>
          </View>
      }
    </View>
  );
};

const styles = StyleSheet.create({
  text: {
    fontSize: hp("2"),
    fontWeight: "500",
  },
});
export default VehicleReq;
