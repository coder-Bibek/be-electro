import React, { useState } from 'react'
import { View, Text,StyleSheet ,ScrollView} from 'react-native'
import { TextInput } from 'react-native-gesture-handler'
import Eyeon from "react-native-vector-icons/Feather"
const LaptopLogin = ({navigation}) => {
    const[show,setShow]=useState(true)
    const[email,setEmail]=useState("bidaribibek7@gmail.com")
    const[password,setPassword]=useState("")
    const[message,setMessage]=useState('')
    const loginHandle =()=>{
        if(email.trim().toLowerCase()==="bidaribibek7@gmail.com" && password.toLowerCase().trim()==="redson123"){
            navigation.navigate("add")
        }
        else{
setMessage("invalid username or password")
        }
    }
    return (
        <View style={styles.container}>
      <View style={styles.headerContainer}>
        <Text style={styles.headerText}>Gracia</Text>
        </View>
        <ScrollView style={{
            flex:1,
            top:30            
        }}>
            <Text style={{
                fontSize:24,
                fontWeight:"bold",
                margin:10
            }}>Email:</Text>
            <TextInput 
            placeholder="example@example.com"
            autoCapitalize="none"
            value={email}
            onKeyPress={()=>setMessage("")}
            onChangeText={(text)=>setEmail(text)}
            style={{
                borderWidth:1,
                margin:10,
                padding:10,
                backgroundColor:"white"
            }} />
            <Text style={{
                fontSize:24,
                fontWeight:"bold",
                margin:10
            }}>Password:</Text>
            <View style={{
                flexDirection:"row",
                alignItems:"center"
            }}>
            <TextInput 
            secureTextEntry={show}
            autoCapitalize="none"
            value={password}
            onChangeText={(data)=>setPassword(data)}
            onKeyPress={()=>setMessage("")}
            autoFocus={true}
            style={{
                borderWidth:1,
                margin:10,
                padding:10,
                width:340,
                backgroundColor:"rgba(255,255,255,1)"
            }} />
            {show?
            <Eyeon name="eye" size={25} style={{
                right:45
            }} onPress={()=>setShow(!show)} />:<Eyeon name="eye-off" size={25} style={{right:45}} onPress={()=>setShow(!show)} />}
            </View>
            <Text style={{
                color:"red",textAlign:"center",fontSize:22
            }}>{message}</Text>
            <Text style={{
                fontSize:22,
                borderWidth:1,
                padding:10,
                top:10,
                textAlign:"center",
                margin:10
            }}
            onPress={loginHandle}
            >Login</Text>
        </ScrollView>
        </View>
    )
}
const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: "rgba(255,255,255,1)",
      },
      headerContainer: {
        backgroundColor: "wheat",
        borderWidth: StyleSheet.hairlineWidth,
        borderColor: "transparent",
        flexDirection: "row",
        alignItems: "center",
        padding: 30,
        justifyContent: "space-between",
   
      },
      headerText: {
        fontSize: 32,
        fontStyle: "normal",
    
        top: 10,
        right:10,
        fontWeight: "bold",
      },
})


export default LaptopLogin
