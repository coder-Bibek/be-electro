import React from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import HomeScreen from "./components/HomeScreen";
import AddLaptop from "./components/AddLaptop";
import SearchLaptop from "./components/SearchLaptop";
import CartStack from "./components/CartStack";
import LaptopDetails from "./components/LaptopDetails";
import ShowLaptop from "./components/ShowLaptop";
import LaptopLogin from "./components/LaptopLogin";
export default function App() {
  const Stack = createStackNavigator();
  return (
    <NavigationContainer>
      <Stack.Navigator headerMode="none">
        <Stack.Screen
          name="Home"
          component={HomeScreen}
          options={{ title: "Welcome" }}
        />
        <Stack.Screen name="add" component={AddLaptop} />
        <Stack.Screen name="login" component={LaptopLogin} />
        <Stack.Screen name="search" component={SearchLaptop} />
        <Stack.Screen name="cart" component={CartStack} />
        <Stack.Screen name="ldetails" component={LaptopDetails} />
        <Stack.Screen name="show" component={ShowLaptop} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}
