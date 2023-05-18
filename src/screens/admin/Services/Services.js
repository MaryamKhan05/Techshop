import React, { useState, useEffect } from "react";
import { View, Text, StyleSheet, FlatList, Alert, Image, ActivityIndicator } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from "react-native-responsive-screen";
import AsyncStorage from "@react-native-async-storage/async-storage";
import Button from "../../../components/Button/Button";
import { collection, deleteDoc, doc, getDocs } from "firebase/firestore";
import { db } from "../../../../firebase.config";
import Card from "../../../components/Card/Card";
import Colors from "../../../config/colors/Colors";
import { ToastAndroid } from "react-native";
const Services = ({ navigation }) => {
  const [adminServices, setAdminServices] = useState([]);
  const [data, setData] = useState([]);
  const [docIdsdata, setDocIdsData] = useState([]);
  const[loading,setLoading]=useState(true)
  const getServices = async () => {
    const dbRef = collection(db, "Services");
    const querySnapshot = await getDocs(dbRef);
const d= querySnapshot.docs.map((doc) => doc.data() );
const docIds= querySnapshot.docs.map((doc) => doc.id );

    setData(d);
    setDocIdsData(docIds)
  
    setLoading(false)
  };
  useEffect(() => {

    getServices();
  }, []);

  const handleDelete = async (item,index) => {
    Alert.alert(
      "Delete Service",
      "Are you sure you want to delete this service?",
      [
        {
          text: "Cancel",
          style: "cancel",
          onPress: () => console.log("cencal pressed"),
        },
        {
          text: "Delete",
          style: "destructive",
          onPress: async () => {
         
           const docId= docIdsdata[index]
           const docRef= doc(db,'Services',docId)
           deleteDoc(docRef).then(()=>{
            ToastAndroid.show('Successfully deleted the Service',ToastAndroid.SHORT)
            setLoading(true)
            getServices()
           }).catch((err)=>{
alert('Something Went Wrong While Deleting!')
           })
           
          },
        },
      ],
      { cancelable: true }
    );
  };
  const handleEditService = (item,index) => {
    const docId= docIdsdata[index]
    navigation.navigate("EditService", { item,docId });
  };
  const handleUpdateService = async (updatedService) => {
    // Find the index of the service to be updated
    const index = adminServices.findIndex(
      (service) => service.id === updatedService.id
    );
    // Create a new array with the updated service at the correct index
    const updatedServices = [
      ...adminServices.slice(0, index),
      updatedService,
      ...adminServices.slice(index + 1),
    ];
    // Update the state with the new array of services
    setAdminServices(updatedServices);
    // Store the updated services array in async storage
    await AsyncStorage.setItem("services", JSON.stringify(updatedServices));
  };
  const renderItem = ({ item ,index}) => (
    <View
      style={{
        margin: hp("1"),
      }}
    >
      <Card>
        <View
          style={{
            width: wp("90"),
            // padding:hp("1")
          }}
        >
          <View
            style={{
              flexDirection: "row",
            }}
          >
            <View>
              <Image source={{ uri: item.image }} style={styles.serviceImage} />
            </View>
            <View style={styles.serviceDetails}>
              <Text style={styles.serviceName}>{item.serviceName}</Text>
              <Text style={styles.serviceDescription}>{item.serviceDescription}</Text>
              <Text style={styles.serviceDescription}>Rs : {item.serviceCharges} (Charges)</Text>
            </View>
          </View>
          <View style={styles.serviceButtons}>
            <View style={{ marginHorizontal: hp("1%") }}>
              <Button
                title="Edit"
                width={wp("20")}
                height={hp("4.4")}
                onPress={() => handleEditService(item,index)}
              />
            </View>
            <Button
              width={wp("20")}
              height={hp("4.4")}
              title="Delete"
              onPress={() => handleDelete(item,index)}
            />
          </View>
        </View>
      </Card>
    </View>
  );

  return (
    <SafeAreaView style={styles.container}>
    {loading?<ActivityIndicator
    color={Colors.deepBlue}
    style={{alignSelf:'center'}}
    size={'small'}
    /> : <View
        style={{
          // paddingHorizontal: hp("2"),
          flex: 1,
          backgroundColor: Colors.white,
        }}
      >
        <View
          style={{
            flex: 0.95,
          }}
        >
          {data.length>0 &&<FlatList
            showsVerticalScrollIndicator={false}
            data={data}
            keyExtractor={(item) => item.image}
            renderItem={renderItem}
          />}
          {
            data.length==0 && <Text>Nothing to show</Text>
          }
        </View>
        <Button
          title="Add Service"
          onPress={() => navigation.navigate("AddService")}
        />
      </View>}
    </SafeAreaView>
  );
};
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "white",
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 20,
  },
  serviceItem: {
    flexDirection: "row",
    backgroundColor: "#F5F5F5",
    borderRadius: 10,
    padding: 10,
    marginBottom: 10,
  },
  serviceImage: {
    width: 100,
    height: 100,
    borderRadius: 10,
    marginRight: 10,
  },
  serviceDetails: {
    // flex: 1,
    // justifyContent: "space-between",
    // paddingTop: 5,
    // paddingBottom: 5,
    width: wp("67"),
    // backgroundColor: "pink",
  },
  serviceName: {
    fontSize: 18,
    fontWeight: "bold",
    marginBottom: 5,
  },
  serviceCustomer: {
    fontSize: 14,
    marginBottom: 2,
  },
  serviceAddress: {
    fontSize: 14,
    marginBottom: 2,
  },
  serviceDate: {
    fontSize: 14,
    marginBottom: 2,
  },
  serviceTime: {
    fontSize: 14,
    marginBottom: 5,
  },
  serviceDescription: {
    fontSize: 14,
    marginBottom: 10,
  },
  serviceButtons: {
    flexDirection: "row",
    // backgroundColor:'yellow',
    alignSelf: "flex-end",
    // padding:5,
    justifyContent: "space-between",
    alignSelf: "center",
    marginTop: hp("1.5"),
    // justifyContent: "flex-end",
  },
});
export default Services;
