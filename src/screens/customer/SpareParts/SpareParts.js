import React,{useState} from 'react'

import {View,Text,TouchableOpacity,StyleSheet,KeyboardAvoidingView} from 'react-native'
import Input from '../../../components/Input/Input'
import SparePartsCard from '../../../components/SparePartsCard/SparePartsCard'
import VerticalList from '../../../components/VerticalList/VerticalList'
import CommonStyles from '../../../config/styles/styles'
import { SpareParts as parts } from './DummyDate'

import { heightPercentageToDP as hp, widthPercentageToDP as wp } from 'react-native-responsive-screen'
import Colors from '../../../config/colors/Colors'
const SpareParts=({navigation})=>{
    const [search,setSearch]=useState('')
    const searchService=(text)=>{
        console.log("text recieved",text)
    }
    return(
        <View style={CommonStyles.container}>
               <View style={styles.headerView}>

<KeyboardAvoidingView  behavior='position'>

<Input
borderColor={Colors.white}
textColor={Colors.white}
value={search}
onChangeText={(text)=>{searchService(text)}}
placeholder='Search Any Spare Parts...'
title={'Search'}
/>
</KeyboardAvoidingView>
            </View>
            <View style={styles.body}>
            <VerticalList
            numColumns={1}
                    Data={parts}
                    renderItem={({item})=>{
                        return(
                            <View style={{paddingVertical: hp('2%'),paddingHorizontal:hp('1%')}}>

<SparePartsCard
height={hp('30%')}
width={wp('85%')}
               name={item.name}
               image={item.image}
               PriceOne={item.orignalPrice}
               PriceTwo={item.discountPrice}
               onPress={()=>{navigation.navigate("RequestSparePart",{
                name:item.name ,
                price: item.discountPrice
               })}}
               />
                                </View>
                        )
                    }}
                    keyExtractor={(item)=>{return item.id.toString()}}
                    
                    />
            </View>
            
        </View>
    )
}

export default SpareParts

const styles=StyleSheet.create({
    headerView:{
        padding: hp('1%'),
        // height: hp('25%'),
        flex: 0.2,
        justifyContent:'center',
        backgroundColor: Colors.deepBlue,
       
       
},
body:{
    // height: hp('75%'),
    borderRadius:30,
    flex:0.80,
    backgroundColor: Colors.white,
    justifyContent:'center'
    
},
headTitle:{
marginHorizontal: wp('5%'),
    fontSize: 26,
    color: Colors.white,
    fontWeight: '700'

},
categoryLabel:{
    marginHorizontal: hp('3%'),
    fontSize: 18,
    color: Colors.deepBlue,
    fontWeight:'bold'
},
viewAllLabel:{
    margin: hp('1%'),
    fontSize: 14,
    color: Colors.red,
    fontWeight:'bold'
},
rowHolder:{
    flexDirection:'row',
    justifyContent:'space-between',
    alignItems:'center',
    paddingVertical: hp('1%'),
    paddingHorizontal: wp('2%')
},
containerView:{
    height: hp('33%'),
    marginVertical: hp('1%'),
    justifyContent:'center'
}
})