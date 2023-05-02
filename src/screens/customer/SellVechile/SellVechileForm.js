import React,{useState} from "react";

import {View,Text, ScrollView, Image,ToastAndroid,PermissionsAndroid,Platform} from 'react-native'
import { heightPercentageToDP as hp,widthPercentageToDP as wp } from "react-native-responsive-screen";
import Button from "../../../components/Button/Button";
import { launchImageLibrary } from 'react-native-image-picker';
import * as ImagePicker from "expo-image-picker";
import Input from "../../../components/Input/Input";
import CommonStyles from "../../../config/styles/styles";
import Colors from "../../../config/colors/Colors";
import { addDoc, collection } from "firebase/firestore";
import { auth, db, storage } from "../../../../firebase.config";

import {
  getDownloadURL,
  ref,
  uploadBytes,
  getStorage,
  uploadBytesResumable,
} from "firebase/storage";
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

        let result = await ImagePicker.launchImageLibraryAsync({
            mediaTypes: ImagePicker.MediaTypeOptions.All,
            allowsEditing: true,
            aspect: [4, 3],
            quality: 1,
        });



        if (result.canceled) {
            setImage('')
        }
        else {
            setImage(result.assets[0].uri);

        }

    }

    const validateValues=()=>{
     if(!demand){return alert('Enter Your Demand Please !!!')}   
   else  if(!name){return alert('Enter Vechile Name Please !!!')}   
   else  if(!companyName){return alert('Enter Company Name Please !!!')}   
   else  if(!modalYear){return alert('Enter Vechile Model Year Please !!!')}   
   else  if(!ownerName){return alert('Enter Owner Name Please !!!')}   
   else  if(!ownerAddress){return alert('Enter Owner Address Please !!!')}   
   else  if(!contactNo){return alert('Enter Owner Contact No Please !!!')}   
   else  if(!used){return alert('Enter Vechile Usage in Kilometers Please !!!')}   
   else{
   imageUpload()
    
  }
    }
    const imageUpload = async () => {
        const blobImage = await new Promise((resolve, reject) => {
          const xhr = new XMLHttpRequest();
          xhr.onload = function () {
            resolve(xhr.response);
          };
          xhr.onerror = function () {
            reject(new TypeError("Network request failed"));
          };
          xhr.responseType = "blob";
          xhr.open("GET", image, true);
          xhr.send(null);
          const metadata = {
            contentType: "image/jpeg",
          };
        });
        // Create the file metadata
        /** @type {any} */
        const metadata = {
          contentType: "image/jpeg",
        };
    
        // Upload file and metadata to the object 'images/mountains.jpg'
        const storageRef = ref(storage, "Services/" + Date.now());
        const uploadTask = uploadBytesResumable(storageRef, blobImage, metadata);
    
        // Listen for state changes, errors, and completion of the upload.
        uploadTask.on(
          "state_changed",
          (snapshot) => {
            // Get task progress, including the number of bytes uploaded and the total number of bytes to be uploaded
            const progress =
              (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
            console.log("Upload is " + progress + "% done");
            switch (snapshot.state) {
              case "paused":
                console.log("Upload is paused");
                break;
              case "running":
                console.log("Upload is running");
                break;
              case "success":
                console.log("Your Image Uploaded Successfully");
            }
          },
          (error) => {
            switch (error.code) {
              case "storage/unauthorized":
                // User doesn't have permission to access the object
                break;
              case "storage/canceled":
                // User canceled the upload
                break;
    
              // ...
    
              case "storage/unknown":
                // Unknown error occurred, inspect error.serverResponse
                break;
            }
          },
          () => {
            // Upload completed successfully, now we can get the download URL
            getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
              console.log("File available at", downloadURL);
              handleSaveRequest(downloadURL);
            });
          }
        );
      };
    const handleSaveRequest=(imageUrl)=>{
        const requestID= date + modalYear + ownerName + imageUrl
        const dbref= collection(db,'VehicleRequests')

        addDoc(dbref,{
           date,
           customerId: auth.currentUser.uid,
          vechileName: name,
          modalYear,
          companyName,
          contactNo,
          ownerName,
          ownerAddress,
          used,
          demand,
          status: 'pending',
          imageUrl,
          requestID
         }).then(()=>{
           ToastAndroid.show('Vehicle Ad Posted',ToastAndroid.SHORT)
           clearForm()
         }).catch((err)=>{
           console.log(err)})
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
            value={used}
            onChangeText={(text)=>{setUsed(text)}}
            placeholder={'Enter Used In Kilometers i.e: 50600'}
            title='Used (km)'
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
            onPress={()=>{validateValues()}}
            
            />

</ScrollView>
        </View>
    )
}

export default SellVechileForm