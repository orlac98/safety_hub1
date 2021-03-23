import React, { Component } from "react";
import { StyleSheet } from 'react-native'
import {
  Container,
  Header,
  Title,
  Content,
  Button,
  Item,
  Label,
  Input,
  Body,
  Left,
  Right,
  Icon,
  Form,
  Text,
  H3,
} from "native-base";



class FloatingLabel extends Component {
    constructor(props) {
    super(props);
    this.state = { chosenDate: new Date() };
    this.setDate = this.setDate.bind(this);
  }
  setDate(newDate) {
    this.setState({ chosenDate: newDate });
  }
  render() {
    return (
      <Container style={styles.container}>
      
          
      

        <Content>
       
          <Form>
          <H3 style={styles.h1}>NOTIFICATION FORM TO BE USED FOR ANY WORK INVOLVING ASBESTOS</H3>
            <Item stackedLabel>
              <Label>Date of Notification</Label>
              <Input />
            </Item>
            <Item stackedLabel>
              <Label>Name of Notifier</Label>
              <Input  />
            </Item>
            <Item stackedLabel>
              <Label>Address</Label>
              <Input  />
            </Item>
            <Item stackedLabel>
              <Label>Telephone</Label>
              <Input  />
            </Item>
            <Item stackedLabel>
              <Label>Eircode</Label>
              <Input  />
            </Item>
            <Item stackedLabel>
              <Label>Name of Client:</Label>
              <Input  />
            </Item>
            <Item stackedLabel>
              <Label>Contact details of Client:</Label>
              <Input  />
            </Item>
            <Item stackedLabel>
              <Label>Asbestos Removal Contractor:</Label>
              <Input  />
            </Item>
            <Item stackedLabel>
              <Label>Contact person – name & number:</Label>
              <Input  />
            </Item>
            <Item stackedLabel>
              <Label><Item stackedLabel>
              <Label>Contact person – name & number:</Label>
              <Input  />
            </Item></Label>
              <Input  />
            </Item>
          </Form>
          <Button block style={styles.button}>
            <Text>Submit</Text>
          </Button>
        </Content>
      </Container>
    );
  }
}

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

export default FloatingLabel;