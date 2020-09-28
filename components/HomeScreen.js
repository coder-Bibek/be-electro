import React, { useCallback, useState, useEffect } from "react";
import {
  View,
  Text,
  StyleSheet,
  Dimensions,
  Alert,
  BackHandler,
  Platform,
} from "react-native";
import { useFocusEffect } from "@react-navigation/native";
import db from "./firebase";
import firebase from "firebase";
import ShowLaptop from "./ShowLaptop";
import { ScrollView } from "react-native-gesture-handler";
import EndStack from "./EndStack";
import LaptopLogin from "./LaptopLogin";
function HomeScreen({navigation}){
  const[laptops,setLaptops]=useState([])
  useFocusEffect(
    useCallback(() => {
      const onBackPress = () => {
        Alert.alert("Alert", "Do you want to exit this app?", [
          { text: "yes", onPress: () => BackHandler.exitApp() },
          { text: "no" },
        ]);

        return true;
      };

      BackHandler.addEventListener("hardwareBackPress", onBackPress);

      return () =>
        BackHandler.removeEventListener("hardwareBackPress", onBackPress);
    })
  );
 
  useEffect(() => { // note this flag denote mount status
    db.collection("laptops")
    .orderBy("timestamp", "desc")
    .onSnapshot((snapshot) => {

        setLaptops(snapshot.docs.map((doc) => ({id:doc.id,hold:doc.data()})));
          
     
       
       })
       
  },[]);
  return (
    <View style={styles.container}>
      <View style={styles.headerContainer}>
        <Text style={styles.headerText}>Gracia</Text>
        <Text
          style={styles.headerText2}
          onPress={() => navigation.navigate("login")}
        >
          Add-Item
        </Text>
      </View>
      <View
        style={{
          flex: 1,
          alignItems: "center",
        }}
      >
        <ScrollView style={{ width: "100%" }}>
          {laptops.map((data, i) => (
            <ShowLaptop
              key={i}
              image={data.hold.image}
              model={data.hold.model}
              desc={data.hold.description}
              price={data.hold.price}
              cart={data.hold.cart}
              id={data.id}
            />
          ))}
        </ScrollView>
      </View>
      <EndStack />
    </View>
  );
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "rgba(255,255,255,1)",
  },
  headerContainer: {
    backgroundColor: "wheat",
    borderWidth: StyleSheet.hairlineWidth,
    borderRadius: 10,
    borderColor: "transparent",
    flexDirection: "row",
    alignItems: "center",
    padding: 10,
    justifyContent: "space-between",
    height: "14%",
  },
  headerText: {
    fontSize: 32,
    fontStyle: "normal",

    top: 10,
    fontWeight: "bold",
  },
  headerText2: {
    fontSize: 22,
    borderWidth: StyleSheet.hairlineWidth,
    padding: 10,
    borderRadius: 10,
    backgroundColor: "yellow",
    color: "black",

    top: 10,
  },
});

export default HomeScreen;
