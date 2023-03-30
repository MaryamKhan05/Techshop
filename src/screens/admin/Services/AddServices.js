import { useState } from "react";
import { View, Text, TextInput, Button } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import AsyncStorage from "@react-native-async-storage/async-storage";

const AddService = ({ navigation, route }) => {
  const [requestDate, setRequestDate] = useState("");
  const [serviceName, setServiceName] = useState("");
  const [customerName, setCustomerName] = useState("");
  const [customerAddress, setCustomerAddress] = useState("");
  const [time, setTime] = useState("");
  const [description, setDescription] = useState("");

  const handleSave = async () => {
    const newService = {
      id: Math.random(),
      requestDate,
      serviceName,
      customerName,
      customerAddress,
      time,
      description,
    };

    const existingServices = await AsyncStorage.getItem("services");
    let services = [];

    if (existingServices) {
      services = JSON.parse(existingServices);
    }

    services.push(newService);

    await AsyncStorage.setItem("services", JSON.stringify(services));
    setRequestDate("");
    setServiceName("");
    setCustomerName("");
    setCustomerAddress("");
    setTime("");
    setDescription("");
    const handleAddService = route.params.handleAddService;
    handleAddService(newService);
    navigation.navigate("Services");
  };
  return (
    <SafeAreaView>
      <Text>Request Date:</Text>
      <TextInput value={requestDate} onChangeText={setRequestDate} />
      <Text>Service Name:</Text>
      <TextInput value={serviceName} onChangeText={setServiceName} />
      <Text>Customer Name:</Text>
      <TextInput value={customerName} onChangeText={setCustomerName} />
      <Text>Customer Address:</Text>
      <TextInput value={customerAddress} onChangeText={setCustomerAddress} />
      <Text>Time:</Text>
      <TextInput value={time} onChangeText={setTime} />
      <Text>Description:</Text>
      <TextInput value={description} onChangeText={setDescription} />
      <Button title="Save" onPress={handleSave} />
    </SafeAreaView>
  );
};

export default AddService;
