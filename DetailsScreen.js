import React, { useEffect } from "react";
import {
  StyleSheet,
  Image,
  Animated,
  TouchableWithoutFeedback,
  Button,
  Text,
  View
} from "react-native";
import ViewPager from "@react-native-community/viewpager";
import { Ionicons, AntDesign } from "@expo/vector-icons";
import SplashScreen from "./SplashScreen";
import WallPaper from "./WallPaper";
import FloatingButton from "./FloatingButton";
import { TouchableOpacity } from "react-native-gesture-handler";

export default function DetailsScreen({ navigation, route}) {
  const { url_l } = route.params;
  const { height_l } = route.params;
  const { width_l } = route.params;
  const { url_z } = route.params;
  const { height_z } = route.params;
  const { width_z } = route.params;
  const { url_m } = route.params;
  const { height_m } = route.params;
  const { width_m } = route.params;
  
  var first = height_l + "x" + width_l;
  var second = height_z + "x" + width_z;
  var third = height_m + "x" + width_m;
  

  console.log(height_l + "x" + width_l);
  return (
    <View style={styles.container}>
      <Text style={{ color: "white" }}>{JSON.stringify(height_l)}</Text>
      <Image style={styles.image} source={{ uri: url_l }} />
      <View style={styles.fab}>
        <FloatingButton first={first}  url_l={url_l} second={second} url_z={url_z} third={third} url_m={url_m} />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "black",
    alignItems: "center",
    justifyContent: "center",
  },
  image: {
    flex: 1,
    width: "100%",
    height: "100%",
    resizeMode: "contain"
  },
  fab: {
    position: "absolute",
    right: 80,
    bottom: 80
  }
});
