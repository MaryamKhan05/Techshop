import React, { useState, useEffect } from "react";
import { View, Text, StyleSheet, FlatList, Alert, Image } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import Button from "../../../components/Button/Button";
import { AdminServices } from "./DummyData";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { AdminServices as DummyData } from "./DummyData";

const Services = ({ navigation }) => {
  const [adminServices, setAdminServices] = useState([]);

  useEffect(() => {
    const getServices = async () => {
      const existingServices = await AsyncStorage.getItem("services");
      console.log("existing service are ", existingServices);
      if (existingServices) {
        // Parse the JSON and remove null items from the array
        const services = JSON.parse(existingServices).filter(
          (service) => service !== null
        );
        setAdminServices(services);
      }
    };

    getServices();
  }, []);

  const renderItem = ({ item }) => (
    <View style={styles.serviceItem}>
      <Image source={{ uri: item.image }} style={styles.serviceImage} />
      <View style={styles.serviceDetails}>
        <Text style={styles.serviceName}>{item.serviceName}</Text>
        <Text style={styles.serviceCustomer}>
          Customer: {item.customerName}
        </Text>
        <Text style={styles.serviceAddress}>
          Address: {item.customerAdress}
        </Text>
        <Text style={styles.serviceDate}>Date: {item.requestDate}</Text>
        <Text style={styles.serviceTime}>Time: {item.time}</Text>
        <Text style={styles.serviceDescription}>{item.description}</Text>
        <View style={styles.serviceButtons}>
          <Button
            title="Edit"
            width={60}
            onPress={() => handleEditService(item)}
          />
          <Button
            title="Delete"
            width={60}
            onPress={() => handleDelete(item)}
          />
        </View>
      </View>
    </View>
  );

  const handleAddService = (newService) => {
    setAdminServices([...adminServices, newService]);
  };
  const handleDelete = async (item) => {
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
            console.log(adminServices);
            // Filter out the service to be deleted from the state and async storage using its ID
            const updatedServices = adminServices.filter(
              (service) => service.id !== item.id
            );
            console.log("updated services is", updatedServices);
            // Update the state with the filtered array
            setAdminServices(updatedServices);
            // Store the updated services array in async storage
            await AsyncStorage.setItem(
              "services",
              JSON.stringify(updatedServices)
            );
          },
        },
      ],
      { cancelable: true }
    );
  };
  const handleEditService = (item) => {
    navigation.navigate("EditService", { item, handleUpdateService });
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
  
  return (
    <SafeAreaView style={styles.container}>
      <Text style={styles.title}>Services</Text>
      <Button
        title="Add Service"
        onPress={() => navigation.navigate("AddService", { handleAddService })}
      />
      <FlatList
        data={adminServices}
        keyExtractor={(item) => item.id.toString()}
        renderItem={renderItem}
      />
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "white",
    padding: 20,
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
    flex: 1,
    justifyContent: "space-between",
    paddingTop: 5,
    paddingBottom: 5,
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
    justifyContent: "flex-end",
  },
});

export default Services;