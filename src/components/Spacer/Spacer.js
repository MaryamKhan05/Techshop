import React from "react";
import { View } from "react-native";
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';


export const Spacer=()=>{
    return(
<View
style={{
    marginVertical:hp('1')
}}
>

</View>
    )
}

