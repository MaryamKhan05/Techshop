import React,{useState} from 'react'

import {View,Text,TouchableOpacity,StyleSheet,KeyboardAvoidingView} from 'react-native'
import Input from '../../../components/Input/Input'
import ServiceCard from '../../../components/ServiceCard/ServiceCard'
import VerticalList from '../../../components/VerticalList/VerticalList'
import CommonStyles from '../../../config/styles/styles'
import {Services as services} from './DummyServices'

import { heightPercentageToDP as hp, widthPercentageToDP as wp } from 'react-native-responsive-screen'
import Colors from '../../../config/colors/Colors'
const Services=({navigation})=>{
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
placeholder='Search Any Service...'
title={'Search'}
/>
</KeyboardAvoidingView>
            </View>
            <View style={styles.body}>
            <VerticalList
                    Data={services}
                    renderItem={({item})=>{
                        return(
                            <View style={{paddingVertical: hp('2%'),paddingHorizontal:hp('1%')}}>

<ServiceCard
height={hp('25%')}
width={wp('40%')}
image={item.image}
name={item.name}
onPress={()=>{navigation.navigate('RequestService',{
    name: item.name
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

export default Services

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