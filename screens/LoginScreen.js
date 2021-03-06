import React, {  useContext, useState } from "react";
import {
  View,
  Text,
  TouchableOpacity,
  Image,
  Platform,
  StyleSheet,
} from "react-native";
import FormInput from "../components/FormInput";
import FormButton from "../components/FormButton";
import SocialButton from "../components/SocialButton";
import { AuthContext } from "../navigation/AuthProvider";


const LoginScreen = ({ navigation }) => {
  const [email, setEmail] = useState();
  const [password, setPassword] = useState();
  const { login, googleLogin } = useContext(AuthContext);

  // const validateFields = (email, password) => {
  //   const isValid = {
  //     email: validator.isEmail(email),
  //     password: validator.isStrongPassword(password, {
  //       minLength: 6,
  //       minLowercase: 1,
  //       minUppercase: 1,
  //       minNumbers: 1,
  //     }),
  //   };
  //   return isValid;
  // };

  return (
    <View style={styles.container}>
      <Image source={require("../assets/logo.png")} style={styles.logo} />
      <Text style={styles.text}>SafetyHub</Text>

      {/* <View style={styles.errorMessage}>
        {this.state.errorMessage && 
        <Text style={styles.errorMessage}>
          {this.state.errorMessage}</Text>}
        </View> */}

      <FormInput
        labelValue={email}
        onChangeText={(userEmail) => setEmail(userEmail)}
        placeholderText="Email"
        iconType="user"
        autoCompleteType="email"
        keyboardType="email-address"
        autoCapitalize="none"
        autoCorrect={false}
      />

      <FormInput
        labelValue={password}
        onChangeText={(userPassword) => setPassword(userPassword)}
        placeholderText="Password"
        iconType="lock"
        secureTextEntry={true}
      />

      <FormButton
        buttonTitle="Sign In"
        onPress={
          () => { login(email, password)
            // const isAllValid = validateFields(
            //   email.text, password.text);
            // let isValid = true;
            // if (!isValid.email) {
            //   email.errorMessage = "Please enter a valid email";
            //    setEmail({ ...email });
            //   isAllValid = false;
            // }
            // if (!isValid.password) {
            //   password.errorMessage =
            //     "Password must be atleast 6 characters w/numbers & uppercase ";
            //    setPassword({ ...password });
            //   isAllValid = false;
            // }
          }}
         
        
      />

      <TouchableOpacity style={styles.forgotButton} onPress={() => {}}>
        <Text style={styles.navButtonText}>Forgot Password?</Text>
      </TouchableOpacity>

      {Platform.OS === "android" ? (
        <View>
          <SocialButton
            buttonTitle="Sign In with Google"
            btnType="google"
            color="#fd5f57"
            backgroundColor="#fff"
            onPress={() => googleLogin()}
          />
        </View>
      ) : null}

      <TouchableOpacity
        style={styles.forgotButton}
        onPress={() => navigation.navigate("Signup")}
      >
        <Text style={styles.navButtonText}>
          Don't have an acount? Create here
        </Text>
      </TouchableOpacity>
    </View>
  );
};

export default LoginScreen;

const styles = StyleSheet.create({
  container: {
    backgroundColor: "#2C3641",
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    padding: 20,
  },
  logo: {
    height: 150,
    width: 150,
    resizeMode: "cover",
  },
  text: {
    fontFamily: "Comfortaa-Regular",
    fontSize: 28,
    marginBottom: 10,
    color: "#FB8856",
  },
  navButton: {
    marginTop: 15,
  },
  forgotButton: {
    marginVertical: 35,
    color: "#FD5F57",
  },
  navButtonText: {
    fontSize: 18,
    fontWeight: "500",
    color: "#FD5F57",
    fontFamily: "Comfortaa-Regular",
  },
  errorMessage: {
    height: 72,
    alignItems: "center",
    justifyContent: "center",
    marginHorizontal: 30,
  },
});
