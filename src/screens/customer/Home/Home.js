import React, { useState ,useEffect} from "react";

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
import { collection, getDocs } from "firebase/firestore";
import { db } from "../../../../firebase.config";

const Home = ({ navigation }) => {
  const [search, setSearch] = useState("");
  const[data,setData]=useState([])
  const[filterServiceData,setFilterServiceData]=useState([])
  const searchService = (text) => {
    if(!text){
setFilterServiceData(data)
setSearch(text)
    }
    else {
    
      const filtering= filterServiceData.filter((item)=>{
        const name= item.serviceName.toLocaleLowerCase()
        if(name.includes(text)){
          return item.name
        }
      })
      setFilterServiceData(filtering)
      setSearch(filtering)
    }
  
   
  };
  useEffect(() => {
   

    const getServices = async () => {
      const d = [];
    
      const dbRef = collection(db, 'Services');
      const querySnapshot = await getDocs(dbRef);
    
      querySnapshot.forEach((doc) => {
        d.push(doc.data());
      });
    
      setData(d);
      setFilterServiceData(d)
    };

    getServices();
  }, []);
  return (
        <KeyboardAvoidingView style={{flex:1}} behavior="height">
    <View style={[CommonStyles.container, { justifyContent: "space-between" }]}>
      <View style={styles.headerView}>
          <Input
            borderColor={Colors.white}
            textColor={Colors.white}
            value={search}
            onChangeText={(text) => {
              
              searchService(text.toLocaleLowerCase());
            }}
            placeholder="Search Any Service..."
            title={"Search"}
          />
     
      </View>

      <View style={styles.body}>
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
                        reuqestCategory: item.reuqestCategory

                      });
                    }}
                    onPressQuick={() => {
                      navigation.navigate("RequestQuickService", {
                        name: item.serviceName,
                        charges: item.serviceCharges,
                        reuqestCategory: item.reuqestCategory

                      });
                    }}
                  />
                </View>
              );
            }}
            keyExtractor={(item) => {
              return item.image;
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
      </ScrollView>
      </View>
    </View>
      </KeyboardAvoidingView>
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
