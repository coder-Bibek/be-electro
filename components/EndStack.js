import React, { useState, useEffect } from "react";
import { View, Text } from "react-native";
import Home from "react-native-vector-icons/FontAwesome";
import Search from "react-native-vector-icons/FontAwesome";
import Card from "react-native-vector-icons/FontAwesome";
import Cart from "react-native-vector-icons/FontAwesome";
import { useNavigation } from "@react-navigation/native";
import db from "./firebase";
const EndStack = () => {
  const[details,setDetails]=useState([])
  const navigation = useNavigation();
  useEffect(() => {
    let isMounted = true; // note this flag denote mount status
    fetch("http://192.168.254.10:4000/data").then(response=>response.json())
    .then(json=>{if(isMounted===true){
      setDetails(json)
    }
  
  }
    )
    return () => { isMounted = false }; // use effect cleanup to set flag false, if unmounted
  });
   
  return (
    <View
      style={{
        flexDirection: "row",
        justifyContent: "space-around",
        alignItems: "center",
        backgroundColor: "wheat",
      }}
    >
      <Home
        name="home"
        size={38}
        style={{
          padding: 10,
          color: "brown",
        }}
        onPress={() => navigation.navigate("Home")}
      />
      <Search
        name="search"
        size={26}
        color="brown"
        onPress={() => navigation.navigate("search")}
      />
      <Card name="credit-card" size={26} color="brown" />
      <View style={{ position: "absolute", bottom: 20, right: 13 }}>
        <Text
          style={{
            fontSize: 32,
            zIndex: -40,
            fontWeight: "bold",
            color: "red",
          }}
        >{details.length>0?details.length:""}</Text>
      </View>
      <Cart
        name="shopping-cart"
        size={34}
        color="brown"
        onPress={() => navigation.navigate("cart")}
      />
    </View>
  );
};

export default EndStack;
