import React, { Component } from "react";
import {
  StyleSheet,
  View,
  Image,
  Animated,
  TouchableOpacity,
  TouchableWithoutFeedback,
  Button,
  Text
} from "react-native";

import { Ionicons, AntDesign } from "@expo/vector-icons";
import { render } from "react-dom";

export default class FloatingButton extends Component {

  constructor(props) {
    super(props);
    this.setState = {
      isValid: false
    }
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
          this.setState({isValid:true})
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
          console.log(uri);
        })
        .catch(error => {
          console.error(error);
        });
    };

    return (
      <View style={(styles.container, this.props.style)}>
        <TouchableWithoutFeedback
          onPress={() => downloadImage(this.props.url_l)}
          accessible={true}
        >
          <Animated.View style={[styles.button, styles.secondary, hearStyle]}>
            <AntDesign name="plus" size={24} color="#F02A4B" />
            <Text style={{ color: "red", fontSize: 10 ,marginRight:150}}>
              {this.props.first}
            </Text>
          </Animated.View>
        </TouchableWithoutFeedback>

        <TouchableWithoutFeedback
          onPress={() => alert("second")}
          accessible={true}
        >
          <Animated.View style={[styles.button, styles.secondary, thumbStyle]}>
            <AntDesign name="plus" size={24} color="#F02A4B" />
          </Animated.View>
        </TouchableWithoutFeedback>

        <TouchableWithoutFeedback
          accessible={true}
          onPress={() => alert("third")}
        >
          <Animated.View style={[styles.button, styles.secondary, pinStyle]}>
            <AntDesign name="plus" size={24} color="#F02A4B" />
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
    width: 40,
    height: 40,
    borderRadius: 40 / 2,
    backgroundColor: "#FFF"
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
