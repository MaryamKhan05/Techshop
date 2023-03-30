import Button from "../Button/Button";
import Card from "../Card/Card";

import React from "react";
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from "react-native-responsive-screen";
import {
  View,
  Text,
  TouchableOpacity,
  Image,
  ImageBackground,
  StyleSheet,
} from "react-native";
import Colors from "../../config/colors/Colors";

const AdminServiceCard = ({
  service,
  customer,
  time,
  address,
  onPress,
  width,
  height,
  image,
}) => {
  return (
    <TouchableOpacity onPress={onPress}>
      <View
        style={{
          elevation: 10,
          // backgroundColor: Colors.white,
          shadowColor: Colors.deepBlue,
          alignSelf: "center",
          paddingHorizontal: wp("1%"),
          paddingVertical: hp("1%"),
          borderRadius: 20,
        }}
      >
        <ImageBackground source={{ uri: image }} style={styles.backgroundImage}>
          <View style={styles.overlay}>
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
                  width: width ? wp("40%") : wp("50%"),
                  height: height ? hp("10%") : hp("10%"),
                  alignSelf: "center",
                  justifyContent: "center",
                  alignItems: "center",
                }}
              >
                <Text
                  style={{
                    color: Colors.white,
                    fontSize: hp("3"),
                    fontWeight: "bold",
                  }}
                >
                  {service}
                </Text>
              </View>
            </View>
          </View>
        </ImageBackground>
      </View>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  backgroundImage: {
    // flex: 1,
    height: hp("20"),
    width: wp("50"),
    // resizeMode: "cover",
    borderRadius: 20,
    backgroundColor: "red",
  },
  overlay: {
    backgroundColor: "rgba(0, 0, 0, 0.3)",
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
});
export default AdminServiceCard;
