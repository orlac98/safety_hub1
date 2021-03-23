import React from "react";
import { View, Text, Button, StyleSheet } from "react-native";

const LearnScreen = ({ navigation }) => {
  return (
    <View style={styles.container}>
      <Text>Learn Screen</Text>
    </View>
  );
};

export default LearnScreen;

const styles = StyleSheet.create({
  container: {
    backgroundColor: "#FDF5F4",
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    padding: 20,
  },
});
