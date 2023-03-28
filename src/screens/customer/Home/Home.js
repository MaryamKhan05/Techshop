import React, { useState } from "react";

import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  KeyboardAvoidingView,
  Image,
  ScrollView,
} from "react-native";
import {
  heightPercentageToDP as hp,
  widthPercentageToDP as wp,
} from "react-native-responsive-screen";
import Button from "../../../components/Button/Button";
import Card from "../../../components/Card/Card";
import HorizontalList from "../../../components/HorizontalList/HorizontalList";
import Input from "../../../components/Input/Input";
import ServiceCard from "../../../components/ServiceCard/ServiceCard";
import SparePartsCard from "../../../components/SparePartsCard/SparePartsCard";
import VechileCard from "../../../components/VechileCard/VehcileCard";
import Colors from "../../../config/colors/Colors";
import CommonStyles from "../../../config/styles/styles";
import { Services } from "../Services/DummyServices";
import { SpareParts } from "../SpareParts/DummyDate";

const Home = ({ navigation }) => {
  const [search, setSearch] = useState("");
  const searchService = (text) => {
    console.log("Text Is " + text);
  };
  return (
    <View style={[CommonStyles.container, { justifyContent: "space-between" }]}>
      <View style={styles.headerView}>
        <KeyboardAvoidingView behavior="position">
          <Input
            borderColor={Colors.white}
            textColor={Colors.white}
            value={search}
            onChangeText={(text) => {
              searchService(text);
            }}
            placeholder="Search Any Service..."
            title={"Search"}
          />
        </KeyboardAvoidingView>
      </View>
      <View style={styles.body}>
        <View style={styles.containerView}>
          <View style={styles.rowHolder}>
            <Text style={styles.categoryLabel}>Services</Text>
            <TouchableOpacity
              onPress={() => {
                navigation.navigate("Services");
              }}
            >
              <Text style={styles.viewAllLabel}>View All</Text>
            </TouchableOpacity>
          </View>
          <HorizontalList
            Data={Services}
            renderItem={({ item }) => {
              return (
                <View style={{ paddingHorizontal: hp("2%") }}>
                  <ServiceCard
                    image={item.image}
                    name={item.name}
                    onPress={() => {
                      navigation.navigate("RequestService", {
                        name: item.name,
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
        <View style={styles.containerView}>
          <View style={styles.rowHolder}>
            <Text style={styles.categoryLabel}>Spare Parts</Text>
            <TouchableOpacity
              onPress={() => {
                navigation.navigate("SpareParts");
              }}
            >
              <Text style={styles.viewAllLabel}>View All</Text>
            </TouchableOpacity>
          </View>
          <HorizontalList
            Data={SpareParts}
            renderItem={({ item }) => {
              return (
                <View style={{ paddingHorizontal: hp("2%") }}>
                  <SparePartsCard
                    name={item.name}
                    image={item.image}
                    PriceOne={item.orignalPrice}
                    PriceTwo={item.discountPrice}
                    onPress={() => {
                      navigation.navigate("RequestSparePart", {
                        name: item.name,
                        price: item.discountPrice,
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
      </View>
    </View>
  );
};

export default Home;

const styles = StyleSheet.create({
  headerView: {
    padding: hp("1%"),
    // height: hp('25%'),
    flex: 0.2,
    backgroundColor: Colors.deepBlue,
    justifyContent: "center",
    borderBottomStartRadius: 25,
    borderBottomEndRadius: 25,
  },
  body: {
    // height: hp('75%'),
    borderRadius: 30,
    flex: 0.8,
    backgroundColor: Colors.white,
    justifyContent: "center",
  },
  headTitle: {
    marginHorizontal: wp("5%"),
    fontSize: 26,
    color: Colors.white,
    fontWeight: "700",
  },
  categoryLabel: {
    marginHorizontal: hp("3%"),
    fontSize: 18,
    color: Colors.deepBlue,
    fontWeight: "bold",
  },
  viewAllLabel: {
    margin: hp("1%"),
    fontSize: 14,
    color: Colors.red,
    fontWeight: "bold",
  },
  rowHolder: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingVertical: hp("1%"),
    paddingHorizontal: wp("2%"),
  },
  containerView: {
    height: hp("33%"),
    marginVertical: hp("1%"),
    justifyContent: "center",
  },
});
