import React, { useState } from "react";
import { View, Text, FlatList, Image, StyleSheet } from "react-native";
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from "react-native-responsive-screen";
import Button from "../../../components/Button/Button";
import Card from "../../../components/Card/Card";
import { Spacer } from "../../../components/Spacer/Spacer";
import Colors from "../../../config/colors/Colors";
const VehicleReq = () => {
  const [requests, setRequests] = useState([
    {
      id: "1",
      vehicle: "Honda Civic",
      model: "Sedan",
      year: "2022",
      price: "20000",
      description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit.",
      image:
        "https://img.freepik.com/free-photo/red-luxury-sedan-road_114579-5079.jpg?size=626&ext=jpg&uid=R94214209&ga=GA1.1.1081558094.1677063520&semt=ais",
    },
    {
      id: "2",
      vehicle: "Toyota Corolla",
      model: "Sedan",
      year: "2021",
      price: "18000",
      description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit.",
      image:
        "https://img.freepik.com/free-photo/blue-sport-sedan-parked-yard_114579-5078.jpg?size=626&ext=jpg&uid=R94214209&ga=GA1.1.1081558094.1677063520&semt=ais",
    },
    {
      id: "3",
      vehicle: "Ford F-150",
      model: "Pickup Truck",
      year: "2020",
      price: "25000",
      description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit.",
      image:
        "https://img.freepik.com/free-photo/yellow-sport-car-with-black-autotuning-road_114579-5051.jpg?size=626&ext=jpg&uid=R94214209&ga=GA1.1.1081558094.1677063520&semt=ais",
    },
  ]);
  const renderItem = ({ item }) => (
    <View
      style={{
        margin: hp("1"),
      }}
    >
      <Card>
        <View
          style={{
            flexDirection: "row",
            width: wp("90"),
          }}
        >
          <View
            style={{
              alignItems: "center",
              justifyContent: "center",
              width: wp("30"),
            }}
          >
            <Image
              source={{ uri: item.image }}
              style={{
                height: hp("15"),
                width: wp("30"),
                // resizeMode:'contain'
              }}
            />
          </View>
          <View
            style={{
              margin: hp("1"),
              width: wp("70"),
            }}
          >
            <Text
              style={{
                fontSize: hp("2.3"),
                fontWeight: "700",
              }}
            >
              {item.vehicle}
            </Text>
            <Text style={styles.text}>Model: {item.model}</Text>
            <Text style={styles.text}>Year: {item.year}</Text>
            <Text style={styles.text}>Price: {item.price}</Text>
            <Text style={styles.text}>{item.description}</Text>
          </View>
        </View>
        <View
        style={{
          flexDirection:'row',
          alignItems:'center',
          alignSelf:'center',
          justifyContent:'space-between',
          width:wp('55'),
          marginTop:hp('2')

        }}
        >
          <Button title='Approve' width={wp('25')} height={hp('5')} />
          <Button title='Reject' width={wp('25')} height={hp('5')} />
        </View>
      </Card>
    </View>
  );

  return (
    <View
      style={{
        backgroundColor: Colors.white,
        flex: 1,
      }}
    >
      <View
        style={{
          padding: hp("1"),
        }}
      >
        <FlatList
          data={requests}
          showsVerticalScrollIndicator={false}
          renderItem={renderItem}
          keyExtractor={(item) => item.id}
        />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  text: {
    fontSize: hp("2"),
    fontWeight: "500",
  },
});
export default VehicleReq;
