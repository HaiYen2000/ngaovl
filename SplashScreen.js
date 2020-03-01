import React, { useEffect } from "react";
import { StyleSheet,Image, Text, View, StatusBar } from "react-native";
import { Asset } from "expo-asset";

export default function SplashScreen({ navigation }) {

useEffect (()=>{

   setTimeout(()=>{
     navigation.navigate('WallPaper')
   },3000)
 
})
  return (
    <View style={styles.container}>
     
      <Image
        style={{ height: 150, width: 150 }}
        source={{
          uri: "https://miro.medium.com/max/863/1*BFV8Gwt5BILa-xv04IK2ng.png"
        }}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#00bfff",
    alignItems: "center",
    justifyContent: "center"
  },
  title: {
    fontSize: 25,
    fontWeight: "bold",
    color: "#fff"
  }
});
