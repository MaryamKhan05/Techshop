import React, { useState } from "react";
import { View, Text, TextInput, StyleSheet, Button } from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";

const EditService = ({ navigation, route }) => {
  const { serviceId, serviceName } = route.params;
  const [editedServiceName, setEditedServiceName] = useState(serviceName);
  const handleUpdateService = async () => {
    const existingServices = await AsyncStorage.getItem("services");

    if (existingServices) {
      const services = JSON.parse(existingServices);
      const updatedServices = services.map((service) =>
        service.id === serviceId
          ? { ...service, serviceName: editedServiceName }
          : service
      );
      await AsyncStorage.setItem("services", JSON.stringify(updatedServices));
      route.params.handleEditServiceItem(
        updatedServices.find((service) => service.id === serviceId)
      );
      navigation.goBack({
        serviceName: editedServiceName,
      });
    }
  };
  return (
    <View style={styles.container}>
      <Text style={styles.label}>Service Name:</Text>
      <TextInput
        style={styles.input}
        onChangeText={(text) => setEditedServiceName(text)}
        value={editedServiceName}
      />
      <Button title="Update Service" onPress={handleUpdateService} />
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
