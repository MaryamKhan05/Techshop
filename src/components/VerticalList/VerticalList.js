import React from "react"

import {View,Text,FlatList} from 'react-native'
import { heightPercentageToDP } from "react-native-responsive-screen"

const VerticalList=({
    renderItem,
    keyExtractor,
    Data,
    numColumns,
})=>{

    return(
        <View>
            <FlatList
            numColumns={numColumns?numColumns:2}
            contentContainerStyle={{padding: heightPercentageToDP('1%')}}
            data={Data}
            renderItem={renderItem}
            keyExtractor={keyExtractor}
            />
        </View>
    )

}
export default VerticalList