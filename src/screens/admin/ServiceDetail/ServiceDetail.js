import React from "react";
import { View, Text, Image, StyleSheet } from "react-native";
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from "react-native-responsive-screen";
import { SafeAreaView } from "react-native-safe-area-context";
import Button from "../../../components/Button/Button";
import Card from "../../../components/Card/Card";
import Colors from "../../../config/colors/Colors";
import { Spacer } from "../../../components/Spacer/Spacer";
const Detail = ({ route }) => {
  const { name, customer, time, address, desc, image } = route.params;
  return (
    <SafeAreaView
      style={{
        backgroundColor:Colors.white,
        flex: 1,
        alignItems: "center",
      }}
    >
      <Text
        style={{
          fontSize: hp("2.5"),
          fontWeight: "700",
          color: Colors.black,
          textAlign: "center",
        }}
      >
        Customer Details
      </Text>
      {/* <Image source={{uri:image}} style={{height:hp('10'), width:wp('10')}}/> */}
      <View
        style={{
          marginTop: hp("2"),
          width: wp("90%"),
          alignItems: "center",
        }}
      >
        <Card>
          <View
            style={{
              // paddingHorizontal: hp("3"),
              // paddingVertical: hp("1"),
              width: wp("90%"),
            }}
          >
            <View
              style={{
                flexDirection: "row",
                justifyContent: "space-between",
              }}
            >
              <Text
                style={[styles.text, { fontWeight: "500", fontSize: hp("2") }]}
              >
                {customer}
              </Text>
              <Text
                style={[
                  styles.text,
                  {
                    color: "gray",
                    // backgroundColor:'red'
                  },
                ]}
              >
                {" "}
                {time}
              </Text>
            </View>
            <Text style={[styles.text, { width: wp("80%") }]}>
              {" "}
              Address: {address}
            </Text>
            <Text style={[styles.text, { width: wp("80%") }]}>
              {" "}
              Desc: {desc}
            </Text>
            <Spacer/>

            <View
              style={{
                flexDirection: "row",
                width:wp('85'),
                // backgroundColor:'pink',
                justifyContent: "space-between",
                alignItems: "center",
                alignSelf: "center",
              }}
            >
              <Button title="Accept" width={wp("40")} height={hp("5")} />

              <Button title="Reject" width={wp("40")} height={hp("5")} />
            </View>
          </View>
        </Card>
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  text: {
    fontSize: hp("1.8"),
    fontWeight: "400",
    margin: hp("1"),
    color: Colors.deepBlue,
    // backgroundColor:'red',
    // width: wp("70%"),
  },
});

export default Detail;
