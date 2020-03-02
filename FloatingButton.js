import React, { Component } from "react";
import {
  StyleSheet,
  View,
  Image,
  Alert,
  Animated,
  TouchableOpacity,
  TouchableWithoutFeedback,
  Button,
  Text
} from "react-native";

import { Ionicons, AntDesign } from "@expo/vector-icons";
import { render } from "react-dom";
import Constants from "expo-constants";
import * as FileSystem from "expo-file-system";
import * as Permissions from "expo-permissions";
import * as MediaLibrary from "expo-media-library";
import { PermissionsAndroid } from "react-native";
export default class FloatingButton extends Component {
  constructor(props, param) {
    super(props, param);
    this.setState = {
      isValid: false
    };
  }

  animation = new Animated.Value(0);
  toggleMenu = () => {
    const toValue = this.open ? 0 : 1;
    Animated.spring(this.animation, {
      toValue,
      friction: 5
    }).start();
    this.open = !this.open;
  };

  render() {
    const pinStyle = {
      transform: [
        { scale: this.animation },
        {
          translateY: this.animation.interpolate({
            inputRange: [0, 1],
            outputRange: [0, -80]
          })
        }
      ]
    };
    const thumbStyle = {
      transform: [
        { scale: this.animation },
        {
          translateY: this.animation.interpolate({
            inputRange: [0, 1],
            outputRange: [0, -140]
          })
        }
      ]
    };
    const hearStyle = {
      transform: [
        { scale: this.animation },
        {
          translateY: this.animation.interpolate({
            inputRange: [0, 1],
            outputRange: [0, -200]
          })
        }
      ]
    };

    const rotation = {
      transform: [
        {
          rotate: this.animation.interpolate({
            inputRange: [0, 1],
            outputRange: ["0deg", "45deg"]
          })
        }
      ]
    };
    const opacity = this.animation.interpolate({
      inputRange: [0, 0.5, 1],
      outputRange: [0, 0, 1]
    });
    getPermissionAsync = async () => {
      if (Constants.platform.android) {
        const { status } = await Permissions.askAsync(Permissions.CAMERA_ROLL);
        if (status !== "granted") {
          alert("Sorry, we need camera roll permissions to make this work!");
        }
      }
    };

    async function requestCameraPermission() {
      try {
        const granted = await PermissionsAndroid.request(
          PermissionsAndroid.PERMISSIONS.CAMERA,
          {
            title: "Cool Photo App Camera Permission",
            message:
              "Cool Photo App needs access to your camera " +
              "so you can take awesome pictures.",
            buttonNeutral: "Ask Me Later",
            buttonNegative: "Cancel",
            buttonPositive: "OK"
          }
        );
        if (granted === PermissionsAndroid.RESULTS.GRANTED) {
          console.log("You can use the camera");
          this.setState({ isValid: true });
        } else {
          console.log("Camera permission denied");
        }
      } catch (err) {
        console.warn(err);
      }
    }

    downloadImage = async imageUrl => {
      requestCameraPermission();
      const uri = imageUrl;
      let fileUri = FileSystem.documentDirectory + "abc.jpg";
      FileSystem.downloadAsync(uri, fileUri)
        .then(({ uri }) => {
          MediaLibrary.saveToLibraryAsync(uri);
          // console.log(uri);
           Alert.alert('Saved')
        })
        .catch(error => {
          console.error(error);
        });
    };

    return (
      <View style={(styles.container, this.props.style)}>
        <TouchableWithoutFeedback
          // onPress={() => downloadImage(param.url_l)}
          onPress={() => downloadImage(this.props.url_l)}
         
          accessible={true}
        >
          <Animated.View style={[styles.button, styles.secondary, hearStyle]}>
            {/* <Ionicons name="md-download" size={24} color="#F02A4B" /> */}
            <Text style={{ fontSize: 9,color:'white' }}>1080x1920</Text>
            {/* <Text style={{ color: "red", fontSize: 11 }}>{param.first}</Text> */}
          </Animated.View>
        </TouchableWithoutFeedback>

        <TouchableWithoutFeedback
          // onPress={() => alert(param.url_z)}
          onPress={() => downloadImage(this.props.url_l)}
          accessible={true}
        >
          <Animated.View style={[styles.button, styles.secondary, thumbStyle]}>
            {/* <Ionicons name="md-download" size={24} color="#F02A4B" /> */}
            <Text style={{ fontSize: 9, color: "white" }}>576x1024</Text>
            {/* <Text style={{ color: "red", fontSize: 11 }}>
              {this.props.second} */}
            {/* </Text> */}
          </Animated.View>
        </TouchableWithoutFeedback>

        <TouchableWithoutFeedback
          onPress={() => downloadImage(this.props.url_l)}
          accessible={true}
        >
          <Animated.View style={[styles.button, styles.secondary, pinStyle]}>
            {/* <Ionicons name="md-download" size={24} color="#F02A4B" /> */}
            {/* <Text style={{ color: "red", fontSize: 11 }}>
              {this.props.third}
            </Text> */}
            <Text style={{ fontSize: 10, color: "white" }}>281x500</Text>
          </Animated.View>
        </TouchableWithoutFeedback>

        <TouchableWithoutFeedback
          accessible={true}
          onPress={(() => alert("aaaaa"), this.toggleMenu)}
        >
          <Animated.View style={[styles.button, styles.menu, rotation]}>
            <AntDesign name="plus" size={24} color="#FFF" />
          </Animated.View>
        </TouchableWithoutFeedback>

        {/* <Button title="clicked"
                    onPress={() => alert(), this.toggleMenu}
                /> */}
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#555",
    alignItems: "center",
    justifyContent: "center"
  },
  button: {
    position: "absolute",
    width: 60,
    height: 60,
    borderRadius: 60 / 2,
    alignItems: "center",
    justifyContent: "center",
    shadowRadius: 0.3,
    shadowOffset: { height: 10 }
  },
  menu: {
    backgroundColor: "#F02A4B"
  },
  secondary: {
    width: 50,
    height: 50,
    borderRadius: 50 / 2,
    backgroundColor: "#F02A4B"
  }
});
{
  /* <TouchableWithoutFeedback onPress={() => {
    alert("ddd"), alert("ddd")
}}>
    <View>
        <Animated.View style={[styles.button, styles.secondary, hearStyle]} >
            <AntDesign name="plus" size={24} color="#F02A4B" />
        </Animated.View>
    </View>
</TouchableWithoutFeedback>
<TouchableWithoutFeedback>
    <Animated.View style={[styles.button, styles.secondary, thumbStyle]} >
        <AntDesign name="plus" size={24} color="#F02A4B" />
    </Animated.View>
</TouchableWithoutFeedback>
<TouchableWithoutFeedback>
    <Animated.View style={[styles.button, styles.secondary, pinStyle]} >
        <AntDesign name="plus" size={24} color="#F02A4B" />
    </Animated.View>
</TouchableWithoutFeedback>
<TouchableWithoutFeedback onPress={() => alert(), this.toggleMenu}>
    <Animated.View style={[styles.button, styles.menu, rotation]} >
        <AntDesign name="plus" size={24} color="#FFF" />
    </Animated.View>
</TouchableWithoutFeedback> */
}
