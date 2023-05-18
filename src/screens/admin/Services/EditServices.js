import React, { useState } from "react";
import { View, Text, TextInput, StyleSheet, Image, ToastAndroid } from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { SafeAreaView } from "react-native-safe-area-context";
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from "react-native-responsive-screen";
import Button from "../../../components/Button/Button";
import Colors from "../../../config/colors/Colors";
import { Spacer } from "../../../components/Spacer/Spacer";
import Header from "../../../components/Header/Header";
import Input from "../../../components/Input/Input";
import { doc, updateDoc } from "firebase/firestore";
import { db } from "../../../../firebase.config";
const EditService = ({ route, navigation }) => {
  const {item, docId } = route.params;
  console.log("Doc Id is  "+docId)
  const [serviceCharges, setserviceCharges] = useState(item.serviceCharges);


  const handleSaveChanges = async () => {
  
const docRef= doc(db,'Services',docId)
updateDoc(docRef,{
  serviceCharges: serviceCharges
}).then(()=>{
ToastAndroid.show('Service Charges Revised Successfully',ToastAndroid.SHORT)
navigation.goBack();
}).catch((err)=>{
  console.log("error inn service Edit",err)
   alert('Something Went Wrong Please Try Again')
   navigation.goBack();
})
    
  };
  return (
    <SafeAreaView style={styles.container}>
      <Header headerTitle="Edit" />
      <Spacer />
      <View
        style={
          {
            flex: 0.9,
          }
        }
      >
        <Text style={[styles.text,{alignSelf:'center'}]}>You Can Only Edit The Service Charges</Text>
       
        <Input
          // style={styles.textInput}
          title={"Service Name"}
          
          disabled
          value={item.serviceName}
        />
        <Input
          // style={styles.textInput}
          title={"Service Description"}
          disabled
          value={item.serviceDescription}
        />
        <Input
          // style={styles.textInput}
          title={"Service Price"}
          placeholder={"Enter New Service Price"}
          onChangeText={(text) => setserviceCharges(text)}
          value={serviceCharges}
        />

      </View>
      <Spacer />
      <Button title="Update Service Price" onPress={handleSaveChanges} />
    </SafeAreaView>
  );
};
const styles = StyleSheet.create({
  container: {
    flex: 1,
    // padding: 20,
    backgroundColor: Colors.white,
  },
  label: {
    fontSize: 18,
    marginBottom: 10,
  },
  text: {
    fontSize: hp("2"),
    fontWeight: "600",
    color: Colors.black,
  },
  textInput: {
    borderWidth: 0.3,
    borderRadius: 5,
    padding: hp("1"),
    borderColor: Colors.red,
    marginVertical: hp("1"),
  },
});
export default EditService;
