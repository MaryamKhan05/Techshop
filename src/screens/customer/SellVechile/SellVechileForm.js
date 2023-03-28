import React,{useState} from "react";

import {View,Text, ScrollView, Image,ToastAndroid,PermissionsAndroid,Platform} from 'react-native'
import { heightPercentageToDP as hp,widthPercentageToDP as wp } from "react-native-responsive-screen";
import Button from "../../../components/Button/Button";
import { launchImageLibrary } from 'react-native-image-picker';
import Input from "../../../components/Input/Input";
import CommonStyles from "../../../config/styles/styles";
import Colors from "../../../config/colors/Colors";

const SellVechileForm=()=>{
    const[name,setName]=useState('')
    const[companyName,setCompanyName]=useState('')
    const[modalYear,setModalYear]=useState('')
    const[ownerName,setOwnerName]=useState('Ali')
    const[ownerAddress,setOwnerAddress]=useState('Shamsabad Rawalpindi')
    const[contactNo,setContactNo]=useState('03123456789')
    const[image,setImage]=useState('')
    const[demand,setDemand]=useState('')
    const[negotiablePrice,setNegotiablePrice]=useState('')
    const[used,setUsed]=useState('')
    const[date,setDate]=useState(new Date().toDateString())

    const uploadImage= async () => {

        if (Platform.OS == 'android') {
            
            // const hasPermissions = await PermissionsAndroid.request(PermissionsAndroid.PERMISSIONS.WRITE_EXTERNAL_STORAGE, {
            //     title: 'Camera Access Required',
            //     message: 'TechShop Needs To Access Your Camera'
            // });
            // console.log("Permissions"+ hasPermissions)
            // if (hasPermissions === PermissionsAndroid.RESULTS.GRANTED) {
                launchImageLibrary({
                    quality: 0.5, mediaType: 'photo'
                },
                    (fileobj) => {
                        if (fileobj.didCancel || fileobj.errorCode) { return ToastAndroid.show('Image Upload Cancelled', ToastAndroid.SHORT) }
                        const img = fileobj.assets[0]
                        setImage(img.uri)
                    }
                )


            
        }

    }
    return(
        <View style={CommonStyles.container}>
            <Text style={{fontSize:20,alignSelf:'center',color:Colors.black}}>Please Fill Out This Form</Text>
<ScrollView contentContainerStyle={{paddingBottom: hp('3%')}}>
<Input
            value={date}
            title='Date'
            disabled
            />
            <Input
            value={name}
            onChangeText={(text)=>{setName(text)}}
            placeholder={'Enter Vechile Name i.e: Reborn'}
            title='Vechile Name'
            />
            <Input
            value={companyName}
            onChangeText={(text)=>{setCompanyName(text)}}
            placeholder={'Enter Company Name i.e: Honda'}
            title='Company Name'
            />
            <Input
            value={modalYear}
            onChangeText={(text)=>{setModalYear(text)}}
            placeholder={'Enter Modal Year i.e: 2013'}
            title='Modal Year'
            />
          <Input
            value={ownerName}
            title='Owner Name'
            onChangeText={(text)=>{setOwnerName(text)}}
            />

            <Input
            value={ownerAddress}
            onChangeText={(text)=>{setOwnerAddress(text)}}
           
            title='Owner Address'
            />
            <Input
            value={contactNo}
            onChangeText={(text)=>{setContactNo(text)}}
            placeholder={'Enter Vechile Name i.e: Reborn'}
            title='Owner Contact'
            />
            <Input
            value={demand}
            onChangeText={(text)=>{setDemand(text)}}
            placeholder={'Enter Demand Price i.e: 23lacs'}
            title='Demand Price'
            />
            <Input
            value={negotiablePrice}
            onChangeText={(text)=>{setNegotiablePrice(text)}}
            placeholder={'Enter Negotiable Price i.e: 2lacs'}
            title='Negotiable Price'
            />
            <Input
            value={used}
            onChangeText={(text)=>{setUsed(text)}}
            placeholder={'Enter Used In Kilometers i.e: 50600'}
            title='Used (km)'
            />
            <Input
            value={name}
            onChangeText={(text)=>{setName(text)}}
            placeholder={'Enter Vechile Name i.e: Reborn'}
            title='Vechile Name'
            />
            <View style={{alignSelf:'center',margin:hp('1%'),alignItems:'center',justifyContent:'center',width:wp('100%'),flexDirection:'row'}}>

            <Button
            title={'Upload Image'}
            onPress={()=>{uploadImage()}}
            width={wp('91%')}
            borderRadius={10}
    
            height={hp('7%')}
            
            />
            </View>
            <View style={{alignSelf:'center',width:wp('40%'),margin:hp('1%'),justifyContent:'center',flexDirection:'row',}}>
           {image && <Image
            source={{uri: image}}
            style={{height: hp('8%'),width: wp('15%') }}
            resizeMode='contain'
            />
           }
           {!image &&
            <Image
            source={{uri: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSDfd37kUihRkyoe3DHC2mwwmVFMGjt-pZbVA&usqp=CAU'}}
            style={{height: hp('8%'),width: wp('15%') }}
            resizeMode='contain'
            />
            }

            </View>
            <Button
            title={'Post My Ad'}
            onPress={()=>{alert('Ad Posted')}}
            
            />

</ScrollView>
        </View>
    )
}

export default SellVechileForm