import React, { Component, useContext } from "react";
import { useState } from "react";
import { StyleSheet } from 'react-native'
import {
  Container,
 
  Content,
  Button,
  Item,
  Label,
  Input,
 
  Form,
  Text,
  H3,

} from "native-base";
import {addAsbestosform} from '../database/forms';
import storage from '@react-native-firebase/storage';
import firestore from '@react-native-firebase/firestore';
import 'firebase/firestore';
import {AuthContext} from '../navigation/AuthProvider';


const  Asbestos = () => {
  const {user, logout} = useContext(AuthContext);
  const [form, setForm] = useState(null);
  // const [name, setName] = useState("")
  // const [date, setDate] = useState("")
  // const [address, setAddress] = useState("")
  // const [no, setNo] = useState("")
  // const [code, setCode] = useState("")
  // const [client, setClient] = useState("")
  // const [clientD, setClientD] = useState("")
  // const [remove, setRemove] = useState("")
  // const [contact0, setContact0] = useState("")
  // const [contact1, setContact1] = useState("")

const addAsbestos = async => {

  firestore()
    .collection('forms')
    .add({
      userId: user.uid,
      post: post,
      postImg: imageUrl,
      postTime: firestore.Timestamp.fromDate(new Date()),
      likes: null,
      comments: null,
    })
    .then(() => {
      console.log('Post Added!');
      Alert.alert(
        'Post published!',
        'Your post has been published Successfully!',
      );
      setPost(null);
    })
    .catch((error) => {
      console.log('Something went wrong with added post to firestore.', error);
    });
  }
  // var AsbestosForms = {
  //   "name" : name, 
  //   "date" : date, 
  //   "address" : address, 
  //   "no" : no, 
  //   "code" : code, 
  //   "client" : client, 
  //   "clientD" : clientD, 
  //   "remove" : remove, 
  //   "contact0" : contact0, 
  //   "contact1" : contact1, 
  // }
  addAsbestosform(AsbestosForms, asbestosComplete)


function asbestosComplete() {
  navigation.navigate("FormsScreen")

    return (
      <Container style={styles.container}>
      
          
      

        <Content>
       
          <Form>
          <H3 style={styles.h1}>NOTIFICATION FORM TO BE USED FOR ANY WORK INVOLVING ASBESTOS</H3>
            <Item stackedLabel>
              <Label>Date of Notification</Label>
              <Input value={date}
              onChangeText={setDate}
                />
            </Item>
            <Item stackedLabel>
              <Label>Name of Notifier</Label>
              <Input value={name}
              onChangeText={setName} />
            </Item>
            <Item stackedLabel>
              <Label>Address</Label>
              <Input value={address}
              onChangeText={setAddress} />
            </Item>
            <Item stackedLabel>
              <Label>Telephone</Label>
              <Input value={no}
              onChangeText={setNo} />
            </Item>
            <Item stackedLabel>
              <Label>Eircode</Label>
              <Input value={code}
              onChangeText={setCode} />
            </Item>
            <Item stackedLabel>
              <Label>Name of Client:</Label>
              <Input value={client}
              onChangeText={setClient} />
            </Item>
            <Item stackedLabel>
              <Label>Contact details of Client:</Label>
              <Input value={clientD}
              onChangeText={setClientD} />
            </Item>
            <Item stackedLabel>
              <Label>Asbestos Removal Contractor:</Label>
              <Input value={remove}
              onChangeText={setRemove} />
            </Item>
            <Item stackedLabel>
              <Label>Contact person ??? name & number:</Label>
              <Input value={contact0}
              onChangeText={setContact0} />
            </Item>
            <Item stackedLabel>
              <Label><Item stackedLabel>
              <Label>Contact person ??? name & number:</Label>
              <Input value={contact1}
              onChangeText={setContact1} />
            </Item></Label>
              
            </Item>
          </Form>
          <Button block style={styles.button}
          onPress={() => addAsbestos()}>
            <Text>Submit</Text>
          </Button>
        </Content>
      </Container>
    );
    }
}

  export default Asbestos;

const styles = StyleSheet.create({
  container: {
    backgroundColor: "#fff"
  },
  button: {
    backgroundColor: '#45505d',
    margin: 15,
    marginTop: 50
  },
  h1: {
    textAlign: 'center',
   color: '#fb8856',
    margin: 2,
    marginTop: 8
  }
 
});




