import React, { useState, useEffect } from "react";
import { View, Text, StyleSheet, FlatList } from "react-native";
import Button from "../../../components/Button/Button";
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';

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
      if (existingParts) {
        const Parts = JSON.parse(existingParts).filter(
          (part) => part !== null
        );
        setParts(Parts);
      }
    };
    getParts();
  }, []);

  const handleAddParts = (newParts) => {
    setParts([...parts, newParts]);
  };
  const renderItem = ({ item }) => (
    <View style={styles.serviceItem}>
      {/* <Image source={{ uri: item.image }} style={styles.serviceImage} /> */}
      <View style={styles.serviceDetails}>
        <Text style={styles.serviceName}>{item.serviceName}</Text>
        <Text style={styles.serviceDescription}>{item.description}</Text>
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
    </View>
  );
  return (
    <View style={{ flex: 1 }}>
      <Text>spare parts</Text>
      <FlatList
        data={parts}
        keyExtractor={(item) => item.id.toString()}
        renderItem={renderItem}
      />
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
    // backgroundColor:'yellow',
    alignSelf: "flex-end",
    // padding:5,
    justifyContent: "space-between",
    // justifyContent: "flex-end",
  },
});

export default SparePartsReq;
