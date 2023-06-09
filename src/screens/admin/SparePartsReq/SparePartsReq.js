import React, { useState, useEffect } from "react";
import { View, Text, StyleSheet, FlatList, Alert, Image ,ToastAndroid} from "react-native";
import Button from "../../../components/Button/Button";
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from "react-native-responsive-screen";
import { getDocs, collection,doc ,deleteDoc} from "firebase/firestore";
import { db } from "../../../../firebase.config";
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
  const [partService, setPartService] = useState([]);
  const [parts, setParts] = useState([]);
  const [spareParts, setSpareParts] = useState([]);
  const[docIds,setDocIdsData]=useState([])

  // useEffect(() => {
  //   const getParts = async () => {
  //     const existingParts = await AsyncStorage.getItem("spareparts");

  //     console.log("existing parts are ", existingParts);
  //     if (existingParts) {
  //       const spareparts = JSON.parse(existingParts).filter(
  //         (part) => part !== null
  //       );
  //       setParts(spareparts);
  //     }
  //   };
  //   getParts();
  // }, []);

  // useEffect(() => {
  //   const getParts = async () => {
  //     const d = [];
  //     const dbRef = collection(db, "SpareParts");
  //     const querySnapshot = await getDocs(dbRef);

  //     querySnapshot.forEach((doc) => {
  //       d.push(doc.parts());
  //     });

  //     setParts(d);
  //   };

  //   getParts();
  // }, []);

  // useEffect(() => {
  //   const dbref = collection(db, "SpareParts");
  //   const unsubscribe = onSnapshot(dbref, (querySnapshot) => {
  //     const data = [];
  //     querySnapshot.forEach((doc) => {
  //       data.push({ id: doc.id, ...doc.data() });
  //     });
  //     setSpareParts(data);
  //   });

  //   return () => unsubscribe();
  // }, []);
  useEffect(() => {
    const getServices = async () => {
      const d = [];
const e=[]
      const dbRef = collection(db, "SpareParts");
      const querySnapshot = await getDocs(dbRef);

      querySnapshot.forEach((doc) => {
        d.push(doc.data());
      });
      querySnapshot.forEach((doc) => {
        e.push(doc.id);
      });
setDocIdsData(e)
      setParts(d);
    };

    getServices();
  }, []);
  // FUNCTION TO ADD NEW SPARE PARTS
  // const handleAddParts = (newParts) => {
  //   console.log("parts received on spare screen", newParts);
  //   setParts([...parts, newParts]);
  // };

  //FUNCTION TO DELETE THE EXISTING SPARE PARTS
  // const handleDelete = async (item) => {
  //   // Alert.alert(
  //   //   "Delete Service",
  //   //   "Are you sure you want to delete this service?",
  //   //   [
  //   //     {
  //   //       text: "Cancel",
  //   //       style: "cancel",
  //   //       onPress: () => console.log("cencal pressed"),
  //   //     },
  //   //     {
  //   //       text: "Delete",
  //   //       style: "destructive",
  //   //       onPress: async () => {
  //   //         const updatedParts = parts.filter(
  //   //           (service) => service.id !== item.id
  //   //         );
  //   //         setParts(updatedParts);
  //   //         await AsyncStorage.setItem(
  //   //           "spareparts",
  //   //           JSON.stringify(updatedParts)
  //   //         );
  //   //       },
  //   //     },
  //   //   ],
  //   //   { cancelable: true }
  //   // );
  
   
  // };



  const handleDelete = async (item,index) => {
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
         console.log("Doc ids are  ",docIds         )
           const docId= docIds[index]
           const docRef= doc(db,'SpareParts',docId)
           deleteDoc(docRef).then(()=>{
            ToastAndroid.show('Successfully deleted the Service',ToastAndroid.SHORT)
            setLoading(true)
            getServices()
           }).catch((err)=>{
            
alert('Something Went Wrong While Deleting!')
           })
           
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

  const renderItem = ({ item,index }) => (
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
              <Image source={{ uri: item.image }} style={styles.serviceImage} />
            </View>
            <View
              style={{
                // backgroundColor: "pink",
                width: wp("55"),
              }}
            >
              <Text style={styles.serviceName}>{item.serviceName}</Text>
              <Text style={styles.serviceDescription}>
                {item.serviceDescription}
              </Text>
              <Text style={styles.serviceDescription}>{item.company}</Text>
              <Text style={styles.serviceDescription}>{item.servicePrice}</Text>
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
              onPress={() => handleDelete(item,index)}
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
          // keyExtractor={(item) => item.id.toString()}
          renderItem={renderItem}
        />
      </View>
      <Button
        title="Add Parts"
        // onPress={() => navigation.navigate("AddParts", { handleAddParts })}
        onPress={() => navigation.navigate("AddParts")}
      />
    </View>
  );

  // return (
  //   <View>
  //     {parts.map((part) => (
  //       <View key={part.id}>
  //         <Text>{part.serviceName}</Text>
  //         <Text>{part.serviceDescription}</Text>
  //         {/* Add more fields as needed */}
  //       </View>
  //     ))}
  //   </View>
  // );
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
  viewAllLabel: {
    margin: hp("1%"),
    fontSize: 14,
    color: Colors.red,
    fontWeight: "bold",
  },
});

export default SparePartsReq;
