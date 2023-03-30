import React, { useState } from "react";
import { View, Text, TextInput, StyleSheet, Button } from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";

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
    <View style={styles.container}>
      <Text style={styles.label}>Service Name:</Text>
      <TextInput
        style={styles.input}
        onChangeText={(text) => setServiceName(text)}
        value={serviceName}
      />
      <Button title="Update Service" onPress={handleSaveChanges} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
  },
  label: {
    fontSize: 18,
    marginBottom: 10,
  },
  input: {
    height: 40,
    borderColor: "gray",
    borderWidth: 1,
    padding: 10,
    marginBottom: 20,
  },
});

export default EditService;
