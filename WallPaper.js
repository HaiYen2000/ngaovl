import React, { useState, useEffect } from "react";
import {
  StyleSheet,
  Text,
  View,
  Button,
  FlatList,
  TouchableOpacity,
  Image
} from "react-native";
import Constants from "expo-constants";
import * as FileSystem from "expo-file-system";
import * as Permissions from "expo-permissions";
import * as MediaLibrary from "expo-media-library";
import { PermissionsAndroid } from "react-native";
export default function WallPaper() {
  const [valid, setValid] = useState(false);

  useEffect(() => {
    fetch("https://www.flickr.com/services/rest", {
      method: "POST",
      body: new URLSearchParams({
        api_key: "561ba0b1f9a7d1b42c8b4e14656bc011",
        user_id: "187062262@N04",
        extras:
          "id, title, date_faved, views, media, path_alias, url_sq, url_t, url_c, url_l, url_o",
        format: "json",
        method: "flickr.favorites.getList",
        nojsoncallback: "1",
        per_page: "20",
        page: "0"
      }).toString(),
      headers: {
        "Content-Type": "application/x-www-form-urlencoded"
      }
    })
      .then(response => response.json())
      .then(data => {
        setMang(data.photos.photo);
      });
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
        setValid(true);
      } else {
        console.log("Camera permission denied");
      }
    } catch (err) {
      console.warn(err);
    }
  }

  downloadImage = async imageUrl => {
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

  const [mang, setMang] = useState();
  return (
    <View style={styles.container}>
      <FlatList
        style={{ marginBottom: 20, marginTop: 20 }}
        data={mang}
        renderItem={({ item }) => (
          <View style={styles.imgbox}>
            <Text style={styles.titleImage}> {item.title}</Text>
            <Image
              style={{
                width: 400,
                height: 300,
                marginLeft: 5
              }}
              source={{ uri: item.url_c }}
            />
            <TouchableOpacity
              style={styles.btn}
              onPress={() => {
                if (!valid) {
                  requestCameraPermission();
                }
                // getPermissionAsync();
                downloadImage(item.url_c);
              }}
            >
              <Image
                style={{ width: 30, height: 30 }}
                source={require("./assets/baseline_arrow_downward_white_36dp.png")}
              />
            </TouchableOpacity>

            <View style={styles.ngang}>
              <View style={styles.action}>
                <Image
                  style={{ width: 30, height: 30, margin: 10 }}
                  source={{
                    uri:
                      "https://cdn1.iconfinder.com/data/icons/essential-21/128/Love-512.png"
                  }}
                />
                <Text style={styles.nameac}>Like</Text>
              </View>

              <View style={styles.action}>
                <Image 
                  style={{ width: 30, height: 30, margin: 10 }}
                  source={{
                    uri: "https://cdn.onlinewebfonts.com/svg/img_53862.png"
                  }}
                />
                <Text style={styles.nameac}>Comment</Text>
              </View>
            </View>
          </View>
        )}
        keyExtractor={item => item.id}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center"
  },
  btn: {
    position: "absolute",
    width: 50,
    height: 50,
    borderRadius: 30,
    backgroundColor: "black",
    alignItems: "center",
    justifyContent: "center",
    marginTop: 335,
    marginLeft: 350
  },
  plus: {
    fontSize: 25
  },
  ngang: {
    flexDirection: "row",
    margin: 10,
    
  },
  titleImage: {
    fontSize: 22,
    fontWeight: "bold",
    marginLeft: 20
  },
  imgbox: {
    borderRadius: 15,
    backgroundColor: "#f5f5f5",
    marginBottom: 20,
  },
  action: {
    flexDirection:'row'
  },
  nameac:{
    marginTop:10
  }
});
