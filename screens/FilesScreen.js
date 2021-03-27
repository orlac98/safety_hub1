import React, { useContext } from "react";
import { AuthContext } from "../navigation/AuthProvider";
import { FAB } from "react-native-paper";
import CardView from 'react-native-cardview';
import Colours from '../constants/Colours';
import {
  Text,
  View,
  ListItem,
  List,
  Icon,
  Container,
  Header,
  Title,
  Content,
  Body,
  Button,
  Right,
  Item,
  Input,
  Left,
} from "native-base";
import { StyleSheet } from "react-native";
import { Platform } from "react-native";
import DocumentPicker from "react-native-document-picker";
import RNFetchBlob from "rn-fetch-blob";
import firebaseSetup from "../database/firebaseDb";
import AuthStack from "../navigation/AuthStack";
import firestore from "@react-native-firebase/firestore";
import { color } from "react-native-reanimated";

const FilesScreen = (props) => {
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

  function saveFileToRealtimeDatabase(downloadURL, file) {
    const uniquKey = database().ref().push().key;
    database()
      .ref(`allFiles/${uniquKey}`)
      .update({
        fileName: file.name,
        fileType: file.type,
        fileURL: downloadURL,
        userId: `${user.uid}`,
      });
  }
  React.useEffect(() => {
    //this is for development type
    setFilesList([]);
    //end

    const onChildAdded = database()
      .ref(`allFiles`)
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
  const deleteFile = (Id) => {
    // alert(Id);
  };

  return (
    <Container>
      {/* <Header>
        <Body style={{ flex: 1, alignItems: "center" }}>
          <Title> File </Title>
        </Body>
        <Right style={{ flex: 0.2 }}>
          <Button transparent onPress={chooseFile}>
            <Icon name="cloud-upload" type="MaterialIcons" />
          </Button>
          <Button transparent onPress={deleteAllFiles("Id")}>
            <Icon name="trash" />
          </Button>
        </Right>
      </Header> */}
      <Content>
        {filesList.map((item, index) => (
          <CardView
          // cardElevation={7}
          //     cardMaxElevation={7}
              cornerRadius={20}
              style={styles.card}
            key={index}
            
          >
            <Text onPress={() =>
              props.navigation.navigate("FilePreview", {
                fileData: item,
              })
            }>{item.fileName}</Text>
            <Button transparent onPress={() => deleteFile("Id")}>
              <Icon active name="trash" />
            </Button>
          </CardView>
        ))}
      </Content>
      <View>
        <FAB style={styles.fab} large icon="plus" onPress={chooseFile} />
        <FAB style={styles.fab} large icon="plus" onPress={chooseFile} />
      </View>
    </Container>
  );
};
export default FilesScreen;

const styles = StyleSheet.create({
  fab: {
    position: "absolute",
    margin: 16,
    right: 0,
    bottom: 0,
  },
  card: {
    backgroundColor: '#ffd9b3' ,
    alignItems: 'center',
    justifyContent: 'center',
    alignSelf: 'center',
    flex: 1,
    width: 200,
    marginTop: 30,
    margin: 20
  },
});
