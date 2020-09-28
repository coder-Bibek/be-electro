

// import * as ImagePicker from "expo-image-picker";
// import * as Permissions from "expo-permissions";
// import { TextInput } from "react-native-gesture-handler";
// import db from "./firebase";
// import firebase from "firebase";
// const AddLaptop = ({ navigation }) => {
//   const [image, setImage] = useState(null);
//   const [price, setPrice] = useState("");
//   const [model, setModel] = useState("");
//   const [desc, setDesc] = useState("");
//   const cartdetail = "Add to cart";
//   // useEffect(()=>{
//   //   if (Platform.OS !== "web") {
//   //     const { status } = await Permissions.askAsync(Permissions.CAMERA_ROLL);
//   //     if (status !== "granted") {
//   //       alert("Sorry, we need camera roll permissions to make this work!")
       
//   //     }
//   //   }
//   // })
//   useEffect(()=>{
//    let isMounted=true
//     if(isMounted){
//     getPermissionAsync()
//     }
//     return ()=>{isMounted=false}
//   })
//   const getPermissionAsync = async () => {
//     if (Platform.OS !== 'web') {
//       const { status } = await Permissions.askAsync(Permissions.CAMERA_ROLL);
//       if (status !== 'granted') {
//         alert('Sorry, we need camera roll permissions to make this work!');
//       }
//     }
//   }
//  
 
//   // const addLaptop = (event) => {
//   //   event.preventDefault();
//   //   if (model.length === 0 || desc.length === 0 || price.length === 0) {
//   //     alert("fields cannot be empty");
//   //   } else if (
//   //     image === "" ||
//   //     model.trim == "" ||
//   //     desc.trim == "" ||
//   //     price.trim() == ""
//   //   ) {
//   //     alert("fileds cannot be empty");
//   //   } else {
//   //     db.collection("laptops").add({
//   //       image: image,
//   //       model: model.toLowerCase(),
//   //       description: desc.toLowerCase(),
//   //       price: price,
//   //       cart: cartdetail.toUpperCase(),
//   //       timestamp: firebase.firestore.FieldValue.serverTimestamp(),
//   //     });

//   //     setDesc("");
//   //     setModel("");
//   //     setImage(null);
//   //     setPrice("");
//   //     Alert.alert("Laptop", "Added Succesfully", [
//   //       {
//   //         text: "ok",
//   //         onPress: () => {
//   //           navigation.navigate("Home");
//   //       }
//   //       },
//   //     ]);
//   //   }
//   // };
//   const _pickImage =  async() => {
//     try {
//       let result = await ImagePicker.launchImageLibraryAsync({
//         mediaTypes: ImagePicker.MediaTypeOptions.Images,
//         allowsEditing: true,
//         aspect: [5, 3],
//         quality: 1,
//       });
//       if (!result.cancelled) {
//         setImage(result.uri);
//       }
//     } catch (E) {
//       console.log(E);
//     }
    
