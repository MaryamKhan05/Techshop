import React, { useEffect, useState } from "react";

import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  ActivityIndicator,
} from "react-native";
import CommonStyles from "../../../config/styles/styles";
import { collection, getDocs, query, where } from "firebase/firestore";
import { auth, db } from "../../../../firebase.config";
import VerticalList from "../../../components/VerticalList/VerticalList";
import Card from "../../../components/Card/Card";
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from "react-native-responsive-screen";
import Colors from "../../../config/colors/Colors";

const CustomerNotifications = ({ navigation }) => {
  const [notifications, setNotifications] = useState([]);
  const [loading, setLoading] = useState(true);
  const [readNotiIndex, setReadNotiIndex] = useState(null);
const [partNotifications, setPartNotifications]= useState([])




useEffect(() => {
  const getNotifications = async () => {
    const dbRef = collection(db, "SparePartNotification");
    const snapshot = await getDocs(dbRef);
    const notifications = snapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() }));
    setPartNotifications(notifications);
    // console.log('not are',setPartNotifications )
  };

  getNotifications();
}, []);

  useEffect(() => {
    const getUpdates = async () => {
      const dbRef = collection(db, "Notifications");

      const q = query(dbRef, where("customerId", "==", auth.currentUser.uid));
      const querySnapshot = await getDocs(q);
      const data = querySnapshot.docs.map((item) => item.data());
      const filteredData = data.filter((item) => {
        return item.status != "completed";
      });

      setNotifications(filteredData);
      setLoading(false);
    };
    getUpdates();
  }, []);
  return (
    <View style={[CommonStyles.container, { justifyContent: "flex-start" }]}>
      <Text
        style={[
          styles.notiText,
          { fontSize: 22, alignSelf: "center", margin: hp("2%") },
        ]}
      >
        My Schedule Alerts
      </Text>
      {loading ? (
        <ActivityIndicator
          size={"small"}
          color={Colors.deepBlue}
          style={{ alignSelf: "center" }}
        />
      ) : (
        <VerticalList
          Data={notifications}
          numColumns={1}
          renderItem={({ item, index }) => {
            return (
              <TouchableOpacity
                onPress={() => {
                  setReadNotiIndex(index);
                  navigation.navigate("ServiceDetails", {
                    item,
                  });
                }}
                style={[
                  styles.card,
                  {
                    backgroundColor:
                      item.readByCustomer == "read"
                        ? Colors.white
                        : index == readNotiIndex
                        ? Colors.white
                        : Colors.deepBlue,
                  },
                ]}
              >
                <Text
                  style={[
                    styles.notiText,
                    {
                      color:
                        item.readByCustomer == "read"
                          ? Colors.black
                          : index == readNotiIndex
                          ? Colors.black
                          : Colors.white,
                    },
                  ]}
                >
                  {" "}
                  You Have A {item.serviceName} Service
                </Text>
                <Text
                  style={[
                    styles.date,
                    {
                      color:
                        item.readByCustomer == "read"
                          ? Colors.black
                          : index == readNotiIndex
                          ? Colors.black
                          : Colors.white,
                    },
                  ]}
                >
                  {item.date} {item?.time}
                </Text>
              </TouchableOpacity>
            );
          }}
          keyExtractor={(item, index) => {
            return index.toString();
          }}
        />
      )}
    </View>

    // <View>
    //   {partNotifications.map((notification) => (
    //     <View key={notification.id}>
    //       <Text>{notification.message}</Text>
    //       {/* <Text>{notification.timestamp.toDate().toLocaleString()}</Text> */}
    //     </View>
    //   ))}
    // </View>
  );


  
};

const styles = StyleSheet.create({
  card: {
    width: wp("100%"),
    alignSelf: "center",
    paddingHorizontal: hp("2%"),
    height: hp("8%"),
    marginBottom: hp("1%"),
    elevation: 5,
  },
  notiText: {
    fontSize: 16,
  },
  date: {
    fontSize: 10,
    alignSelf: "flex-end",
  },
});
export default CustomerNotifications;
