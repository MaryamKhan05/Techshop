import Button from "../Button/Button"
import Card from "../Card/Card"

import React from "react"
import {widthPercentageToDP as wp,heightPercentageToDP as hp} from 'react-native-responsive-screen'
import {View,Text,TouchableOpacity,Image} from 'react-native'
import Colors from "../../config/colors/Colors"

const VechileCard=({
 
    name,
    demand,

    used,
    ownerName,
    contactNo,
    image,
    ownerAddress,
    companyName,
    modalYear,
    onPress
})=>{
   
    return(
        <Card>
        <View style={{paddingHorizontal: wp('3%'),paddingVertical:hp('1%'),justifyContent:'space-between'}}>
            <View style={{marginVertical: hp('1%')}}>

        <Text style={{color: Colors.black, fontSize: 20,fontWeight:'bold',alignSelf:'center'}}>{name}</Text>
            </View>
    <View style={{width:wp('30%'),alignSelf:'center',marginVertical: hp('1%')}}>
    
        <Image
        source={{uri:image}}
       style={{height: hp('12%'),width: wp('40%'),borderRadius:10}}
       resizeMode='contain'
       />
    </View>
       <View style={{width:wp('85%'),justifyContent:'space-evenly',}}>
    
       
        <View style={{flexDirection:'row',justifyContent:'space-between'}}>
            <View>
                <View style={{paddingVertical: hp('1%')}}>
            <Text style={{color: Colors.deepBlue, fontSize: 14,fontWeight:'bold',paddingHorizontal:wp('2%')}}>Company :  </Text>

                </View>
                <View style={{paddingVertical: hp('1%')}}>
        <Text style={{color: Colors.deepBlue, fontSize: 14,fontWeight:'bold',paddingHorizontal:wp('2%')}}>Modal Year :    
        </Text>
                    </View>     
                <View style={{paddingVertical: hp('1%')}}>
        <Text style={{color: Colors.deepBlue, fontSize: 14,fontWeight:'bold',paddingHorizontal:wp('2%')}}>Demand Price:    
        </Text>
                    </View>     
                  
                <View style={{paddingVertical: hp('1%')}}>
        <Text style={{color: Colors.deepBlue, fontSize: 14,fontWeight:'bold',paddingHorizontal:wp('2%')}}>Used :    
        </Text>
                    </View>     
                <View style={{paddingVertical: hp('1%')}}>
        <Text style={{color: Colors.deepBlue, fontSize: 14,fontWeight:'bold',paddingHorizontal:wp('2%')}}>Owner Name :    
        </Text>
                    </View>     
                <View style={{paddingVertical: hp('1%')}}>
        <Text style={{color: Colors.deepBlue, fontSize: 14,fontWeight:'bold',paddingHorizontal:wp('2%')}}>Owner Contact :    
        </Text>
                    </View>     
      
                    <View style={{paddingVertical: hp('1%')}}>

        <Text style={{color: Colors.deepBlue, fontSize: 14,fontWeight:'bold',paddingHorizontal:wp('2%')}}>Owner Address :    
        </Text>
     </View>
            </View>
            <View>
            <View style={{paddingVertical: hp('1%')}}>
            <Text style={{color: Colors.black, fontSize: 14,fontWeight:'bold'}}>{companyName}</Text>
           
            </View>
            <View style={{paddingVertical: hp('1%')}}>
            <Text style={{color: Colors.black, fontSize: 14,fontWeight:'bold'}}>{modalYear}</Text>
            
          
            </View>
            <View style={{paddingVertical: hp('1%')}}>
            <Text style={{color: Colors.black, fontSize: 14,fontWeight:'bold'}}>{demand}</Text>
            
            </View>
          
            <View style={{paddingVertical: hp('1%')}}>
            <Text style={{color: Colors.black, fontSize: 14,fontWeight:'bold'}}>{used}</Text>
            
            </View>
            <View style={{paddingVertical: hp('1%')}}>
            <Text style={{color: Colors.black, fontSize: 14,fontWeight:'bold'}}>{ownerName}</Text>
           
            </View>
            <View style={{paddingVertical: hp('1%')}}>
            <Text style={{color: Colors.black, fontSize: 14,fontWeight:'bold'}}>{contactNo}</Text>
           
           
            </View>
            <View style={{paddingVertical: hp('1%')}}>
            <Text style={{color: Colors.black, fontSize: 14,fontWeight:'bold'}}>{ownerAddress}</Text>
            </View>
          
        
            </View>
        </View>
       
       

        
      
        
        <Button
        onPress={onPress}
        title='Contact Seller'
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
export default VechileCard