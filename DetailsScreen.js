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
import Constants from "expo-constants";
import * as FileSystem from "expo-file-system";
import * as Permissions from "expo-permissions";
import * as MediaLibrary from "expo-media-library";
import { PermissionsAndroid } from "react-native";
import ViewPager from "@react-native-community/viewpager";
import { Ionicons, AntDesign } from "@expo/vector-icons";
import SplashScreen from "./SplashScreen";
import WallPaper from "./WallPaper";
import FloatingButton from "./FloatingButton";
import { TouchableOpacity } from "react-native-gesture-handler";

export default function DetailsScreen({ navigation, route }) {
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

  let param = {
    first: { first },
    url_l: { url_l },
    second: { second },
    url_z: { url_z },
    third: { third },
    url_m: { url_m }
  };

  console.log(height_l + "x" + width_l);
  return (
    <View style={styles.container}>
      {/* <Text style={{ color: "white" }}>{JSON.stringify(height_l)}</Text> */}

      <ViewPager style={styles.viewPager} initialPage={0}>
        <View style={styles.page} key="1">
          <Image style={styles.image} source={{ uri: url_l }} />
        </View>
        <View style={styles.page} key="2">
          <Image
            style={{ width: 400, height: 250 }}
            source={{
              uri:
                "https://live.staticflickr.com/7670/17320009452_91e18c9a59_b.jpg"
            }}
          />
        </View>
        <View style={styles.page} key="3">
          <Image
            style={{ width: 400, height: 250 }}
            source={{
              uri:
                "https://live.staticflickr.com/3731/12468513504_401b9bf4a8_b.jpg"
            }}
          />
        </View>
        <View style={styles.page} key="4">
          <Image
            style={{ width: 400, height: 250 }}
            source={{
              uri:
                "https://live.staticflickr.com/3007/5839421567_c436038175_b.jpg"
            }}
          />
        </View>
        <View style={styles.page} key="5">
          <Image
            style={{ width: 400, height: 250 }}
            source={{
              uri:
                "https://live.staticflickr.com/5213/5538932857_458bdf3ee3_b.jpg"
            }}
          />
        </View>
      </ViewPager>

      <View style={styles.fab}>
        {/* <FloatingButton {...param} /> */}
        <FloatingButton
          first={first}
          url_l={url_l}
          second={second}
          url_z={url_z}
          third={third}
          url_m={url_m}
        />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "black",
    // alignItems: "center",
    // justifyContent: "center"
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
  },
  viewPager: {
    flex: 1
  },
  page: {
    justifyContent: "center",
    alignItems: "center"
  }
});
