import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  ActivityIndicator,
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

const SpareParts = ({ navigation }) => {
  const [search, setSearch] = useState("");
  const [parts, setParts] = useState([]);
  const[loading,setloading]=useState(true)
  const searchService = (text) => {
    console.log("text recieved", text);
  };

//   useEffect(() => {
//     const getParts = async () => {
//       const d = [];
//       const dbRef = collection(db, SpareParts);
//       const querySnapshot = await getDocs(dbRef);
//       querySnapshot.forEach((doc) => {
//         d.push(doc.data());
//       });
//       setParts(d);
//       console.log('parts are', parts)
//     };
//     getParts();
//   }, []);
useEffect(() => {
    const getServices = async () => {
      const d = [];

      const dbRef = collection(db, "SpareParts");
      const querySnapshot = await getDocs(dbRef);

      querySnapshot.forEach((doc) => {
        d.push(doc.data());
      });

      setParts(d);
      setloading(false)
      console.log(d)
    };

    getServices();
  }, []);
  return (
    <View style={CommonStyles.container}>
      <View style={styles.headerView}>
        <KeyboardAvoidingView behavior="position">
          <Input
            borderColor={Colors.white}
            textColor={Colors.white}
            value={search}
            onChangeText={(text) => {
              searchService(text);
            }}
            placeholder="Search Any Spare Parts..."
            title={"Search"}
          />
        </KeyboardAvoidingView>
      </View>
     {loading && <View>
<ActivityIndicator
size={'small'}
style={{alignSelf:'center'}}
color={Colors.deepBlue}
/>
      </View>}
     {!loading && <View style={styles.body}>
       {loading?
       <ActivityIndicator
       size={'small'}
       style={{alignSelf:'center'}}
       color={Colors.deepBlue}
       />
       : <VerticalList
          numColumns={1}
          Data={parts}
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
          keyExtractor={(item,index) => {
            return index.toString();
          }}
        />}
      </View>}
    </View>
  );
};

export default SpareParts;

const styles = StyleSheet.create({
  headerView: {
    padding: hp("1%"),
    // height: hp('25%'),
    flex: 0.2,
    justifyContent: "center",
    backgroundColor: Colors.deepBlue,
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
