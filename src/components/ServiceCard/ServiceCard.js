import Button from "../Button/Button"
import Card from "../Card/Card"

import React from "react"
import {widthPercentageToDP as wp,heightPercentageToDP as hp} from 'react-native-responsive-screen'
import {View,Text,TouchableOpacity,Image} from 'react-native'
import Colors from "../../config/colors/Colors"

const ServiceCard=(
    {
        name,
        onPress,
        image,
        height,
        width

    }
)=>{
    return(
<Card>
    <View style={{paddingHorizontal: wp('1%'),width:width?width:wp('85%'),height: height? height: hp('15%'),paddingVertical:hp('1%'),flexDirection:height?'column':'row',justifyContent:'space-between'}}>
<View style={{width:wp('30%'),justifyContent:'center',alignSelf:'center',alignItems:'center'}}>

    <Image
    source={{uri: image}}
   style={{height: hp('10%'),width: wp('20%'),borderRadius:10}}
   resizeMode='contain'
   />
</View>
   <View style={{width:width ? wp('40%'):wp('50%') ,height:height?hp('10%'):hp('10%'),alignSelf:'center',justifyContent:'space-evenly',alignItems:'center'}}>

    <Text style={{color: Colors.black, fontSize: 20,fontWeight:'bold'}}>{name}</Text>
    <Button
    onPress={onPress}
    title='Request Service'
    height={hp('5%')}
    textSize={14}
    borderRadius={10}
    width={wp('40%')}
    />
   </View>
    </View>

</Card>
    )
}
export default ServiceCard