import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  Image,
  Dimensions,
  StyleSheet,
  Pressable,
} from "react-native";
import { useNavigation } from "@react-navigation/native";
import {
  TouchableOpacity,
  TouchableHighlight,
} from "react-native-gesture-handler";
import db from "./firebase";
const ShowLaptop = ({ id, cart, price, image, model, desc }) => {
  const message = { text: "hello" };
  const navigation = useNavigation();
  const [details, setDetails] = useState([]);
  const [toggle, setToggle] = useState(true);
  // useEffect(()=>{
  //    //   db.collection("laptops")
  // //   .orderBy("timestamp", "desc")
  // //   .onSnapshot((snapshot) => {
  // //    if(this.is_mounted==false){
  // //     this. setState({
  // //       laptops:snapshot.docs.map((doc) => ({ id: doc.id, hold: doc.data() }))
  // //     }
     
      
          
  // //       );
  // //   } 
           
  // //   })
  // })
  useEffect(() => {
    let isMounted = true; // note this flag denote mount status
    db.collection("laptops")
      .orderBy("image")
      .startAt(image)
      .endAt(image + "\uf8ff")
      .onSnapshot((snapshot) => {
        if(isMounted){
        setDetails(snapshot.docs.map((doc) => doc.data()));
        }  
      });
    
    
    return () => { isMounted = false }; // use effect cleanup to set flag false, if unmounted
  });
 
  const collectData = async() => {
    await details.map((data) =>
      navigation.navigate("ldetails", {
        model: data.model,
        image: data.image,
        desc: data.description.toUpperCase(),
        price: data.price,
        cart: data.cart,
      })
    );
  };
  return (
    <View
      style={{
        // borderWidth: 2,
        margin: 5,
        padding: 3,
        // backgroundColor: "skyblue",
        alignItems: "center",
        borderRadius: 10,
      }}
    >
      <TouchableOpacity activeOpacity={1} onPress={collectData}>
        <Image
          source={{ uri: image }}
          style={{ width: Dimensions.get("screen").width - 18, height: 200 }}
        />
        <View
          style={{
            borderWidth: StyleSheet.hairlineWidth,
            margin: 10,
            alignSelf: "stretch",
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

          {/* // <Text
          //   style={{
          //     fontSize: 24,
          //     fontWeight: "bold",
          //     padding: 10,
          //     backgroundColor: "lightgrey",
          //     textAlign: "center",
          //   }}
          // >
          //   ADD TO CART
          // </Text> */}
        </View>
      </TouchableOpacity>
    </View>
  );
};

export default ShowLaptop;
