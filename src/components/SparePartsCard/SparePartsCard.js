import Button from "../Button/Button";
import Card from "../Card/Card";

import React from "react";
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from "react-native-responsive-screen";
import { View, Text, Image } from "react-native";
import Colors from "../../config/colors/Colors";

const SparePartsCard = ({
  image,
  name,
  desc,
  price,
  onPress,
  height,
  width,
}) => {
  return (
    <Card>
      <View
        style={{
          paddingHorizontal: wp("1%"),
          width: width ? width : wp("85%"),
          height: height ? height : hp("15%"),
          paddingVertical: hp("1%"),
          flexDirection: height ? "column" : "row",
          justifyContent: "space-between",
        }}
      >
        <View
          style={{
            width: wp("30%"),
            justifyContent: "center",
            alignSelf: "center",
            alignItems: "center",
          }}
        >
          <Image
            source={{ uri: image }}
            style={{
              height: height ? hp("12%") : hp("10%"),
              width: width ? wp("30%") : wp("20%"),
              borderRadius: 10,
            }}
            resizeMode="contain"
          />
        </View>
        <View
          style={{
            width: width ? wp("40%") : wp("50%"),
            height: height ? hp("15%") : hp("15%"),
            alignSelf: "center",
            justifyContent: "space-evenly",
            alignItems: "center",
          }}
        >
          <Text
            style={{
              color: Colors.black,
              fontSize: 20,
              fontWeight: "bold",
              alignSelf: "center",
            }}
          >
            {name}
          </Text>
          <View
            style={{
              flexDirection: "row",
              justifyContent: "space-between",
              width: wp("50%"),
            }}
          >
            <Text
              style={{
                color: Colors.deepBlue,
                fontSize: 14,
                fontWeight: "bold",
              }}
            >
              Description:
            </Text>
            <Text
              style={{ color: Colors.black, fontSize: 16, fontWeight: "bold" }}
            >
              {desc}
            </Text>
          </View>
          <View
            style={{
              flexDirection: "row",
              justifyContent: "space-between",
              width: wp("50%"),
            }}
          >
            <Text
              style={{
                color: Colors.deepBlue,
                fontSize: 14,
                fontWeight: "bold",
              }}
            >
              Price :
            </Text>
            <Text
              style={{ color: Colors.black, fontSize: 16, fontWeight: "bold" }}
            >
              {price}
            </Text>
          </View>
          <View style={{ alignSelf: "center" }}>
            <Button
              onPress={onPress}
              title="Buy"
              height={hp("5%")}
              textSize={14}
              borderRadius={10}
              width={wp("40%")}
            />
          </View>
        </View>
      </View>
    </Card>
  );
};
export default SparePartsCard;
