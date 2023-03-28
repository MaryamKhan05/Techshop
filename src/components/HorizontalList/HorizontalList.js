import React from "react"

import {View,Text,FlatList} from 'react-native'
import { heightPercentageToDP } from "react-native-responsive-screen"

const HorizontalList=({
    renderItem,
    keyExtractor,
    Data,
})=>{

    return(
        <View>
            <FlatList
            horizontal
            contentContainerStyle={{padding: heightPercentageToDP('1%')}}
            showsHorizontalScrollIndicator={false}
            data={Data}
            renderItem={renderItem}
            keyExtractor={keyExtractor}
            />
        </View>
    )

}
export default HorizontalList