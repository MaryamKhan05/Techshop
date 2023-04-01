import React, { useState } from "react";
import { View, Text, TextInput, StyleSheet, Image } from "react-native";
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
const EditService = ({ route, navigation }) => {
  const { item, handleUpdateService } = route.params;
  const [serviceName, setServiceName] = useState(item.serviceName);
  const [customerName, setCustomerName] = useState(item.customerName);
  const [customerAddress, setCustomerAddress] = useState(item.customerAddress);
  const [requestDate, setRequestDate] = useState(item.requestDate);
  const [time, setTime] = useState(item.time);
  const [description, setDescription] = useState(item.description);

  const handleSaveChanges = async () => {
    const updatedService = {
      id: item.id,
      serviceName: serviceName,
      customerName: customerName,
      customerAddress: customerAddress,
      requestDate: requestDate,
      time: time,
      description: description,
      image: item.image,
    };

    await handleUpdateService(updatedService);
    navigation.goBack();
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
        {/* <Image
          source={{ uri: item.image }}
          style={{
            width: wp("10"),
            height: hp("10"),
            backgroundColor: "pink",
          }}
        /> */}
        <Input
          // style={styles.textInput}
          title={"Service Name"}
          placeholder={"Enter Service Name"}
          onChangeText={(text) => setServiceName(text)}
          value={serviceName}
        />
        <Input
          title={"Service Name"}
          placeholder={"Enter Service Name"}
          onChangeText={(text) => setDescription(text)}
          value={description}
        />
      </View>
      <Spacer />
      <Button title="Update Service" onPress={handleSaveChanges} />
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
