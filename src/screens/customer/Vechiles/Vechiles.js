import React,{useEffect, useState} from 'react'

import {View,Text,TouchableOpacity,StyleSheet,KeyboardAvoidingView, Modal, Linking, ActivityIndicator} from 'react-native'
import Input from '../../../components/Input/Input'

import VerticalList from '../../../components/VerticalList/VerticalList'
import CommonStyles from '../../../config/styles/styles'

import { heightPercentageToDP as hp, widthPercentageToDP as wp } from 'react-native-responsive-screen'
import Colors from '../../../config/colors/Colors'
import VechileCard from '../../../components/VechileCard/VehcileCard'
// import { vechiles } from './DummyVechiles'
import Button from '../../../components/Button/Button'
import { collection,getDocs,where,query } from 'firebase/firestore'
import { auth ,db} from '../../../../firebase.config'

const Vechiles=({navigation})=>{
    const [search,setSearch]=useState('')
    const[showModal,setShowModal]=useState(false)
    const[message,setMessage]=useState(false)
    const[phoneNo,setPhoneNo]=useState('')
    const[vechiles,setVechiles]=useState([])
    const[loading,setLoading]=useState(true)
    useEffect(()=>{
        const getUserVechileAds=async()=>{


const dbref = collection(db, 'VehicleRequests');
try {
    const q = query(dbref,where('status','==','approved'));
    const querySnapshot = await getDocs(q);
    const requestsData = querySnapshot.docs.map((doc) => doc.data());
    console.log('requests  ',requestsData)
    const filterRequests= requestsData.filter((item)=>{return item.customerId!=auth.currentUser.uid})
    console.log('filter requests  ',filterRequests)
   setVechiles(filterRequests)
} catch (error) {
    console.log(error);
}
setTimeout(() => {
    setLoading(false)
}, 1500);
        }
        getUserVechileAds()
    },[])
    const VechileModal=()=>{
        return(
            <Modal
            visible={showModal}
            transparent={true}
            onRequestClose={()=>{setShowModal(!setShowModal)}}
            >
                <View style={styles.centeredView}>
                    <View style={styles.modalView}>

                    <Input
                    value={message}
                    title={'Message'}
                    placeholder={'Enter A Message'}
                    onChangeText={(text)=>{setMessage(text)}}
                    multiline
                    />
                    <View style={styles.rowHolder}>

                    <Button
                    title={'Send Message'}
                    onPress={()=>{alert('Message Sent')}}
                    width={wp('40%')}
                    />
                    <Button
                    title={'Call Seller'}
                    width={wp('40%')}
                    onPress={()=>{Linking.openURL(`tel:${phoneNo}`);}}
                    />
                    </View>
                    <Button
                    title={'Cancel'}
                    onPress={()=>{setShowModal(!showModal)}}
                    />
                    </View>
                </View>
            </Modal>
        )
    }
    const searchService=(text)=>{
        console.log("text recieved",text)
    }
    return(
        <View style={CommonStyles.container}>
            {
                showModal && <VechileModal/>
            }
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
            {
            loading &&    <View style={styles.body}>
                    <ActivityIndicator size={'small'} color={Colors.deepBlue} style={{alignSelf:'center'}} />
                    </View>
            }
           { !loading &&<View style={styles.body}>
          {vechiles.length >0 ?  <VerticalList
            numColumns={1}
                    Data={vechiles}
                    renderItem={({item})=>{
                        return(
                            <View style={{paddingVertical: hp('2%'),paddingHorizontal:hp('1%')}}>

<VechileCard
contactNo={item.contactNo}
demand={item.demand}
image={item.imageUrl}
name={item.name}
ownerName={item.ownerName}
companyName={item.companyName}
modalYear={item.modalYear}
ownerAddress={item.ownerAddress}
used={item.used}
onPress={()=>{setPhoneNo(item.contactNo)

setShowModal(!showModal)
}}

/>
                                </View>
                        )
                    }}
                    keyExtractor={(item,index)=>{return index.toString()}}
                    
                    />
                :
                <Text style={[styles.viewAllLabel,{alignSelf:'center'}]}>No Ads For You Right No</Text>
                }
            </View>}
            
        </View>
    )
}

export default Vechiles

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
    width:wp('95%'),
    margin: hp('1%'),
    paddingVertical: hp('1%'),
    paddingHorizontal: wp('2%')
},
containerView:{
    height: hp('33%'),
    marginVertical: hp('1%'),
    justifyContent:'center'
},
centeredView: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 22,
  },
  modalView: {
    margin: hp('2%'),
   width: wp('95%'),
    backgroundColor: Colors.white,
    borderRadius: 20,
    padding: 35,
    height: hp('40%'),
    justifyContent:'space-between',
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
  },
})