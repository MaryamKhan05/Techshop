import React, { useEffect, useState } from "react";
import { View, Text, Image, StyleSheet, Modal, ActivityIndicator, ToastAndroid } from "react-native";
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from "react-native-responsive-screen";
import { SafeAreaView } from "react-native-safe-area-context";
import Button from "../../../components/Button/Button";
import Card from "../../../components/Card/Card";
import Colors from "../../../config/colors/Colors";
import { Spacer } from "../../../components/Spacer/Spacer";
import {
  collection,
  doc,
  getDoc,
  getDocs,
  query,
  updateDoc,
  where,
} from "firebase/firestore";
import { db } from "../../../../firebase.config";
import HorizontalList from "../../../components/HorizontalList/HorizontalList";
import Header from "../../../components/Header/Header";
import { Picker } from '@react-native-picker/picker';
const Detail = ({ navigation, route }) => {
  const { reuqestCategory } = route.params;
  const [selectedValue, setSelectedValue] = useState('');
  const [data, setData] = useState([]);
  const [techsData, setTechsData] = useState([]);
const[serviceId,setServiceId]=useState('')
  const [loading, setLoading] = useState(false);
  const [modalVisible, setModalVisible] = useState(false);
  const [modalLoader, setModalLoader] = useState(false);
  useEffect(() => {
    const fetchTechnicians = async () => {
      const dbref = collection(db, "Technicians");
      // const q = query(
      //   dbref,
      //   where("requestCategory", "==", reuqestCategory),
      //   where("status", "==", "pending")
      // );

      const querySnapshot = await getDocs(dbref);
      const TechniciansData = querySnapshot.docs.map((doc) => doc.data());
      setTechsData(TechniciansData);
      
    };
   
    fetchTechnicians();
  }, []);
  useEffect(() => {
    const fetchRequests = async () => {
      setLoading(true);
   
      const dbref = collection(db, "ServiceRequests");
      const q = query(
        dbref,
        where("reuqestCategory", "==", reuqestCategory),
        where("status", "==", "pending")
      );

      const querySnapshot = await getDocs(q);
      const requestsData = querySnapshot.docs.map((doc) => doc.data());

      setData(requestsData);
      setLoading(false);
    };
    console.log(data);
    fetchRequests();
  }, []);

  const rejectUserRequest =async (serviceid) => {
  
    const dbRef = collection(db, "ServiceRequests");
    const q = query(dbRef, where("serviceId", "==", serviceid));
    const foundDocs= await getDocs(q)
    const docIds= foundDocs.docs.map((docs)=>docs.id)
 const docId=docIds[0]
 const updateDocRef=doc(db,"ServiceRequests",docId)
    updateDoc(updateDocRef, {
      status: "cancelled",
    }).then(()=>{
      ToastAndroid.show('Requested Rejected Successfully!',ToastAndroid.SHORT)
      navigation.goBack()
    }).catch((err)=>{alert('Something Went Wrong')})
  };
  const renderItem = ({ item }) => {
    return (
      <View style={{ paddingHorizontal: hp("2%") }}>
        <Card>
          <View
            style={{
              height: hp("20%"),
              width: wp("85%"),
              paddingHorizontal: wp("3%"),
              marginVertical: hp("1%"),
              paddingVertical: hp("2%"),
            }}
          >
            <Text
              style={{
                fontSize: 14,
                fontWeight: "800",
                textTransform: "capitalize",
              }}
            >
              status: {item.status}
            </Text>
            <Text
              style={{
                fontSize: 14,
                fontWeight: "800",
                textTransform: "capitalize",
              }}
            >
              Service Name: {item.serviceName}
            </Text>
            <Text
              style={{
                fontSize: 14,
                fontWeight: "800",
                textTransform: "capitalize",
              }}
            >
             Service Requested Date: {item.date}
            </Text>
            <Text
              style={{
                fontSize: 14,
                fontWeight: "800",
                textTransform: "capitalize",
              }}
            >
             Service Required Date: {item.requiredDate}
            </Text>
            <Text
              style={{
                fontSize: 14,
                fontWeight: "800",
                textTransform: "capitalize",
              }}
            >
              Requested Time: {item.time}
            </Text>
            <View
              style={{
                flexDirection: "row",
                justifyContent: "space-evenly",
                marginVertical: hp("2%"),
              }}
            >
              <Button
                title={"Approve"}
                width={wp("30%")}
                onPress={() => {
                  setServiceId(item.serviceId)
                  setModalVisible(!modalVisible)
                 // navigation.navigate("RequestApprovalScreen");
                }}
              />
              <Button
                title={"Reject"}
                width={wp("30%")}
                onPress={() => {
                  rejectUserRequest(item.serviceId);
                }}
              />
            </View>
          </View>
        </Card>
      </View>
    );
  };
  const assignTech = async () => {
    console.log("serviceId:", serviceId);
    if (selectedValue === '') {
      return alert('Please Select A Technician First! ');
    } else {
      setModalLoader(true);
      const dbref = collection(db, "Technicians");
      const q = query(
        dbref,
        where("uid", "==", selectedValue)
      );
  
      const querySnapshot = await getDocs(q);
      const TechnicianInfoArr = querySnapshot.docs.map((doc) => doc.data());
      const techName = TechnicianInfoArr[0].name;
      const techPhoneNo = TechnicianInfoArr[0].PhoneNo;
      const techuid = TechnicianInfoArr[0].uid;
  
      const serviceDocRef = collection(db, "ServiceRequests");
      const q2 = query(serviceDocRef, where("serviceId", "==",   serviceId));
   const foundDocs= await getDocs(q2)
   const docIds= foundDocs.docs.map((docs)=>docs.id)
const docId=docIds[0]
const updateDocRef=doc(db,"ServiceRequests",docId)
    console.log("data found for  ",docId)
       updateDoc(updateDocRef, {
        status: "approved",
        assignedTo: techName,
        techContact: techPhoneNo,
        techId: techuid
      }).then(()=>{
        ToastAndroid.show('Successfully Assigned',ToastAndroid.SHORT)
        setModalLoader(false);
        setModalVisible(false);
      }).catch((err)=>{
        console.log(err)
        alert('Something went wrong')
      })
    }
    setModalLoader(false);
    setModalVisible(false);
  };
  
  const AssignTechModal=()=>{
   
    return(
     
      <Modal
        animationType="slide"
        transparent={true}
        visible={modalVisible}
        onRequestClose={() => {

          setModalVisible(!modalVisible);
        }}>
        <View style={styles.centeredView}>
          <View style={styles.modalView}>
            {
              modalLoader && <ActivityIndicator
              style={{alignSelf:'center'}}
              color={Colors.deepBlue}
              size={'small'}
              
              />
            }
            {
              modalLoader ? <Text style={styles.modalText}>Assigning</Text>:
<View>
<Text style={styles.modalText}>One More Step</Text>
            <Text style={styles.modalText}>Assign A Technician</Text>
  </View>
            }
            
            <View>
      <Picker
        selectedValue={selectedValue}

        onValueChange={(itemValue,itemLabel) =>{
          console.log(itemLabel)
          setSelectedValue(itemValue)
        }
        }>
          <Picker.Item label="Please Select A Technician" value="" />
          {
            techsData.map((item,index)=>{
              return(
                <Picker.Item key={index} label={item.name} value={item.uid} />
              )
            })
          }
       
        {/* <Picker.Item label="Option 2" value="option2" />
        <Picker.Item label="Option 3" value="option3" /> */}
      </Picker>
     <View style={{marginVertical:hp('2%')}}>

      <Button
      width={wp('70%')}
      borderRadius={7}
      title={"Assign"}
      onPress={()=>{assignTech()}}
      />
     </View>
    </View>
          </View>
        </View>
      </Modal>

    )
  }
  return (
    <SafeAreaView
      style={{
        backgroundColor: Colors.white,
        flex: 1,
        alignItems: "center",
      }}
    >
      {/* <Spacer /> */}
      <AssignTechModal/>
      <Header headerTitle="Customer Details" />
      {/* <Text
        style={{
          fontSize: hp("2.5"),
          fontWeight: "700",
          color: Colors.black,
          textAlign: "center",
        }}
      >
        Customer Details
      </Text> */}
      {/* <Image source={{uri:image}} style={{height:hp('10'), width:wp('10')}}/> */}
      <View>
        {loading && <Text>Loading...</Text>}
        {!loading && (
          <View>
            {data.length>0 && (
              <HorizontalList
                Data={data}
                renderItem={renderItem}
                keyExtractor={(item, index) => {
                  return index.toString();
                }}
              />
            )}
            {data.length==0 && <Text>No Requests Yet</Text>}
          </View>
        )}
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  text: {
    fontSize: hp("1.8"),
    fontWeight: "400",
    margin: hp("1"),
    color: Colors.deepBlue,
    // backgroundColor:'red',
    // width: wp("70%"),
  },
  centeredView: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 22,
  },
  modalView: {
    margin: 20,
    height: hp('50%'),
    width:wp('80%'),
    backgroundColor: 'white',
    borderRadius: 20,
    justifyContent:'space-evenly',
    padding: 35,
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
});

export default Detail;
