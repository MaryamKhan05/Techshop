import { StatusBar } from "expo-status-bar";
import { StyleSheet, Text, View } from "react-native";
import Card from "./src/components/Card/Card";
import Input from "./src/components/Input/Input";
import ServiceCard from "./src/components/ServiceCard/ServiceCard";
import VechileCard from "./src/components/VechileCard/VehcileCard";
import { SpareParts } from "./src/screens/customer/SpareParts/DummyDate";
import SparePartsCard from "./src/components/SparePartsCard/SparePartsCard";
import WelcomeScreen from "./src/screens/common/WelcomeScreen";
import Home from "./src/screens/customer/Home/Home";
import SellVechileForm from "./src/screens/customer/SellVechile/SellVechileForm";
import RequestService from "./src/screens/customer/RequestService";
import RequestSparePart from "./src/screens/customer/SparePartRequestForm/SparePartRequest";
import Vechiles from "./src/screens/customer/Vechiles/Vechiles";
import MainStack from "./src/appNavigation/navigation";
import CustomerDrawer from "./src/navigations/customer/CustomerDrawer";
import CustomerNavigations from "./src/navigations/customer/CustomerNavigations";
// import MainAppRoutes from './src/navigations/approutes/AppMainRoutes';
export default function App() {
  return (
  <MainStack />
  // <CustomerDrawer/>
  // <CustomerNavigations/>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
});
