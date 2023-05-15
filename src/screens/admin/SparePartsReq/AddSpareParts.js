import React, { useState } from "react";
import {
  Text,
  TextInput,
  Image,
  TouchableOpacity,
  StyleSheet,
  View,
  ScrollView,
  KeyboardAvoidingView,
  Platform,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from "react-native-responsive-screen";
import { addDoc, collection } from "firebase/firestore";
import { db, storage } from "../../../../firebase.config";
import {
  getDownloadURL,
  ref,
  uploadBytes,
  getStorage,
  uploadBytesResumable,
} from "firebase/storage";

import * as ImagePicker from "expo-image-picker";
import AsyncStorage from "@react-native-async-storage/async-storage";
import Button from "../../../components/Button/Button";
import Colors from "../../../config/colors/Colors";
import { Spacer } from "../../../components/Spacer/Spacer";
import Header from "../../../components/Header/Header";
import Input from "../../../components/Input/Input";
import CommonStyles from "../../../config/styles/styles";

const AddParts = ({ navigation, route }) => {
  const [requestDate, setRequestDate] = useState("");
  const [serviceName, setServiceName] = useState("");
  const [customerName, setCustomerName] = useState("");
  const [customerAddress, setCustomerAddress] = useState("");
  const [time, setTime] = useState("");
  const [company, setCompany] = useState("");
  const [price, setPrice] = useState("");
  const [description, setDescription] = useState("");
  const [imageData, setImageData] = useState(null);
  const [pickedImage, setPickedImage] = useState("");

  const validate = () => {
    if (serviceName == "") {
      return alert("Spare Part Name is Required");
    } else if (description == "") {
      return alert("Service Description Is Required");
    } else {
      imageUpload();
    }
  };
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
    const storageRef = ref(storage, "SpareParts/" + Date.now());
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
          handleSave(downloadURL);
        });
      }
    );
  };

  const clearFields = () => {
    // setPickedImage("");
    // setServiceCharges("");
    setServiceName("");
    setDescription("");
    navigation.navigate("SparePartsReq");
  };

  const handleSave = async (imageUrl) => {
    const dbref = collection(db, "SpareParts");
    addDoc(dbref, {
      date: new Date().toDateString(),
      serviceName,
      // serviceCharges,
      serviceDescription: description,
      servicePrice: price,
      image: imageUrl,
    })
      .then(() => {
        ToastAndroid.show("Spare Part Added ", ToastAndroid.SHORT);
        clearFields();
        navigation.goBack();
      })
      .then(() => {
        navigation.goBack();
      })

      .catch((err) => {
        console.log(err);
      });
  };

  const handleSelectImage = () => {
    const options = {
      title: "Select Image",
      storageOptions: {
        skipBackup: true,
        path: "images",
      },
    };

    ImagePicker.showImagePicker(options, (response) => {
      if (response.didCancel) {
        console.log("User cancelled image picker");
      } else if (response.error) {
        console.log("ImagePicker Error: ", response.error);
      } else {
        setImageData(response);
      }
    });
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
      setPickedImage("");
    } else {
      setPickedImage(result.assets[0].uri);
    }
  };
  return (
    <SafeAreaView style={[CommonStyles.container, {}]}>
      <ScrollView
        // keyboardShouldPersistTaps="handled"
        // contentContainerStyle={{ padding: 10 }}
        showsVerticalScrollIndicator={false}
      >
        <KeyboardAvoidingView
        // behavior={Platform.OS =  1   == 'ios' ? 'padding' : 'height'}
        >
          <View
            style={
              {
                // padding: hp("2"),
                // flex: 0.9,
              }
            }
          >
            <Header headerTitle="Add Spare Part" />
            <Spacer />
            {/* <Text style={styles.text}>Part Name:</Text> */}
            <Input
              title={"Part Name"}
              value={serviceName}
              onChangeText={setServiceName}
              style={styles.textInput}
              placeholder="Enter Spare Part Name"
            />
            <Input
              title={"Description"}
              value={description}
              onChangeText={setDescription}
              style={styles.textInput}
              placeholder="Description"
            />
            <Input
              title={"Company Name"}
              value={company}
              onChangeText={setCompany}
              style={styles.textInput}
              placeholder="Enter Company's Name"
            />
            <Input
              title={"Price"}
              value={price}
              onChangeText={setPrice}
              style={styles.textInput}
              placeholder="Enter Price"
            />
            <View
              style={{
                borderRadius: 10,
                elevation: 2,
                backgroundColor: Colors.white,
                padding: hp("2%"),
                alignItems: "center",
                margin: wp("1%"),
              }}
            >
              {pickedImage && (
                <Image
                  source={{ uri: pickedImage }}
                  style={{
                    width: wp("70%"),
                    marginVertical: hp("1%"),
                    height: hp("15%"),
                  }}
                  resizeMode="contain"
                />
              )}
              {!pickedImage && (
                <Image
                  source={{
                    uri: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSDfd37kUihRkyoe3DHC2mwwmVFMGjt-pZbVA&usqp=CAU",
                  }}
                  style={{
                    width: wp("50%"),
                    marginVertical: hp("1%"),
                    height: hp("15%"),
                  }}
                  resizeMode="contain"
                />
              )}
              <Button
                title="Upload Service Image"
                backgroundColor={Colors.deepBlue}
                borderRadius={5}
                onPress={() => {
                  pickImage();
                }}
              />
            </View>
            <Spacer />
          </View>
          <Button 
          title="Save" 
          // onPress={handleSave} 
          onPress={() => {
            validate();
          }}
          />
        </KeyboardAvoidingView>
      </ScrollView>
    </SafeAreaView>
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
export default AddParts;
