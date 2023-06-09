import React, { useEffect, useState } from "react";
import { View, Text, StyleSheet, TouchableOpacity, Image } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import Button from "../../../components/Button/Button";
import SparePartsCard from "../../../components/SparePartsCard/SparePartsCard";
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from "react-native-responsive-screen";
import Colors from "../../../config/colors/Colors";
import HorizontalList from "../../../components/HorizontalList/HorizontalList";
import AddService from "../Services/AddServices";
// import { AdminServices } from "../Services/DummyData";
import ServiceCard from "../../../components/ServiceCard/ServiceCard";
import AdminServiceCard from "../../../components/AdminCard/AdminServiceCard";
import { SparepartStock } from "../SparePartsReq/DummyData";
import AdminSparePartCard from "../../../components/AdminCard/AdminSparePartCard";
import { Spacer } from "../../../components/Spacer/Spacer";
import { collection, getDocs } from "firebase/firestore";
import { db } from "../../../../firebase.config";
import { ActivityIndicator } from "react-native";
import Card from "../../../components/Card/Card";

const Home = ({ navigation }) => {
  const [loading, setLoading] = useState(true);
  const [AdminServices, setAdminServices] = useState([]);
  const [AdminSpareParts, setAdminSpareParts] = useState([]);

  useEffect(() => {
    const getServices = async () => {
      const dbRef = collection(db, "Services");
      const snapshot = await getDocs(dbRef);
      const data = snapshot.docs.map((item) => item.data());
      setAdminServices(data);
      setLoading(false);
    };
    getServices();
  }, []);

  useEffect(() => {
    const getServices = async () => {
      const dbRef = collection(db, "SpareParts");
      const snapshot = await getDocs(dbRef);
      const data = snapshot.docs.map((item) => item.data());
      setAdminSpareParts(data);
      setLoading(false);
    };
    getServices();
  }, []);

  return (
    <View style={{ flex: 1, justifyContent: "center" }}>
      {loading ? (
        <ActivityIndicator
          size={"small"}
          style={{ alignSelf: "center" }}
          color={Colors.deepBlue}
        />
      ) : (
        <View
          style={{
            backgroundColor: Colors.white,
            paddingVertical: hp("2"),
            flex: 1,
          }}
        >
          <View
            style={{
              flexDirection: "row",
              justifyContent: "space-between",
            }}
          >
            <Text style={styles.categoryLabel}>Services Requests</Text>
          </View>
          <HorizontalList
            Data={AdminServices}
            renderItem={({ item }) => {
              return (
                <View style={{ paddingHorizontal: hp("2%") }}>
                  <AdminServiceCard
                    service={item.serviceName}
                    image={item.image}
                    width={hp("20")}
                    onPress={() => {
                      navigation.navigate("Detail", {
                        reuqestCategory: item.serviceName,
                      });
                    }}
                  />
                </View>
              );
            }}
            keyExtractor={(item, index) => {
              return index.toString();
            }}
          />
          <Spacer />
          <Spacer />
          <View
            style={{
              flexDirection: "row",
              justifyContent: "space-between",
            }}
          >
            <Text style={styles.categoryLabel}>Spare Parts Requests</Text>
            <TouchableOpacity
              onPress={() => {
                navigation.navigate("Services");
              }}
            >
              {/* <Text style={styles.viewAllLabel}>View All</Text> */}
            </TouchableOpacity>
          </View>
          <HorizontalList
            Data={AdminSpareParts}
            renderItem={({ item }) => {
              return (
                <View style={{ paddingHorizontal: hp("2%") }}>
                  <AdminServiceCard
                    service={item.serviceName}
                    image={item.image}
                    width={hp("20")}
                    onPress={() => {
                      navigation.navigate("SparePartDetail", {
                        requestCategory: item.serviceName,
                      });
                    }}
                  />
                </View>
              );
            }}
            keyExtractor={(item, index) => {
              return index.toString();
            }}
          />
        </View>
      )}
    </View>
  );
  // return (
  //   <View>
  //     {AdminSpareParts.map((part) => (
  //       <View key={part.id}>
  //         <Text>{part.customerName}</Text>
  //         <Text>{part.modalYear}</Text>
  //         {/* Add more fields as needed */}
  //       </View>
  //     ))}
  //   </View>
  // );
};

const styles = StyleSheet.create({
  categoryLabel: {
    marginHorizontal: hp("2%"),
    fontSize: 18,
    color: Colors.deepBlue,
    fontWeight: "bold",
    paddingVertical: hp("1"),
  },
  viewAllLabel: {
    margin: hp("1%"),
    fontSize: 14,
    color: Colors.red,
    fontWeight: "bold",
  },
  serviceImage: {
    width: wp("30"),
    height: hp("20"),
    borderRadius: 10,
    marginRight: 10,
  },
});

export default Home;
