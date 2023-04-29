import React,{useState,useEffect} from 'react'

import {View,Text,TouchableOpacity,StyleSheet,KeyboardAvoidingView} from 'react-native'
import Input from '../../../components/Input/Input'
import ServiceCard from '../../../components/ServiceCard/ServiceCard'
import VerticalList from '../../../components/VerticalList/VerticalList'
import CommonStyles from '../../../config/styles/styles'
import {Services as services} from './DummyServices'

import { heightPercentageToDP as hp, widthPercentageToDP as wp } from 'react-native-responsive-screen'
import Colors from '../../../config/colors/Colors'

import { getDocs,collection } from 'firebase/firestore'
import { db } from '../../../../firebase.config'
const Services=({navigation})=>{
    const [search,setSearch]=useState('')
    const searchService=(text)=>{
        console.log("text recieved",text)
    }
    const[data,setData]=useState([])
    useEffect(() => {
   
  
      const getServices = async () => {
        const d = [];
      
        const dbRef = collection(db, 'Services');
        const querySnapshot = await getDocs(dbRef);
      
        querySnapshot.forEach((doc) => {
          d.push(doc.data());
        });
      
        setData(d);
      };
  
      getServices();
    }, []);
    return(
        <View style={CommonStyles.container}>
               <View style={styles.headerView}>

<KeyboardAvoidingView  behavior='position'>

<Input
borderColor={Colors.white}
textColor={Colors.white}
value={search}
onChangeText={(text)=>{setSearch(text)}}
placeholder='Search Any Service...'
title={'Search'}
/>
</KeyboardAvoidingView>
            </View>
            <View style={styles.body}>
            <VerticalList
                    Data={data}
                    renderItem={({item})=>{
                        return(

<View style={{paddingVertical: hp('2%'),paddingHorizontal:hp('1%')}}>
<ServiceCard
// flexdirection={true}
height={hp('35%')}
width={wp('40%')}
  image={item.image}
  name={item.serviceName}
  desc={item.serviceDescription}
  onPressSchedule={() => {
    navigation.navigate("RequestService", {
      name: item.serviceName,
      charges: item.serviceCharges,
      reuqestCategory: item.reuqestCategory

    });
  }}
  onPressQuick={() => {
    navigation.navigate("RequestQuickService", {
      name: item.serviceName,
      charges: item.serviceCharges,
      reuqestCategory: item.reuqestCategory

    });
  }}
/>
</View>
                        )
                    }}
                    keyExtractor={(item) => {
                        return item.image;
                      }}
                    
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