import React from "react";
import { View, Text, StyleSheet, TouchableOpacity } from "react-native";
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
import { AdminServices } from "../Services/DummyData";
import ServiceCard from "../../../components/ServiceCard/ServiceCard";
import AdminServiceCard from "../../../components/AdminCard/AdminServiceCard";
import { SparepartStock } from "../SparePartsReq/DummyData";
import AdminSparePartCard from "../../../components/AdminCard/AdminSparePartCard";
import { Spacer } from "../../../components/Spacer/Spacer";

const Home = ({ navigation }) => {
  return (
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
        {/* <TouchableOpacity
          onPress={() => {
            navigation.navigate("Services");
          }}
        >
          <Text style={styles.viewAllLabel}>View All</Text>
        </TouchableOpacity> */}
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
                    reuqestCategory: item.serviceName
                  });
                }}
              />
            </View>
          );
        }}
        keyExtractor={(item) => {
          return item.id.toString();
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
        Data={SparepartStock}
        renderItem={({ item }) => {
          return (
            <View style={{ paddingHorizontal: hp("2%") }}>
              <AdminSparePartCard
                name={item.sparepartName}
                company={item.companyName}
                car={item.carName}
                quantity={item.quantity}
                price={item.sellingprice}
                image={item.image}
                width={hp("20")}
                time={item.time}
                onPress={() => {
                  navigation.navigate("Detail", {
                    name: item.serviceName,
                    customer: item.customerName,
                    address: item.customerAdress,
                    time: item.time,
                    desc: item.description,
                    image: item.image,
                  });
                }}
              />
            </View>
          );
        }}
        keyExtractor={(item) => {
          return item.id.toString();
        }}
      />
    </View>
  );
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
});

export default Home;
