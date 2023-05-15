import { useState, useEffect } from "react";
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from "react-native-responsive-screen";
import {
  collection,
  getDocs,
  doc,
  updateDoc,
  addDoc,
  query,
  where,
} from "firebase/firestore";
import { db } from "../../../../firebase.config";
import Button from "../../../components/Button/Button";
import { View, Text, FlatList, StyleSheet } from "react-native";
import { Spacer } from "../../../components/Spacer/Spacer";
import Colors from "../../../config/colors/Colors";

const SparePartDetail = ({ route }) => {
  const { requestCategory } = route.params;
  const [adminSpareParts, setAdminSpareParts] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const fetchRequests = async () => {
      setLoading(true);

      const dbref = collection(db, "SparePartReq");
      const q = query(
        dbref,
        where("requestCategory", "==", requestCategory),
        where("status", "==", "pending")
      );

      const querySnapshot = await getDocs(q);
      const requestsData = querySnapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      }));

      setAdminSpareParts(requestsData);
      setLoading(false);
    };
    // console.log(requestsData);
    fetchRequests();
  }, handleApprove);

  const handleApprove = async (requestId) => {
    // Update the status of the request to "approve"
    setLoading(true)
    const requestRef = doc(db, "SparePartReq", requestId);
    await updateDoc(requestRef, { status: "approve" });

    alert('Request Approved')
    // Add the notification to the "Notification" collection
    const notification = {
      message: `Your spare part request with ID ${requestId} has been approved.`,
      time: new Date(),
    };
    setLoading(false)
    await addDoc(collection(db, "SparePartNotifications"), notification);
  };

  const renderItem = ({ item }) => (
    <View
      key={item.id}
      style={{
        width: wp("95"),
        alignSelf: "center",
        justifyContent: "center",
      }}
    >
      <Text style={styles.text}>Customer Name: {item.customerName}</Text>
      <Text style={styles.text}>Customer Name: {item.sparePartName}</Text>
      <Text style={styles.text}>Customer Address: {item.customerAddress}</Text>

      <Text style={styles.text}>Modal Name: {item.modalName}</Text>
      <Text style={styles.text}>Modal Year: {item.modalYear}</Text>
      {/* <Text style={styles.text}>Status: {item.status}</Text> */}
      <Spacer />
      <Button
        style={styles.button}
        title="Approve"
        disabled={item.status !== "pending"}
        onPress={() => handleApprove(item.id)}
        width={wp("30")}
      />
    </View>
  );

  return (
    <View style={{ flex: 1, backgroundColor: Colors.white }}>
      {adminSpareParts.length === 0 ? (
        <Text>No requests yet.</Text>
      ) : (
        <FlatList
          data={adminSpareParts}
          renderItem={renderItem}
          keyExtractor={(item) => item.id}
        />
      )}
    </View>
  );
};
const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
  },
  serviceItem: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginVertical: 10,
  },
});
export default SparePartDetail;
