import React, { useState } from "react";
import { View, Text, ScrollView, StyleSheet } from "react-native";
import Input from "../../../components/Input/Input";
import {
  heightPercentageToDP as hp,
  widthPercentageToDP as wp,
} from "react-native-responsive-screen";
import Button from "../../../components/Button/Button";
import Colors from "../../../config/colors/Colors";
import { addDoc, collection } from "firebase/firestore";
import { db,auth } from "../../../../firebase.config";
import { ToastAndroid } from "react-native";

const RequestSparePart = ({ navigation, route }) => {
  const { name, price } = route.params;
  const [loading, setLoading] = useState(false);
  const [sparePartName, setSparePartName] = useState(name);
  const [requestCategory, setRequestCategory] = useState("");
  const [customerName, setCustomerName] = useState("Hammad");
  const [customerAddress, setCustomerAddress] = useState(
    "Farooq Coorperation Murree Road Shamsabad  Rawalpindi"
  );
  const [DeliveryCharges, setDeliveryCharges] = useState("Rs 300");
  const [TotalBill, setTotalBill] = useState("Rs 20300");
  const [modal, setModal] = useState("");
  const [modalYear, setModalYear] = useState("");
  const [company, setCompany] = useState("");
  const clearForm = () => {
    navigation.goBack();
  };

  const PostRequest = async () => {
    setLoading(true);
    const dbref = collection(db, "SparePartReq");
    addDoc(dbref, {
      sparePartName,
      customerId: auth.currentUser.uid,
      customerAddress,
      customerName,
      companyName: company,
      modalYear,
      date: new Date().toDateString(),
      status:'pending',
      modalName: modal ? modal : "",
      status: "pending",
      requestCategory: sparePartName,
    })
      .then(() => {
        setLoading(false);
        ToastAndroid.show("Service Request Posted", ToastAndroid.SHORT);
        clearForm();
      })
      .catch((err) => {
        setLoading(false);
        console.log(err);
      });
    // }
    setLoading(false);
  };

  return (
    <View
      style={{
        flex: 1,
        justifyContent: "space-between",
        paddingBottom: hp("2%"),
      }}
    >
      <View style={{ height: hp("7%"), justifyContent: "center" }}>
        <Text style={styles.title}>Spare Part Request</Text>
      </View>
      <View>
        <ScrollView
          style={{ height: hp("75%") }}
          contentContainerStyle={{ paddingBottom: hp("8%") }}
        >
          <View style={styles.inputView}>
            <Input value={sparePartName} title="Spare Part Name" disabled />
          </View>
          <View style={styles.inputView}>
            <Input value={customerName} title="Customer Name" disabled />
          </View>
          <View style={styles.inputView}>
            <Input
              value={customerAddress}
              title="Customer Address"
              onChangeText={(text) => {
                setCustomerAddress(text);
              }}
            />
          </View>
          <View style={styles.inputView}>
            <Input
              value={company}
              title="Company"
              placeholder={"Enter Name Of Vechile Company i.e. Honda"}
              onChangeText={(text) => {
                setCompany(text);
              }}
            />
          </View>
          <View style={styles.inputView}>
            <Input
              value={modal}
              title="Modal Name (Optional)"
              placeholder={"Enter Modal Name i.e Civic Reborn "}
              onChangeText={(text) => {
                setModal(text);
              }}
            />
          </View>
          <View style={styles.inputView}>
            <Input
              value={modalYear}
              placeholder={"Enter The Modal Year"}
              title="Modal Year"
              onChangeText={(text) => {
                setModalYear(text);
              }}
            />
          </View>
          <View style={styles.inputView}>
            <Input value={price} title="Spare Part Price" disabled />
          </View>
          <View style={styles.inputView}>
            <Input value={DeliveryCharges} title="Delivery Charges" disabled />
          </View>
          <View style={styles.inputView}>
            <Input value={TotalBill} title="Total Payable Amount" disabled />
          </View>
        </ScrollView>
      </View>
      <View style={styles.buttonView}>
        <Button
          onPress={() => {
            PostRequest();
          }}
          title="Buy Now"
        />
      </View>
    </View>
  );
};

export default RequestSparePart;
const styles = StyleSheet.create({
  title: {
    fontSize: 26,
    color: Colors.black,
    alignSelf: "center",
  },
  inputView: {
    paddingVertical: hp("1%"),
  },
  buttonView: {
    borderTopWidth: 1,
    paddingBottom: hp("1%"),
    height: hp("10%"),
    justifyContent: "center",
  },
});
