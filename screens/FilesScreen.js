import React, { useContext } from "react";
import { AuthContext } from "../navigation/AuthProvider";
import { FAB } from "react-native-paper";
import CardView from "react-native-cardview";
import Colours from "../constants/Colours";
import {
  Text,
  View,
  Icon,
  Container,
  Content,
  Button,
} from "native-base";
import { StyleSheet } from "react-native";
import { Platform } from "react-native";
import DocumentPicker from "react-native-document-picker";
import RNFetchBlob from "rn-fetch-blob";
import firebaseSetup from "../database/firebaseDb";
import AuthStack from "../navigation/AuthStack";
import firestore from "@react-native-firebase/firestore";
import { color } from "react-native-reanimated";
import ColourSelector from "../components/ColourSelector";
import firebase from "@react-native-firebase/app";
import { remove } from "lodash";

const FilesScreen = (props) => {

  firebase.auth().onAuthStateChanged((user) => {
    if (user) {
      console.log("User email: ", user.email);
    }
  });
  const { storage, database } = firebaseSetup();
  const [filesList, setFilesList] = React.useState([]);
  const { user } = useContext(AuthContext);

  //we can choose all types of files here
  async function chooseFile() {
    // Pick a single file
    try {
      const file = await DocumentPicker.pick({
        type: [DocumentPicker.types.allFiles],
      });
      const path = await normalizePath(file.uri);
      const result = await RNFetchBlob.fs.readFile(path, "base64");
      uploadFileToFirebaseStorage(result, file, user);
      console.log(result);
    } catch (err) {
      if (DocumentPicker.isCancel(err)) {
        // User cancelled the picker, exit any dialogs or menus and move on
      } else {
        throw err;
      }
    }
  }
  // we have to remove prefix from path url
  async function normalizePath(path) {
    if (Platform.OS === "ios" || Platform.OS === "android") {
      const filePrefix = "file://";
      if (path.startsWith(filePrefix)) {
        path = path.substring(filePrefix.length);
        try {
          path = decodeURI(path);
        } catch (e) {}
      }
    }
    return path;
  }

  async function uploadFileToFirebaseStorage(result, file) {
    const uploadTask = storage()
      .ref(`allFiles/${file.name}`)
      .putString(result, "base64", { contentType: file.type });

    uploadTask.on(
      "state_changed",
      (snapshot) => {
        // Observe state change events such as progress, pause, and resume
        // Get task progress, including the number of bytes uploaded and the total number of bytes to be uploaded
        var progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
        switch (snapshot.state) {
          case storage.TaskState.PAUSED: // or 'paused'
            break;
          case storage.TaskState.RUNNING: // or 'running'
            break;
        }
      },
      function (error) {
        console.log(error);
        // Handle unsuccessful uploads
      },
      function () {
        // Handle successful uploads on complete

        uploadTask.snapshot.ref.getDownloadURL().then(function (downloadURL) {
          saveFileToRealtimeDatabase(downloadURL, file);
        });
      }
    );
  }
  const uniquKey = database().ref().child(`allFiles`).push().key;

  function saveFileToRealtimeDatabase(downloadURL, file) {
    // const uniquKey = database().ref().push().key;
    database().ref(`allFiles/${user.uid}/${uniquKey}`).update({
      fileName: file.name,
      fileType: file.type,
      fileURL: downloadURL,
      // userId: `${user.uid}`,
    });
    
  }

  const  deleteFile = Item =>  {
      // const uniquKey = database().ref(`allFiles/${user.uid}/${uniquKey}`).key;
    database()
      .ref(`allFiles/${user.uid}` )
      .remove()
      .then(() => {})
      .catch((err) => {
        console.log(err);
      });
  };


  React.useEffect(() => {
    //this is for development type
    setFilesList([]);
    //end

    const onChildAdded = database()
      .ref(`allFiles/${user.uid}/`)
      .on("child_added", (snapshot) => {
        let helperArr = [];
        helperArr.push(snapshot.val());
        setFilesList((files) => [...files, ...helperArr]);
      });
    return () => database().ref(`allFiles`).off("child_added", onChildAdded);
  }, []);

  const deleteAllFiles = (Id) => {
    // alert(Id);
  };
  

  return (
    <Container  >
      <Content  >
        {filesList.map((item, index) => (
          <View style={styles.row} >
          <CardView
            cardElevation={7}
                cardMaxElevation={7}
            cornerRadius={20}
            style={styles.card}
            key={index}
          >
            <Text
              style={styles.text}
              onPress={() =>
                props.navigation.navigate("FilePreview", {
                  fileData: item,
                })
              }
            >
              {item.fileName}
            </Text>
            <Button
              style={styles.icon}
              transparent
            
              onPress={() => deleteFile("Item")}
            >
              <Icon style={styles.icon} active name="trash" />
            </Button>
          </CardView>
          </View>
        ))}
      </Content>

      <View>
        <FAB style={styles.fab} large icon="plus" onPress={chooseFile} />
      </View>
    </Container>
  );
};
export default FilesScreen;

const styles = StyleSheet.create({
  fab: {
    position: "absolute",
    backgroundColor: Colours.orange,
    margin: 16,
    right: 0,
    bottom: 0,
  },
  card: {
    backgroundColor: Colours.lightgrey,
     alignItems: "center",
    justifyContent: "center",
    // alignSelf: "center",
   
    width: 150,
    marginTop: 30,
    margin: 10,
    flexDirection: "row",
    flexWrap: "wrap",
    
  },
  icon: {
    color: Colours.red,

    alignSelf: "center",
    justifyContent: "center",
  },
  text: {
    color: Colours.white,
  },
  row: {
    flexDirection: "row",
    flexWrap: "wrap",
    alignContent: "space-between",
    justifyContent: "center",
  }
});
