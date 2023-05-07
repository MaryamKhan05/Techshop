import React, { useState, useEffect } from "react";

import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  KeyboardAvoidingView,
  Image,
  ScrollView,
  ActivityIndicator,
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
import { collection, getDocs } from "firebase/firestore";
import { db } from "../../../../firebase.config";

const Home = ({ navigation }) => {
  const [search, setSearch] = useState("");
  const [data, setData] = useState([]);
  const [filterServiceData, setFilterServiceData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [parts, setParts]= useState([])
  useEffect(() => {
    const getServices = async () => {
      // const d = [];

      const dbRef = collection(db, "Services");
      const querySnapshot = await getDocs(dbRef);
      const d = querySnapshot.docs.map((doc) => doc.data());

      setData(d);
      setFilterServiceData(d);
      setTimeout(() => {
        setLoading(false);
      }, 1500);
    };

    getServices();
  }, []);

  useEffect(() => {
    const getServices = async () => {
      const d = [];

      const dbRef = collection(db, "SpareParts");
      const querySnapshot = await getDocs(dbRef);

      querySnapshot.forEach((doc) => {
        d.push(doc.data());
      });

      setParts(d);
    };

    getServices();
  }, []);
  //   const searchService = (text) => {
  //     if(!text){
  // setFilterServiceData(data)
  // setSearch(text)
  //     }
  //     else {

  //       const filtering= filterServiceData.filter((item)=>{
  //         const name= item.serviceName.toLocaleLowerCase()
  //         if(name.includes(text.toLocaleLowerCase())){
  //           return item.name
  //         }
  //       })
  //       setFilterServiceData(filtering)
  //       setSearch(filtering)
  //     }

  //   };
  const searchService = (text) => {
    if (text == "") {
      setFilterServiceData(data);
      setSearch(text);
    } else if (text) {
      const filteringData = data.filter((item) => {
        const data = item.serviceName.toLowerCase();
        const entry = text;
        if (data.includes(entry)) {
          return item.serviceName;
        }
      });
      setFilterServiceData(filteringData);

      setSearch(filteringData.length > 0 ? filteringData[0].serviceName : "");
    }
  };
  return (
    <View style={[CommonStyles.container, { justifyContent: "space-between" }]}>
      <View style={styles.headerView}>
        <Input
          borderColor={Colors.white}
          textColor={Colors.white}
          value={search}
          onChangeText={(text) => searchService(text.toLowerCase())}
          placeholder="Search Any Service..."
          title={"Search"}
        />
      </View>
      <View style={styles.body}>
        <KeyboardAvoidingView style={{ flex: 1 }} behavior="position">
          {loading && (
            <ActivityIndicator
              size={"small"}
              style={{ alignSelf: "center" }}
              color={Colors.deepBlue}
            />
          )}
          {!loading && (
            <ScrollView>
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
                {filterServiceData.length > 0 ? (
                  <HorizontalList
                    Data={filterServiceData}
                    renderItem={({ item }) => {
                      return (
                        <View style={{ paddingHorizontal: hp("2%") }}>
                          <ServiceCard
                            // flexdirection={true}

                            image={item.image}
                            name={item.serviceName}
                            desc={item.serviceDescription}
                            onPressSchedule={() => {
                              navigation.navigate("RequestService", {
                                name: item.serviceName,
                                charges: item.serviceCharges,
                                reuqestCategory: item.serviceName,
                              });
                            }}
                            onPressQuick={() => {
                              navigation.navigate("RequestQuickService", {
                                name: item.serviceName,
                                charges: item.serviceCharges,
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
                ) : (
                  <Text
                    style={[
                      styles.viewAllLabel,
                      { alignSelf: "center", fontSize: 16 },
                    ]}
                  >
                    No Services Match Your Search
                  </Text>
                )}
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
                  Data={parts}
                  renderItem={({ item }) => {
                    return (
                      <View style={{ paddingHorizontal: hp("2%") }}>
                        <SparePartsCard
                          name={item.serviceName}
                          // image={item.image}
                          desc={item.serviceDescription}
                          price={item.servicePrice}
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
                  keyExtractor={(item, index) => {
                    return index.toString();
                  }}
                />
              </View>
            </ScrollView>
          )}
        </KeyboardAvoidingView>
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
    height: hp("35%"),
    marginVertical: hp("1%"),
    justifyContent: "center",
  },
});
