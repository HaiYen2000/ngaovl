import React, { useEffect } from "react";
import { StyleSheet, Text, View } from "react-native";
import { getOrientationAsync } from "expo/build/ScreenOrientation/ScreenOrientation";


export default function SplashScreen({navigation}) {
 useEffect(()=>{
   setTimeout(()=>{
  this.navigation.navigate('WallPaper');

   },5000,this)
 })
  return (
  <View style={styles.container}>
<Text>hihi</Text>
  </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center"
  }
});
