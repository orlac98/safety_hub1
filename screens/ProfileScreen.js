import React, { useContext } from "react";
import { View, Text, Button, StyleSheet } from "react-native";
import { Avatar, Title, Caption, TouchableRipple } from "react-native-paper";
import FormButton from "../components/FormButton";
import { AuthContext } from "../navigation/AuthProvider";
import Icon from "react-native-vector-icons/MaterialCommunityIcons";

const ProfileScreen = ({ navigation }) => {
  const { user, logout } = useContext(AuthContext);
  return (
    <View style={styles.userInfoSection} style={styles.container} >
      <View style={{   lineHeight: 26,
    backgroundColor: "#FDF5F4",flexDirection: "row", marginTop: 15, marginLeft: 10 }}>
        <Avatar.Image
          source={require("../assets/ProfilePic_001.png")}
          size={80}
          
        />
        <View style={{ marginLeft: 10 }}>
          <Title
            style={[
              styles.title,
              {
                marginTop: 15,
                marginBottom: 5,
              },
            ]}
          >
            Admin
          </Title>
          <Caption style={styles.caption}>@SafetyAdmin</Caption>
        </View>
      </View>
      <View style={styles.userInfoSection}>
        <View style={styles.row}>
          <Icon name="map-marker-radius" size={20} />
          <Text>Galway, Ireland</Text>
        </View>
        <View style={styles.row}>
          <Icon name="phone" size={20} />
          <Text>+353831234567</Text>
        </View>
        <View style={styles.row}>
          <Icon name="email" size={20} />
          <Text>Admin@admin.com</Text>
        </View>
      </View>
      <View style={styles.infoBoxWrapper}>
        <View
          style={[
            styles.infoBox,
            {
              borderRightColor: "#dddddd",
              borderRightWidth: 1,
            },
          ]}
        >
          <Title>7</Title>
          <Caption>New Files</Caption>
        </View>
        <View style={styles.infoBox}>
          <Title>3</Title>
          <Caption>Files Uploaded</Caption>
        </View>
      </View>

      <View style={styles.menuWrapper}>
        <TouchableRipple onPress={() => {}}>
          <View style={styles.menuItem}>
            <Icon name="calendar-check-outline" color="#FF6347" size={25} />
            <Text style={styles.menuItemText}>Tasks Complete</Text>
          </View>
        </TouchableRipple>
        <TouchableRipple onPress={() => {}}>
          <View style={styles.menuItem}>
            <Icon name="bell-outline" color="#FF6347" size={25} />
            <Text style={styles.menuItemText}>Alerts</Text>
          </View>
        </TouchableRipple>
        <TouchableRipple onPress={() => {}}>
          <View style={styles.menuItem}>
            <Icon name="upload-outline" color="#FF6347" size={25} />
            <Text style={styles.menuItemText}>Recently Uploaded</Text>
          </View>
        </TouchableRipple>
        <TouchableRipple onPress={() => {}}>
          <View style={styles.menuItem}>
            <Icon name="settings-outline" color="#FF6347" size={25} />
            <Text style={styles.menuItemText}>Settings</Text>
          </View>
        </TouchableRipple>
      </View>

      <View style={styles.container}>
        <Text style={styles.text}>Welcome {user.uid}</Text> 
        <FormButton buttonTitle="Logout" onPress={() => logout()} />
      </View>
    </View>
  );
};

export default ProfileScreen;

const styles = StyleSheet.create({
  userInfoSection: {
    paddingHorizontal: 10,
    marginBottom: 25,
    lineHeight: 26,
    backgroundColor: "#FDF5F4",
    flex: 1,
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
  },
  caption: {
    fontSize: 14,
    lineHeight: 14,
    fontWeight: "500",
  },
  row: {
    flexDirection: "row",
    marginBottom: 10,
    marginTop: 6,
    lineHeight: 26,
    backgroundColor: "#FDF5F4"
  },
  infoBoxWrapper: {
    borderBottomColor: "#dddddd",
    borderBottomWidth: 1,
    borderTopColor: "#dddddd",
    borderTopWidth: 1,
    flexDirection: "row",
    height: 100,
    
  },
  infoBox: {
    width: "50%",
    alignItems: "center",
    justifyContent: "center",
    lineHeight: 26,
    backgroundColor: "#FDF5F4"
  },
  menuWrapper: {
    marginTop: 10,
    
  },
  menuItem: {
    flexDirection: "row",
    paddingVertical: 15,
    paddingHorizontal: 30,
    lineHeight: 26,
     backgroundColor: "#FDF5F4"
  },
  menuItemText: {
    color: "#777777",
    marginLeft: 20,
    fontSize: 16,
  
  },
  container: {
    flex: 1,
    backgroundColor: "#FDF5F4",
  },
});
