import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  KeyboardAvoidingView,
} from "react-native";
import Input from "../../../components/Input/Input";
import SparePartsCard from "../../../components/SparePartsCard/SparePartsCard";
import VerticalList from "../../../components/VerticalList/VerticalList";
import CommonStyles from "../../../config/styles/styles";
// import { SpareParts as parts } from "./DummyDate";
import { getDocs, collection } from "firebase/firestore";
import { db } from "../../../../firebase.config";
import {
  heightPercentageToDP as hp,
  widthPercentageToDP as wp,
} from "react-native-responsive-screen";
import Colors from "../../../config/colors/Colors";
import { ActivityIndicator } from "react-native";
const SpareParts = ({ navigation }) => {
  const [search, setSearch] = useState("");
  const [parts, setParts] = useState([]);
  const [loading, setloading] = useState(true);
  const [filteredParts, setFilteredParts] = useState(parts);
  // const searchService = (text) => {
  //   // console.log("text recieved", text);
  // };

  useEffect(() => {
    const getServices = async () => {
      const d = [];

      const dbRef = collection(db, "SpareParts");
      const querySnapshot = await getDocs(dbRef);

      querySnapshot.forEach((doc) => {
        d.push(doc.data());
      });

      setParts(d);
      setloading(false);
      console.log(d);
    };

    getServices();
  }, []);
  const searchService = (text) => {
    setSearch(text);
    if (text === "") {
      setFilteredParts(parts); // Show all parts
    } else {
      const filtered = parts.filter((part) =>
        part.serviceName.toLowerCase().includes(text.toLowerCase())
      );
      setFilteredParts(filtered);
    }
  };
  // if (loading) {
  //   return (
  //     <ActivityIndicator
  //       size={"small"}
  //       style={{ alignSelf: "center" }}
  //       color={Colors.deepBlue}
  //     />
  //   );
  // }

  return (
    <View style={CommonStyles.container}>
      <View style={styles.headerView}>
        <KeyboardAvoidingView behavior="position">
          <Input
            borderColor={Colors.deepBlue}
            textColor={Colors.deepBlue}
            value={search}
            onChangeText={(text) => {
              searchService(text);
            }}
            placeholder="Search Any Service..."
            title={"Search"}
          />
        </KeyboardAvoidingView>
      </View>
      {loading ? (
        <ActivityIndicator
          size={"small"}
          style={{ alignSelf: "center" }}
          color={Colors.deepBlue}
        />
      ) : (
        <View style={styles.body}>
          {/* {filteredParts.length === 0 ? (
              <Text
                style={[styles.viewAllLabel, { alignSelf: "center", fontSize: 16 }]}
              >
                No Services Match Your Search
              </Text>
            ) : ( */}
          <VerticalList
            numColumns={1}
            // Data={parts}
            Data={filteredParts}
            renderItem={({ item }) => {
              return (
                <View
                  style={{
                    paddingVertical: hp("2%"),
                    paddingHorizontal: hp("1%"),
                  }}
                >
                  <SparePartsCard
                    height={hp("30%")}
                    width={wp("85%")}
                    name={item.serviceName}
                    image={item.image}
                    price={item.servicePrice}
                    desc={item.serviceDescription}
                    onPress={() => {
                      navigation.navigate("RequestSparePart", {
                        name: item.serviceName,
                        price: item.servicePrice,
                      });
                    }}
                  />
                </View>
              );
            }}
            keyExtractor={(item) => {
              item.id;
            }}
          />
          {/* ) */}
          {/* } */}
        </View>
      )}
    </View>
  );
};

export default SpareParts;

const styles = StyleSheet.create({
  headerView: {
    // padding: hp("1%"),
    // // height: hp('25%'),
    // flex: 0.2,
    // justifyContent: "center",
    // backgroundColor: Colors.deepBlue,
    padding: hp("1%"),
    flex: 0.2,
    backgroundColor: "white",
    justifyContent: "center",
    borderBottomStartRadius: 60,
  },
  body: {
    borderRadius: 30,
    flex: 0.8,
    backgroundColor: Colors.white,
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
