import Button from "../Button/Button"
import Card from "../Card/Card"

import React from "react"
import {widthPercentageToDP as wp,heightPercentageToDP as hp} from 'react-native-responsive-screen'
import {View,Text,TouchableOpacity,Image} from 'react-native'
import Colors from "../../config/colors/Colors"



const TechnicianCard=(
    {
        serviceName,
        customerName,
        customerAdress,
        time,
        requestDate,
       width,
       height,
       onPress,
       customerContact,
       showButton

    }
)=>{
    return(
<Card>
    <View style={{paddingHorizontal: wp('1%'),width:width?width:wp('85%'),paddingVertical:hp('1%'),flexDirection:height?'column':'row',justifyContent:'space-between',alignItems:'center'}}>

   <View style={{justifyContent:'space-evenly',width: wp('75%')}}>
<View style={{flexDirection:'row',justifyContent:'center',padding: hp('1.5%')}}>
    <Text style={{color: Colors.black, fontSize: 20,textAlign:'center',fontWeight:'bold'}}>{serviceName} Request From {customerName}</Text>
    {/* <Text style={{color: Colors.black, fontSize: 16,fontWeight:'bold'}}>Service Name:</Text> */}
    
</View>

<View style={{flexDirection:'column',alignItems:'center',justifyContent:'space-between',padding: hp('1.5%')}}>
    <Text style={{color: Colors.black, fontSize: 16,fontWeight:'bold'}}>{customerName}'s Address:</Text>
    <Text style={{color: Colors.black, fontSize: 14,fontWeight:'bold',textAlign:'center'}}>{customerAdress}</Text>
</View>
<View style={{flexDirection:'column',alignItems:'center',justifyContent:'space-between',padding: hp('1.5%')}}>
    <Text style={{color: Colors.black, fontSize: 16,fontWeight:'bold'}}>{customerName}'s Contact</Text>
    <Text style={{color: Colors.black, fontSize: 14,fontWeight:'bold'}}>{customerContact}</Text>
</View>
<View style={{flexDirection:'column',alignItems:'center',justifyContent:'space-between',padding: hp('1.5%')}}>

    <Text style={{color: Colors.black, fontSize: 16,fontWeight:'bold'}}>Date</Text>
    <Text style={{color: Colors.black, fontSize: 14,fontWeight:'bold'}}>{requestDate}</Text>
</View>
<View style={{flexDirection:'column',alignItems:'center',justifyContent:'space-between',padding: hp('1.5%')}}>
    <Text style={{color: Colors.black, fontSize: 16,fontWeight:'bold',textAlign:'justify'}}>Time</Text>
    <Text style={{color: Colors.black, fontSize: 14,fontWeight:'bold',textAlign:'justify'}}>{time}</Text>
</View>

{showButton &&
    <Button
    onPress={onPress}
    title='Start Now'
    height={hp('5%')}
    textSize={14}
    borderRadius={10}
    width={wp('50%')}
    />
}
   </View>
    </View>

</Card>
    )
}
export default TechnicianCard