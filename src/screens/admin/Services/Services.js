import React, { useState, useEffect } from "react";
import { View, Text, StyleSheet, FlatList, Alert, Image } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import Button from "../../../components/Button/Button";
import { AdminServices } from "./DummyData";
import AsyncStorage from "@react-native-async-storage/async-storage";
import Colors from "../../../config/colors/Colors";
import Card from "../../../components/Card/Card";

const Services = ({ navigation }) => {
  return (
    <View style={styles.container}>
      {AdminServices.map((service) => (
        <Card key={service.id}>
          <Image source={{ uri: service.image }} style={styles.image} />
          <Text>{service.serviceName}</Text>
          <Text>{service.customerName}</Text>
          <Text>{service.customerAdress}</Text>
          <Text>{service.time}</Text>
          <Text>{service.description}</Text>
        </Card>
      ))}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    // padding: 20,
    backgroundColor: Colors.white,
  },
  serviceItem: {
    flexDirection: "row",
    // justifyContent: "space-between",
    alignItems: "center",
    marginVertical: 10,
  },
});

export default Services;

// import React, { useState, useEffect } from "react";
// import { View, Text, StyleSheet, FlatList, Alert } from "react-native";
// import { SafeAreaView } from "react-native-safe-area-context";
// import Button from "../../../components/Button/Button";
// import { AdminServices } from "./DummyData";
// import AsyncStorage from "@react-native-async-storage/async-storage";

// const Services = ({ navigation }) => {
//   const [adminServices, setAdminServices] = useState([]);

//   useEffect(() => {
//     const getServices = async () => {
//       const existingServices = await AsyncStorage.getItem("services");

//       if (existingServices) {
//         setAdminServices(JSON.parse(existingServices));
//       }
//     };

//     getServices();
//   }, []);

//   const renderItem = ({ item }) => (
//     <View style={styles.serviceItem}>
//       <Text>{item.serviceName}</Text>
//       <Button
//         title="Edit"
//         width={60}
//         onPress={() => handleEditService(item.id)}
//       />
//       <Button
//         title="Delete"
//         width={60}
//         onPress={() => handleDeleteService(item.id)}
//       />
//     </View>
//   );

//   const handleAddService = (newService) => {
//     setAdminServices([...adminServices, newService]);
//   };

//   const handleEditService = (serviceId) => {
//     navigation.navigate("EditService", {
//       serviceId,
//       serviceName: adminServices.find((service) => service.id === serviceId)
//         .serviceName,
//       handleEditServiceItem,
//     });
//   };

//   const handleEditServiceItem = async (editedService) => {
//     const updatedServices = adminServices.map((service) => {
//       if (service.id === editedService.id) {
//         return editedService;
//       } else {
//         return service;
//       }
//     });
//     setAdminServices(updatedServices);
//     await AsyncStorage.setItem("services", JSON.stringify(updatedServices));
//   };

//   const handleDeleteService = (id) => {
//     setAdminServices((prevServices) => {
//       const updatedServices = prevServices.filter(
//         (service) => service.id !== id
//       );
//       AsyncStorage.setItem("services", JSON.stringify(updatedServices));
//       return updatedServices;
//     });
//   };

//   return (
//     <View style={styles.container}>
//       {adminServices.length === 0 ? (
//         <Text>No data found</Text>
//       ) : (
//         <View>
//           <FlatList
//             data={adminServices}
//             renderItem={renderItem}
//             keyExtractor={(item) => item.id.toString()}
//           />
//         </View>
//       )}
//       <Button
//         title="Add Services"
//         onPress={() => navigation.navigate("AddService", { handleAddService })}
//       />
//     </View>
//   );
// };

// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//     // padding: 20,
//   },
//   serviceItem: {
//     flexDirection: "row",
//     // justifyContent: "space-between",
//     alignItems: "center",
//     marginVertical: 10,
//   },
// });

// export default Services;
