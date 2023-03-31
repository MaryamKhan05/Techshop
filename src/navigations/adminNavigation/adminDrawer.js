import React from "react";
import { TouchableOpacity, StyleSheet, View, Image } from "react-native";
import { createDrawerNavigator } from "@react-navigation/drawer";
import Entypo from "react-native-vector-icons/Entypo";

import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from "react-native-responsive-screen";
import Home from "../../screens/admin/Home/Home";

import VehicleReq from "../../screens/admin/VehicleReq/VehicleReq";

import Services from "../../screens/admin/Services/Services";
import SparePartsReq from "../../screens/admin/SparePartsReq/SparePartsReq";
import AddService from "../../screens/admin/Services/AddServices";
import Colors from "../../config/colors/Colors";
const Drawer = createDrawerNavigator();
const size = hp("2.5");
const color = Colors.deepBlue;
const AdminDrawer = ({ navigation }) => {
  return (
    <Drawer.Navigator
      initialRouteName="Feed"
      screenOptions={({ navigation }) => ({
        headerLeft: () => (
          <Entypo
            name="menu"
            size={hp("3")}
            color={color}
            style={{ marginLeft: 10 }}
            onPress={navigation.toggleDrawer}
          />
        ),
        drawerActiveBackgroundColor: Colors.deepBlue,
        drawerActiveTintColor: Colors.white,
      })}
    >
      <Drawer.Screen
        name="Home"
        component={Home}
        // options={{
        //   drawerIcon: ({ focused, size }) => (
        //     <AntDesign name="home" size={size} color={color} />
        //   ),
        //   headerTitle: () => (
        //     <Image
        //       source={require("./../../../assets/logo.jpg")}
        //       style={{
        //         height: hp("5"),
        //         width: wp("22"),
        //         alignSelf: "center",
        //         resizeMode: "contain",
        //       }}
        //     />
        //   ),
        //   headerTitleAlign: "center",
        //   headerRight: () => [
        //     <View style={styles.icon}>
        //       <TouchableOpacity
        //         onPress={() => navigation.navigate("Notification")}
        //       >
        //         <Bubble
        //           icon={<FontAwesome name="bell-o" size={size} color={color} />}
        //         />
        //       </TouchableOpacity>
        //       <TouchableOpacity onPress={() => navigation.navigate("Search")}>
        //         <Bubble
        //           icon={
        //             <Ionicons name="search-outline" size={size} color={color} />
        //           }
        //         />
        //       </TouchableOpacity>
        //     </View>,
        //   ],
        // }}
      />
      <Drawer.Screen
        name="Vehicle"
        component={VehicleReq}
        // options={{
        //   drawerIcon: ({ focused, size }) => (
        //     <Ionicons name="library" size={size} color={color} />
        //   ),
        //   headerTitle: () => (
        //     <Image
        //       source={require("./../../../assets/logo.jpg")}
        //       style={{
        //         height: hp("5%"),
        //         width: wp("20%"),
        //         alignSelf: "center",
        //       }}
        //       resizeMode="contain"
        //     />
        //   ),
        //   headerTitleAlign: "center",
        //   headerRight: () => [
        //     <View style={styles.icon}>
        //       <TouchableOpacity
        //         onPress={() => navigation.navigate("Notification")}
        //       >
        //         <Bubble
        //           icon={<FontAwesome name="bell-o" size={size} color={color} />}
        //         />
        //       </TouchableOpacity>
        //       <TouchableOpacity onPress={() => navigation.navigate("Search")}>
        //         <Bubble
        //           icon={
        //             <Ionicons name="search-outline" size={size} color={color} />
        //           }
        //         />
        //       </TouchableOpacity>
        //     </View>,
        //   ],
        // }}
      />
      <Drawer.Screen
        name="Services"
        component={Services}
        // options={{
        //   drawerIcon: ({ focused, size }) => (
        //     <Ionicons name="library" size={size} color={color} />
        //   ),
        //   headerTitle: () => (
        //     <Image
        //       source={require("./../../../assets/logo.jpg")}
        //       style={{
        //         height: hp("5%"),
        //         width: wp("20%"),
        //         alignSelf: "center",
        //       }}
        //       resizeMode="contain"
        //     />
        //   ),
        //   headerTitleAlign: "center",
        //   headerRight: () => [
        //     <View style={styles.icon}>
        //       <TouchableOpacity
        //         onPress={() => navigation.navigate("Notification")}
        //       >
        //         <Bubble
        //           icon={<FontAwesome name="bell-o" size={size} color={color} />}
        //         />
        //       </TouchableOpacity>
        //       <TouchableOpacity onPress={() => navigation.navigate("Search")}>
        //         <Bubble
        //           icon={
        //             <Ionicons name="search-outline" size={size} color={color} />
        //           }
        //         />
        //       </TouchableOpacity>
        //     </View>,
        //   ],
        // }}
      />
      <Drawer.Screen
        name="Spare Parts"
        component={SparePartsReq}
        // options={{
        //   drawerIcon: ({ focused, size }) => (
        //     <Ionicons name="library" size={size} color={color} />
        //   ),
        //   headerTitle: () => (
        //     <Image
        //       source={require("./../../../assets/logo.jpg")}
        //       style={{
        //         height: hp("5%"),
        //         width: wp("20%"),
        //         alignSelf: "center",
        //       }}
        //       resizeMode="contain"
        //     />
        //   ),
        //   headerTitleAlign: "center",
        //   headerRight: () => [
        //     <View style={styles.icon}>
        //       <TouchableOpacity
        //         onPress={() => navigation.navigate("Notification")}
        //       >
        //         <Bubble
        //           icon={<FontAwesome name="bell-o" size={size} color={color} />}
        //         />
        //       </TouchableOpacity>
        //       <TouchableOpacity onPress={() => navigation.navigate("Search")}>
        //         <Bubble
        //           icon={
        //             <Ionicons name="search-outline" size={size} color={color} />
        //           }
        //         />
        //       </TouchableOpacity>
        //     </View>,
        //   ],
        // }}
      />
    </Drawer.Navigator>
  );
};
const styles = StyleSheet.create({
  icon: {
    flexDirection: "row",
    marginRight: hp(1),
  },
});

export default AdminDrawer;
