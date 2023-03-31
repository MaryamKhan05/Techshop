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

const AdminSparePartCard = ({
  name,
  price,
  car,
  company,
  quantity,
  width,
  height,
  onPress,
  image,
}) => {
  return (
    <TouchableOpacity onPress={onPress}>
      <View
        style={{
          elevation: 10,
          backgroundColor: Colors.white,
          shadowColor: Colors.deepBlue,
          alignSelf: "center",
          borderRadius: 20,
        }}
      >
        <Image source={{ uri: image }} style={styles.backgroundImage} />
        <View
          style={{
            padding: hp("2"),
            alignItems: "center",
          }}
        >
          <Text
            style={{
              color: Colors.black,
              fontSize: hp("2"),
              fontWeight: "bold",
            }}
          >
            {name}
          </Text>
        </View>
      </View>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  backgroundImage: {
    height: hp("20"),
    width: wp("50"),
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
  },
});
export default AdminSparePartCard;
