import { useNavigation } from "@react-navigation/native";
import React from "react";
import { View, Text, TouchableOpacity, StyleSheet } from "react-native";
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from "react-native-responsive-screen";
import Ionicons from "react-native-vector-icons/Ionicons";
const Header = ({ headerTitle }) => {
  const navigation = useNavigation();
  return (
    <View
      style={{
        flexDirection: "row",
        alignItems: "center",
        margin: hp("1.5"),
        marginHorizontal: hp("2"),
      }}
    >
      <TouchableOpacity onPress={() => navigation.goBack()}>
        <Ionicons name="arrow-back" size={hp("3")} />
      </TouchableOpacity>
      <View
        style={{
          alignSelf: "center",
          flex: 1,
        }}
      >
        <Text
          style={{
            fontSize: hp("2.5"),
            fontWeight: "700",
            textAlign: "center",
            marginHorizontal: hp("10"),
          }}
        >
          {headerTitle}
        </Text>
      </View>
    </View>
  );
};
export default Header;
