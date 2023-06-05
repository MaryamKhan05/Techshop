import Button from "../Button/Button";
import Card from "../Card/Card";

import React from "react";
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from "react-native-responsive-screen";
import { View, Text, TouchableOpacity, Image } from "react-native";
import Colors from "../../config/colors/Colors";

const ServiceCard = ({
  name,
  onPressSchedule,
  onPressQuick,
  image,
  height,
  width,
  flexdirection,
  desc,
}) => {
  return (
    <Card>
      <View
        style={{
          paddingHorizontal: wp("1%"),
          width: width ? width : wp("85%"),
          height: height ? height : hp("20%"),
          paddingVertical: hp("1%"),
          flexDirection: height ? "column" : flexdirection ? "row" : "column",
          justifyContent: "space-between",
        }}
      >
        <View
          style={{
            flexDirection: height ? "column" : "row",
            alignItems: "center",
          }}
        >
          <View
            style={{
              width: wp("30%"),
              marginHorizontal: hp("1%"),
              justifyContent: "center",
              alignSelf: "center",
              alignItems: "center",
            }}
          >
            <Image
              source={{ uri: image }}
              style={{
                height: hp("10%"),
                width: wp("20%"),
                borderRadius: 9999,
              }}
              resizeMode="contain"
            />
          </View>
          <View>
            <Text
              style={{ color: Colors.black, fontSize: 18, fontWeight: "bold" }}
            >
              {name}
            </Text>
            <Text
              style={{
                color: Colors.deepBlue,
                fontSize: 14,
                fontWeight: "300",
                textAlign: "center",
              }}
            >
              {desc}
              {/* hello */}
            </Text>
          </View>
        </View>
        <View
          style={{
            width: width ? wp("40%") : wp("50%"),
            height: height ? hp("10%") : hp("10%"),
            alignSelf: "center",
            justifyContent: "space-evenly",
            alignItems: "center",
          }}
        >
          <View
            style={{
              flexDirection: height ? "column" : "row",
              justifyContent: "space-evenly",
              width: wp("90%"),
            }}
          >
            <View style={{ marginVertical: hp("2%") }}>
              <Button
                onPress={onPressSchedule}
                title="Scehedule Service"
                height={hp("5%")}
                textSize={16}
                borderRadius={30}
                width={wp("40%")}
              />
            </View>
            <View style={{ marginVertical: hp("2%") }}>
              <Button
                onPress={onPressQuick}
                title="Quick Service"
                height={hp("5%")}
                textSize={16}
                borderRadius={30}
                width={wp("40%")}
              />
            </View>
          </View>
        </View>
      </View>
    </Card>
  );
};
export default ServiceCard;
