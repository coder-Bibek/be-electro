import React, { useState, useEffect, useCallback } from "react";
import { useFocusEffect } from "@react-navigation/native";
import ShowLaptop from "./ShowLaptop";
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TextInput,
  BackHandler,
  KeyboardAvoidingView,
  Alert,
} from "react-native";
import db from "./firebase";
const SearchLaptop = ({ navigation }) => {
  const [input, setInput] = useState("");
  const [babel, setBabel] = useState("");
  const [details, setDetails] = useState([]);
  const [toggle, setToggle] = useState(true);
  useEffect(() => {
    handlePress();
  }, [input]);
  // useFocusEffect(
  //   useCallback(() => {
  //     const onBackPress = () => {
  //       navigation.navigate("Home");

  //       return true;
  //     };

  //     BackHandler.addEventListener("hardwareBackPress", onBackPress);

  //     return () =>
  //       BackHandler.removeEventListener("hardwareBackPress", onBackPress);
  //   }, [])
  // );
  const handlePress = () => {
    db.collection("laptops")
      .orderBy("model")
      .startAt(input)
      .endAt(input + "\uf8ff")
      .onSnapshot((snapshot) => {
        setDetails(snapshot.docs.map((doc) => doc.data()));
      });

    // if (input.trim() === "") {
    //   alert("empty");
    // } else {
    //   const hold = details.map((data) => data.message.model);
    //   hold.map((text) =>
    //     input.toLowerCase() === text.toLowerCase()
    //       ? [setToggle(true), setBabel(input)]
    //       : setToggle(false)
    //   );
    // }
  };

  return (
    <View style={styles.container}>
      <View
        style={{
          flexDirection: "row",
          alignItems: "center",
          justifyContent: "space-around",
          width: "100%",
        }}
      >
        <TextInput
          placeholder="Search.."
          autoFocus={true}
          style={{
            borderWidth: 1,
            flex: 0.9,
            padding: 10,
            margin: 10,
            borderRadius: 10,
          }}
          value={input}
          onChangeText={(text) => setInput(text)}
        />
        {/* <Text
          style={{
            borderWidth: 1,
            padding: 10,
            flex: 0.3,
            textAlign: "center",
            margin: 10,
          }}
          onPress={handlePress}
        >
          Search
        </Text> */}
      </View>
      <View style={{ flex: 1 }}>
        <ScrollView>
          {details.map((data, i) => (
            <ShowLaptop
              key={i}
              model={data.model}
              image={data.image}
              // image={data.model}
              // desc={data.description}
            />
          ))}
        </ScrollView>
      </View>
    </View>
  );
};
const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: 30,
  },
});

export default SearchLaptop;
