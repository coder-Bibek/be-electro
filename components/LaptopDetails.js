import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  Image,
  Dimensions,
  Alert,
} from "react-native";
// import { TouchableOpacity } from "react-native-gesture-handler";
import db from "./firebase";
import firebase from "firebase";
import EndStack from "./EndStack";
import Axios from "axios";
const LaptopDetails = ({ navigation, route }) => {
  const { model } = route.params;
  const { image } = route.params;
  const { desc } = route.params;
  const { price } = route.params;
  const { cart } = route.params;
  const [add, setAdd] = useState(true);
 
useEffect(()=>{
  isMounted = true;
  if(isMounted===true){
   
  }
  return () => { isMounted = false };
})
  const insertData=async()=>{
    let datato={
      name:model,
      username:image,
      email:price
    }
    await Axios.post("http://192.168.254.10:4000/users",datato).then(response=>{
      if(response.data=="success"){

      setAdd(false)
      }
      else{
        alert("already exists")
      }
    })
    {navigation.setParams({model,image,price})}
 
  
    // Alert.alert("Alert","Succesfully added",[{text:"ok",onPress:()=>navigation.navigate("search")}])
  
  


   
    
  };

  return (
    <View style={styles.container}>
      <View style={styles.headerContainer}>
        <Text style={styles.headerText}>Gracia</Text>
      </View>
      <ScrollView
        style={{
          // borderWidth: 2,
          margin: 5,
          padding: 3,
          // backgroundColor: "skyblue",

          borderRadius: 10,
          flex: 1,
        }}
      >
        <Image
          source={{ uri: image }}
          style={{ width: Dimensions.get("screen").width - 18, height: 200 }}
        />
        <View
          style={{
            // borderWidth: StyleSheet.hairlineWidth,
            margin: 10,
            alignSelf: "stretch",
            // borderRadius: 10,
          }}
        >
          <Text
            style={{
              fontSize: 24,
              fontWeight: "bold",
              padding: 10,
              textAlign: "center",
            }}
          >
            {model.toUpperCase()}
          </Text>
        </View>
        <Text
          style={{
            fontSize: 24,
            fontWeight: "bold",
            padding: 10,
            textAlign: "center",
            borderWidth: StyleSheet.hairlineWidth,
            borderRadius: 10,
          }}
        >
          PRICE: {price}
        </Text>
       {add?
          <Text
            style={{
              fontSize: 24,
              fontWeight: "bold",
              padding: 10,
              margin: 10,
              borderWidth: StyleSheet.hairlineWidth,
              borderRadius: 10,
              backgroundColor: "yellow",
              textAlign: "center",
            }}
            onPress={insertData}
            >
           ADD TO CART
          </Text>
         :<Text style={{
          fontSize: 24,
          fontWeight: "bold",
          padding: 10,
          margin: 10,
          borderWidth: StyleSheet.hairlineWidth,
          borderRadius: 10,
          backgroundColor: "yellow",
          textAlign: "center",
        }}>ADDED TO CART</Text>}
        <Text
          style={{
            fontSize: 24,

            padding: 10,
            margin: 10,
            textAlign: "center",
            alignSelf: "stretch",
            textDecorationLine: "underline",
          }}
        >
          Description
        </Text>
        <Text
          style={{
            borderWidth: 1,
            padding: 10,
          }}
        >
          {desc}
        </Text>
      </ScrollView>

      <EndStack />
    </View>
  );
};
const styles = StyleSheet.create({
  container: {
    flex: 1,
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
});

export default LaptopDetails;
