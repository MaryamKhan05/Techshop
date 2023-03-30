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
        padding: hp("1"),
        flex: 1,

        // alignItems:'center'
      }}
    >
      <View
        style={{
          // backgroundColor: Colors.lightBlue,
          // padding: hp("0.2"),
          // height: hp("35"),
          // justifyContent: "center",
          // alignItems:'center'
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
                  customer={item.customerName}
                  address={item.customerAdress}
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
    marginHorizontal: hp("3%"),
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
  body: {
    // height: hp('75%'),
    borderRadius: 30,
    flex: 0.8,
    backgroundColor: Colors.white,
    justifyContent: "center",
  },
});

export default Home;
