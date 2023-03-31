

import React, { useState } from "react";
import {
  Text,
  TextInput,
  Image,
  TouchableOpacity,
  StyleSheet,
  View,
  ToastAndroid,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from "react-native-responsive-screen";


import AsyncStorage from "@react-native-async-storage/async-storage";
import Button from "../../../components/Button/Button";
import Colors from "../../../config/colors/Colors";
import { Spacer } from "../../../components/Spacer/Spacer";
import Header from "../../../components/Header/Header";
import * as ImagePicker from 'expo-image-picker';
import Input from "../../../components/Input/Input";
import { addDoc, collection } from "firebase/firestore";
import { db, storage } from "../../../../firebase.config";
import { getDownloadURL, ref,uploadBytes,getStorage, uploadBytesResumable } from "firebase/storage";
import CommonStyles from "../../../config/styles/styles";
const AddService = ({ navigation, route }) => {
  const [serviceCharges, setServiceCharges] = useState("");
  const [serviceName, setServiceName] = useState("");
  const [description, setDescription] = useState("");
  const [pickedImage, setPickedImage] = useState('')

const validateValues=()=>{
  if(serviceName==''){ return alert('Service Name Is Required')}
 else if(description==''){ return alert('Service Description Is Required')}
  else if(serviceCharges==''){ return alert('Service Charges Are Required')}
  else if(pickedImage==''){ return alert('Service Image Is Required')}
  else{
    imageUpload()
  }
}
const imageUpload = async () => {
  const blobImage = await new Promise((resolve, reject) => {
    const xhr = new XMLHttpRequest();
    xhr.onload = function () {
      resolve(xhr.response);
    };
    xhr.onerror = function () {
      reject(new TypeError("Network request failed"));
    };
    xhr.responseType = "blob";
    xhr.open("GET", pickedImage, true);
    xhr.send(null);
    const metadata = {
      contentType: "image/jpeg",
    };
  });
  // Create the file metadata
  /** @type {any} */
  const metadata = {
    contentType: "image/jpeg",
  };

  // Upload file and metadata to the object 'images/mountains.jpg'
  const storageRef = ref(storage, "Services/" + Date.now());
  const uploadTask = uploadBytesResumable(storageRef, blobImage, metadata);

  // Listen for state changes, errors, and completion of the upload.
  uploadTask.on(
    "state_changed",
    (snapshot) => {
      // Get task progress, including the number of bytes uploaded and the total number of bytes to be uploaded
      const progress =
        (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
      console.log("Upload is " + progress + "% done");
      switch (snapshot.state) {
        case "paused":
          console.log("Upload is paused");
          break;
        case "running":
          console.log("Upload is running");
          break;
        case "success":
          console.log("Your Image Uploaded Successfully");
      }
    },
    (error) => {
      switch (error.code) {
        case "storage/unauthorized":
          // User doesn't have permission to access the object
          break;
        case "storage/canceled":
          // User canceled the upload
          break;

        // ...

        case "storage/unknown":
          // Unknown error occurred, inspect error.serverResponse
          break;
      }
    },
    () => {
      // Upload completed successfully, now we can get the download URL
      getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {


        console.log("File available at", downloadURL);
        handleSave(downloadURL)
      });
    }
  );
};

const clearFields=()=>{
  setPickedImage('')
  setServiceCharges('')
  setServiceName('')
  setDescription('')
}

  const handleSave = async (imageUrl) => {
  const dbref= collection(db,'Services')
  addDoc(dbref,{
    date: new Date().toDateString(),
    serviceName,
    serviceCharges,
    serviceDescription: description,
    image:imageUrl
  }).then(()=>{

    ToastAndroid.show('Service Added ',ToastAndroid.SHORT)
    clearFields()
  }).catch((err)=>{console.log(err)})
    
  };


    const pickImage = async () => {
        // No permissions request is necessary for launching the image library
        let result = await ImagePicker.launchImageLibraryAsync({
            mediaTypes: ImagePicker.MediaTypeOptions.All,
            allowsEditing: true,
            aspect: [4, 3],
            quality: 1,
        });



        if (result.canceled) {
            setPickedImage('')
        }
        else {
            setPickedImage(result.assets[0].uri);

        }
    };
  return (
  
      <View
        style={[CommonStyles.container,{padding:hp('1%')}]}
      >
        <View >
          <View style={{alignItems:'center',paddingVertical:hp('2%')}}>
        <Input
        title={'Service Name:'}
         value={serviceName}
         placeholder="Enter Service Name"
         onChangeText={setServiceName}
        />
          </View>
         <View style={{alignItems:'center',paddingVertical:hp('2%')}}>
        <Input
        title={'Service Description:'}
         value={description}
         placeholder="Describe The Serivce"
         onChangeText={setDescription}
        />
     </View>
    <View style={{alignItems:'center',paddingVertical:hp('2%')}}>
        <Input
        title={'Service Charges:'}
         value={serviceCharges}
         placeholder="Enter Service Charges"
         keyboardType={'numeric'}
         onChangeText={setServiceCharges}
        />

     </View>
<View style={{borderRadius:10,elevation:2,backgroundColor:Colors.white,padding:hp('2%'),alignItems:'center',margin: wp('1%')}}>
     { pickedImage && <Image
          source={{ uri: pickedImage }}
          style={{ width: wp('70%'),  marginVertical:hp('1%'),height: hp('15%') }}
          resizeMode="contain"
        />}
     { !pickedImage && <Image
          source={{ uri: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSDfd37kUihRkyoe3DHC2mwwmVFMGjt-pZbVA&usqp=CAU' }}
          style={{ width: wp('50%'), marginVertical:hp('1%'),height: hp('15%') }}
          resizeMode="contain"
        />}
<Button title="Upload Service Image" backgroundColor={Colors.deepBlue} borderRadius={5} onPress={()=>{pickImage()}} />
</View>
        </View>
        <Spacer />
      <Button title="Save" onPress={()=>{validateValues()}} />
      </View>
   
  );
};
const styles = StyleSheet.create({
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
export default AddService;