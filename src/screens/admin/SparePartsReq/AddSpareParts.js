// import { useState } from "react";
// import { View, Text, TextInput, Button, Image } from "react-native";
// import { SafeAreaView } from "react-native-safe-area-context";
// import AsyncStorage from "@react-native-async-storage/async-storage";

// const AddService = ({ navigation, route }) => {
//   const [requestDate, setRequestDate] = useState("");
//   const [serviceName, setServiceName] = useState("");
//   const [customerName, setCustomerName] = useState("");
//   const [customerAddress, setCustomerAddress] = useState("");
//   const [time, setTime] = useState("");
//   const [description, setDescription] = useState("");
//   const [image, setImage] = useState("");

//   const handleSave = async () => {
//     const newService = {
//       id: Math.random(),
//       requestDate,
//       serviceName,
//       customerName,
//       customerAddress,
//       time,
//       description,
//       image,
//     };

//     const existingServices = await AsyncStorage.getItem("services");
//     let services = [];

//     if (existingServices) {
//       services = JSON.parse(existingServices);
//     }

//     services.push(newService);

//     await AsyncStorage.setItem("services", JSON.stringify(services));
//     setRequestDate("");
//     setServiceName("");
//     setCustomerName("");
//     setCustomerAddress("");
//     setTime("");
//     setDescription("");
//     setImage("");
//     const handleAddService = route.params.handleAddService;
//     handleAddService(newService);
//     navigation.navigate("Services");
//   };
//   return (
//     <SafeAreaView>
//       <Image
//         source={{
//           uri: "https://cdn-icons-png.flaticon.com/512/2872/2872152.png",
//         }}
//         style={{ width: 100, height: 100, marginBottom: 10 }}
//       />
//       <Text>Request Date:</Text>
//       <TextInput value={requestDate} onChangeText={setRequestDate} />
//       <Text>Service Name:</Text>
//       <TextInput value={serviceName} onChangeText={setServiceName} />
//       <Text>Customer Name:</Text>
//       <TextInput value={customerName} onChangeText={setCustomerName} />
//       <Text>Customer Address:</Text>
//       <TextInput value={customerAddress} onChangeText={setCustomerAddress} />
//       <Text>Time:</Text>
//       <TextInput value={time} onChangeText={setTime} />
//       <Text>Description:</Text>
//       <TextInput value={description} onChangeText={setDescription} />
//       <Button title="Save" onPress={handleSave} />
//     </SafeAreaView>
//   );
// };

// export default AddService;

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

import ImagePicker from "react-native-image-picker";
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

  const handleSave = async () => {
    const newParts = {
      id: Math.random(),
      requestDate,
      serviceName,
      customerName,
      customerAddress,
      time,
      description,
      imageData,
      company,
      price,
    };

    const existingParts = await AsyncStorage.getItem("spareparts");
    let spareparts = [];

    if (existingParts) {
      spareparts = JSON.parse(existingParts);
    }

    spareparts.push(newParts);

    await AsyncStorage.setItem("spareparts", JSON.stringify(spareparts));
    setRequestDate("");
    setServiceName("");
    setCustomerName("");
    setCustomerAddress("");
    setTime("");
    setDescription("");
    setCompany("");
    setPrice("");
    setImageData(null);
    const handleAddParts = route.params.handleAddParts;
    handleAddParts(newParts);
    // console.log('newparts are', newParts)
    navigation.goBack();
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
  return (
    <SafeAreaView style={[CommonStyles.container, {  }]}>
      <ScrollView
        // keyboardShouldPersistTaps="handled"
        // contentContainerStyle={{ padding: 10 }}
        showsVerticalScrollIndicator={false}
      >
        <KeyboardAvoidingView
        // behavior={Platform.OS =  1   == 'ios' ? 'padding' : 'height'}
        >
          <View
            style={{
              // padding: hp("2"),
              // flex: 0.9,
            }}
          >
            <Header headerTitle="Add New Service" />
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
            <Spacer />
          </View>
          <Button title="Save" onPress={handleSave} />
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
