import React, { useState, useEffect } from "react";
import { View, Text, StyleSheet, Image, Dimensions, Alert } from "react-native";
import { ScrollView, TouchableOpacity } from "react-native-gesture-handler";
import EndStack from "./EndStack";
import Delete from "react-native-vector-icons/AntDesign"
import db from "./firebase"
import Axios from "axios";
const Cart = ({ navigation, route }) => {
  const[details,setDetails]=useState([])
  const[check,setCheck]=useState([])
  const[pelete,setPelete]=useState("")

  useEffect(()=>{
    let isMounted = true; // note this flag denote mount status
  
  
    fetch("http://192.168.254.10:4000/data").then(response=>response.json()).then(
       json=> {if(isMounted===true){
        setDetails(json)
      }
    }
    )
    return () => { isMounted = false };
  })
const handleDelete =()=>{



  {details.map(data=>{
  Axios.post("http://192.168.254.10:4000/removeme",{name:data.model}).then(response=>{
    if(response.data=="success"){
     console.log("deleted")
    }
    else{
      alert("not deleted")
    }
  })
})}

}
  
  // useEffect(()=>{
   
  //   db.collection("carts").onSnapshot(snapshot=>{
  //     setDetails(snapshot.docs.map(doc=>({id:doc.id,laptop:doc.data()})))
  //   })}
  //     ,[details])
    //  const handleDelete =()=>{
     
    //    details.map(data=>{
    //   Alert.alert("Alert","Do you want to remove it from cart?",[{text:"yes",onPress:()=>{
    //     db.collection('carts').doc(data.id).delete()
    //   }},{text:"no"}])
    // })
    // }
  return (
    <View style={styles.container}>
      <View style={styles.headerContainer}>
        <Text style={styles.headerText}>Gracia</Text>
      </View>
      <Text style={{
        fontSize:22,top:10,textAlign:"center",borderWidth:1,padding:10,margin:10,
        backgroundColor:"aquamarine"

      }}
      onPress={handleDelete}>Clear All</Text>
      <ScrollView style={{
          // borderWidth: 2,
          margin: 5,
          padding: 3,
          // backgroundColor: "skyblue",

          borderRadius: 10,
          flex: 1,
        }}>
     
     
    
     {details.map((data,i)=>  
<View key={i} style={{
  borderWidth:1,
  marginVertical:10
}}>
<Image
 source={{uri:data.image}}
 style={{margin:5, height: 200,width:330 }}
/>

<Text
   style={{
     fontSize: 24,
     fontWeight: "bold",
     padding: 10,
     textAlign: "center",
   }}
  
  >{data.model.toUpperCase()}</Text>
{/* <Delete name="delete" size={28} style={{color:"green",borderRadius:25,left:33}}  onPress={handleDelete}/> */}

<Text
 style={{
   fontSize: 24,
   fontWeight: "bold",
   padding: 10,
  margin:5,
   textAlign: "center",
   borderWidth: StyleSheet.hairlineWidth,
   borderRadius: 10,
 }}
>PRICE: {data.price}</Text>

<Text
 style={{
   fontSize: 24,
   fontWeight: "bold",
   padding: 15,
   margin:10,
   textAlign: "center",
   borderWidth: StyleSheet.hairlineWidth,
   borderRadius: 10,
   backgroundColor:"orange"
 }}
>CASH ON DELIVERY</Text>     



</View>
)}
 
   

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

export default Cart;