//   };
//   return (
//   
// export default AddLaptop;
import React, { useState, useEffect, useCallback } from "react";
import * as ImagePicker from "expo-image-picker"
import * as Permissions from 'expo-permissions';
import {
  View,
  TextInput,
  BackHandler,
  Text,
  StyleSheet,
  Platform,
  Image,
  ScrollView,
  Alert,
} from "react-native";
import { useFocusEffect } from "@react-navigation/native";
import db from "./firebase";
import firebase from 'firebase'
const AddLaptop = ({navigation}) => {
  const[image,setImage]=useState(null)
  const[model,setModel]=useState("")
  const[price,setPrice]=useState("")
  const[description,setDescription]=useState("")
  useFocusEffect(
    useCallback(() => {
      const onBackPress = () => {
        Alert.alert("Alert", "Do you want to return to home?", [
          { text: "yes", onPress: () => navigation.navigate("Home") },
          { text: "no" },
        ]);

        return true;
      };

      BackHandler.addEventListener("hardwareBackPress", onBackPress);

      return () =>
        BackHandler.removeEventListener("hardwareBackPress", onBackPress);
    })
  );
  useEffect(()=>{
      setTimeout(()=>{
          getPermissionAsync()
      },1000)
  })
  const  getPermissionAsync = async () => {
    if (Platform.OS !== 'web') {
      const { status } = await Permissions.askAsync(Permissions.CAMERA_ROLL);
      if (status !== 'granted') {
        alert('Sorry, we need camera roll permissions to make this work!');
      }
    }
  };
  const _pickImage = async () => {
    try {
      let result = await ImagePicker.launchImageLibraryAsync({
        mediaTypes: ImagePicker.MediaTypeOptions.Images,
        allowsEditing: true,
        aspect: [5, 3],
        quality: 1,
      });
      if (!result.cancelled) {
        setImage(result.uri)
      }

      console.log(result);
    } catch (E) {
    //   console.log(E);
    }
  };
  const uploadImage =(e)=>{
    e.preventDefault();
    setImage(null)
    setDescription("")
    setPrice("")
    setModel("")
    if(model.length==0||price.length==0){
alert("no places")
    }
    else if(model.trim()=="" || price.trim()=="" || image==null){
alert('empty')
    }
    else{
     
    db.collection("laptops").add({
      model:model,
      image:image,
      price:price,
      description:description,
      timestamp:firebase.firestore.FieldValue.serverTimestamp(),
    })
  
   
    alert("added")
    }
  }
  return (
    <View style={styles.container}>
           <View style={styles.headerContainer}>
             <Text style={styles.headerText}>Gracia</Text>
          </View>
           <ScrollView style={styles.imageContainer}>
             <Text style={{ fontSize: 24, fontWeight: "bold", margin: 10 }}>
               Image:
             </Text>
    
             <View style={{ borderWidth: 1, width: 300, left: 30 }}>
               <Image
                source={{ uri: image }}
                style={{
                  width: 298,
                  height: 200,
    
                  borderWidth: 2,
                }}
              />
            </View>
    
            <Text
             onPress={_pickImage}
              style={{
                borderWidth: 1,
                backgroundColor: "lightgrey",
                textAlign: "center",
                alignSelf: "stretch",
                fontSize: 22,
                padding: 10,
                margin: 10,
                borderRadius: 25,
              }}
            >
              Upload Photo
            </Text>
            <Text style={{ fontSize: 24, fontWeight: "bold", margin: 10 }}>
              Model:
            </Text>
            <TextInput
              placeholder="Dell i5"
              style={{ borderWidth: 1, padding: 10, margin: 10 }}
              value={model}
              onChangeText={(text) => setModel(text)}
            />
            <Text style={{ fontSize: 24, fontWeight: "bold", margin: 10 }}>
              Price:
            </Text>
            <TextInput
              placeholder="20000"
              style={{ borderWidth: 1, padding: 10, margin: 10 }}
              keyboardType="numeric"
              value={price}
              onChangeText={(hold) => setPrice(hold)}
              // value={model}
              // onChangeText={(text) => setModel(text)}
            />
            <Text style={{ fontSize: 24, fontWeight: "bold", margin: 10 }}>
              Description:
            </Text>
            <TextInput
              placeholder="ram is 4gb, ssd 256 gb"
              style={{ borderWidth: 1, padding: 10, margin: 10 }}
              multiline={true}
              value={description}
              onChangeText={(data) => setDescription(data)}
            />
            <Text
              style={{
                fontSize: 24,
                fontWeight: "bold",
                padding: 10,
                borderWidth: 1,
                textAlign: "center",
                margin: 10,
                backgroundColor: "skyblue",
              }}
              onPress={uploadImage}
            >
              Submit
            </Text>
          </ScrollView>
        </View>
      );
    };
    

const styles = StyleSheet.create({
      container: {
        flex: 1,
        backgroundColor: "rgba(255,255,255,1)",
      },
      imageContainer: {
        flex: 1,
        top: 5,
      },
      headerContainer: {
        backgroundColor: "wheat",
        flexDirection: "row",
        alignItems: "center",
        padding: 10,
        justifyContent: "space-between",
        height: "14%",
        borderWidth: StyleSheet.hairlineWidth,
    
        borderColor: "transparent",
      },
      headerText: {
        fontSize: 32,
        fontStyle: "normal",
    
        top: 10,
        fontWeight: "bold",
      },
    });

export default AddLaptop
