import React, { useState, useEffect } from "react";
import { View, Text, StyleSheet, FlatList, Alert, Image } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from "react-native-responsive-screen";
import AsyncStorage from "@react-native-async-storage/async-storage";
import Button from "../../../components/Button/Button";
import { collection, getDocs } from "firebase/firestore";
import { db } from "../../../../firebase.config";
import Card from "../../../components/Card/Card";
import Colors from "../../../config/colors/Colors";
const Services = ({ navigation }) => {
  const [adminServices, setAdminServices] = useState([]);
  const [data, setData] = useState([]);
  useEffect(() => {
    const getServices = async () => {
      const d = [];
      const dbRef = collection(db, "Services");
      const querySnapshot = await getDocs(dbRef);

      querySnapshot.forEach((doc) => {
        d.push(doc.data());
      });

      setData(d);
    };

    getServices();
  }, []);

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
  const renderItem = ({ item }) => (
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
              <Text style={styles.serviceDescription}>{item.description}</Text>
            </View>
          </View>
          <View style={styles.serviceButtons}>
            <View style={{ marginHorizontal: hp("1%") }}>
              <Button
                title="Edit"
                width={wp("20")}
                height={hp("4.4")}
                onPress={() => handleEditService(item)}
              />
            </View>
            <Button
              width={wp("20")}
              height={hp("4.4")}
              title="Delete"
              onPress={() => handleDelete(item)}
            />
          </View>
        </View>
      </Card>
    </View>
  );

  return (
    <SafeAreaView style={styles.container}>
      <View
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
          <FlatList
            showsVerticalScrollIndicator={false}
            data={data}
            keyExtractor={(item) => item.image}
            renderItem={renderItem}
          />
        </View>
        <Button
          title="Add Service"
          onPress={() => navigation.navigate("AddService")}
        />
      </View>
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
