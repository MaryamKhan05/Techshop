import React, { useState, useEffect } from "react";
import { View, Text, ActivityIndicator, TouchableOpacity } from 'react-native';
import CommonStyles from "../../../config/styles/styles";
import * as Location from 'expo-location';
import MapView, {Marker,Polyline} from 'react-native-maps'
import Colors from "../../../config/colors/Colors";
import { heightPercentageToDP as hp,widthPercentageToDP as wp} from "react-native-responsive-screen";

const mapStyle = [    {      elementType: 'geometry',      stylers: [        {          color: '#242f3e',        },      ],
},
{
  elementType: 'labels.text.fill',
  stylers: [
    {
      color: '#746855',
    },
  ],
},
{
  elementType: 'labels.text.stroke',
  stylers: [
    {
      color: '#242f3e',
    },
  ],
},
{
  featureType: 'administrative.locality',
  elementType: 'labels.text.fill',
  stylers: [
    {
      color: '#d59563',
    },
  ],
},
{
  featureType: 'poi',
  elementType: 'labels.text.fill',
  stylers: [
    {
      color: '#d59563',
    },
  ],
},
{
  featureType: 'poi.park',
  elementType: 'geometry',
  stylers: [
    {
      color: '#263c3f',
    },
  ],
},
// ... more style rules
];


const TechnicianMap = () => {
  const [location, setLocation] = useState(null);
  const [latitude, setLatitude] = useState(null);
  const [longitude, setLongitude] = useState(null);
  const [address, setAddress] = useState(null);
  const [coords, setCoords] = useState([]);
 
  useEffect(() => {
    const getLocationPermissions = async () => {
      const { status } = await Location.getForegroundPermissionsAsync();
      if (status !== 'granted') {
        const { status: newStatus } = await Location.requestForegroundPermissionsAsync();
        if (newStatus !== 'granted') {
          alert('Location Permissions denied');
          return;
        }
      }
      const currentPosition = await Location.getCurrentPositionAsync({});
      if(currentPosition)

     {
        setLatitude(currentPosition.coords.latitude)
        setLongitude(currentPosition.coords.longitude)
        const currentAddress = await Location.reverseGeocodeAsync({
        latitude:currentPosition.coords.latitude,
        longitude: currentPosition.coords.longitude});
      
        setLocation(currentPosition);
        setAddress(currentAddress);
    }

    };
    getLocationPermissions();
  }, []);
 const handleStartJourney=()=>{
  alert('Starting')
  const newCoords=[
    {
      latitude: latitude,
      longitude: longitude,
    },
    {
      latitude: 33.1517618,
      longitude:73.0916547
    },
  ]
  setCoords(newCoords)
 }

  return (
    <View style={[CommonStyles.container, { justifyContent: 'center' }]}>
     {!location && <ActivityIndicator style={{alignSelf:'center'}} color={Colors.deepBlue} size='small' />}
      {/* {location && <Text>Location Is: {JSON.stringify(location)}</Text>} */}
      {
    location &&
    <View style={[CommonStyles.container, { justifyContent: 'space-evenly' }]}>

     <MapView
     provider="google" // set the map provider
      customMapStyle={mapStyle} // set the custom map style
      showsUserLocation={true} // show the user's current location
      showsCompass={true} // show the compass
      showsTraffic={true} // show traffic information
      showsBuildings={true} // show 3D buildings
      zoomEnabled={true} // allow zooming
      scrollEnabled={true} 
     style={{ flex: 1 }}
     initialRegion={{
        latitude: latitude ,
        longitude: longitude,
        latitudeDelta: 0.0922,
        longitudeDelta: 0.0421,
      }}
     
     >
        <Marker
           coordinate={{
            latitude: latitude,
            longitude: longitude,
          }}
          onPress={()=>{alert('Marker Pressed')}}
          title={"ME"}
        />
        <Marker
        pinColor={Colors.lightBlue}
            coordinate={{
              latitude: 33.1517618,
              longitude:73.0916547,
            }}
            title={"User 2"}
          />
            <Polyline coordinates={coords}   strokeColor={Colors.white} // default color is black
        strokeWidth={3}

        lineDashPattern={[1, 2]} // [line, space]
        geodesic={true}  />

        </MapView>
        <TouchableOpacity 
        onPress={()=>{handleStartJourney()}}
        style={{height:hp('8%'),justifyContent:'center',width:wp('100%'),alignSelf:'center',backgroundColor:Colors.deepBlue}}>
  <Text style={{fontSize:20,alignSelf:'center',fontWeight:'bold',color:Colors.white}}>Start My Journey</Text>
</TouchableOpacity>
        </View>
      }
    </View>
  );
}

export default TechnicianMap;