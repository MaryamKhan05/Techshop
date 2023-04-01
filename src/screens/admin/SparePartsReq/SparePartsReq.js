import React, { useState, useEffect } from "react";
import { View, Text, StyleSheet, FlatList, Alert, Image } from "react-native";
import Button from "../../../components/Button/Button";
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from "react-native-responsive-screen";
import AsyncStorage from "@react-native-async-storage/async-storage";
import Colors from "../../../config/colors/Colors";
import Card from "../../../components/Card/Card";
// const SparePartsReq = ({ navigation }) => {
//   const [parts, setParts] = useState([]);
//   useEffect(() => {
//     const getServices = async () => {
//       const existingParts = await AsyncStorage.getItem("parts");
//       console.log("existing parts are ", existingParts);
//       if (existingParts) {
//         // Parse the JSON and remove null items from the array
//         const parts = JSON.parse(existingParts).filter((part) => part !== null);
//         setParts(parts);
//       }
//     };

//     getServices();
//   }, []);

//   const handleAddParts = (newParts) => {
//     setParts([...parts, newParts]);
//   };
//   return (
//     <View
//       style={{
//         flex: 1,
//         // backgroundColor:'red'
//       }}
//     >
//       <Text>spare parts</Text>
//       <FlatList
//         data={parts}
//         keyExtractor={(item) => item.id.toString()}
//         renderItem={({ item }) => {
//           <View>
//             <Text>{item.serviceName}</Text>
//           </View>;
//         }}
//       />
//       <Button
//         title="Add Service"
//         onPress={() => navigation.navigate("AddParts", { handleAddParts })}
//       />
//     </View>
//   );
// };

const SparePartsReq = ({ navigation }) => {
  const [parts, setParts] = useState([]);

  useEffect(() => {
    const getParts = async () => {
      const existingParts = await AsyncStorage.getItem("spareparts");

      console.log("existing parts are ", existingParts);
      if (existingParts) {
        const spareparts = JSON.parse(existingParts).filter(
          (part) => part !== null
        );
        setParts(spareparts);
      }
    };
    getParts();
  }, []);

  // FUNCTION TO ADD NEW SPARE PARTS
  const handleAddParts = (newParts) => {
    console.log("parts received on spare screen", newParts);
    setParts([...parts, newParts]);
  };

  //FUNCTION TO DELETE THE EXISTING SPARE PARTS
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
            const updatedParts = parts.filter(
              (service) => service.id !== item.id
            );
            setParts(updatedParts);
            await AsyncStorage.setItem(
              "spareparts",
              JSON.stringify(updatedParts)
            );
          },
        },
      ],
      { cancelable: true }
    );
  };

  //FUNCTION TO EDIT A EXISTING SPARE PART
  const handleEditService = (item) => {
    navigation.navigate("EditSpareParts", { item, handleUpdateSpareParts });
  };
  const handleUpdateSpareParts = async (updatedService) => {
    // Find the index of the service to be updated
    const index = parts.findIndex(
      (service) => service.id === updatedService.id
    );
    // Create a new array with the updated service at the correct index
    const updatedServices = [
      ...parts.slice(0, index),
      updatedService,
      ...parts.slice(index + 1),
    ];
    // Update the state with the new array of services
    setParts(updatedServices);
    // Store the updated services array in async storage
    await AsyncStorage.setItem("spareparts", JSON.stringify(updatedServices));
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
              // backgroundColor:'yellow'
            }}
          >
            <View
              style={{
                alignItems: "center",
                justifyContent: "center",
              }}
            >
              <Image
                source={{
                  uri: "https://img.freepik.com/free-vector/car-wheel-realistic_1284-4977.jpg?size=626&ext=jpg&uid=R94214209&ga=GA1.2.1081558094.1677063520&semt=sph",
                }}
                style={styles.serviceImage}
              />
            </View>
            <View
              style={{
                // backgroundColor: "pink",
                width: wp("55"),
              }}
            >
              <Text style={styles.serviceName}>{item.serviceName}</Text>
              <Text style={styles.serviceDescription}>{item.description}</Text>
              <Text style={styles.serviceDescription}>{item.company}</Text>
              <Text style={styles.serviceDescription}>{item.price}</Text>
            </View>
          </View>

          <View style={styles.serviceButtons}>
            <Button
              title="Edit"
              width={wp("20")}
              height={hp("4.4")}
              onPress={() => handleEditService(item)}
            />
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
    <View
      style={{
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
          data={parts}
          keyExtractor={(item) => item.id.toString()}
          renderItem={renderItem}
        />
      </View>
      <Button
        title="Add Parts"
        onPress={() => navigation.navigate("AddParts", { handleAddParts })}
      />
    </View>
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
    width: wp("30"),
    height: hp("20"),
    borderRadius: 10,
    marginRight: 10,
  },
  serviceDetails: {
    // flex: 1,
    justifyContent: "space-between",
    // paddingTop: 5,
    // paddingBottom: 5,
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
    alignSelf: "center",

    // padding:5,
    justifyContent: "space-between",
    // justifyContent: "flex-end",
    width: wp("45"),
  },
});

export default SparePartsReq;
