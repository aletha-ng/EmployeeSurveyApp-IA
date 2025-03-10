/**
 * Login Page
*/

import React, { useState } from 'react';
import { Text, View, StyleSheet, Button, Alert, TextInput, Dimensions } from 'react-native';
import { CommonActions } from '@react-navigation/native';
import { useNavigation } from 'expo-router';
import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';
const { width, height } = Dimensions.get('window');

const app = () => {
  const navigation = useNavigation();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const login = async () => {
    try {
      //Request to backend to check user's details
      const response = await axios.post('http://localhost:5001/login', {
        email: email,
        password: password
      });

      const {userRole, userID} = response.data;

      //Save userID in AsyncStorage for use during user session
      await AsyncStorage.setItem('userID', userID.toString());

      let route = '';
      if (userRole == 'admin') {
        route = 'adminMainMenu_page';
      }
      else if (userRole == 'employee') {
        route = 'employeeMainMenu_page';
      }

      //Resets navigation states to not allow user return to login page 
      navigation.dispatch(
        CommonActions.reset({
          index: 0,
          routes: [{ name: route }],
        })
      );

    } catch (error) {
      Alert.alert('Unable to Login', 'Invalid email or password, please try again', [{ text: 'OK' }]);
      console.log(error);
    }
  };

  return (
    <View style={styles.mainContainer}>
      <View style={styles.heading}>
        <Text style={styles.heading}>Login</Text>
      </View>

      <View style={styles.upperContainer}>
        <View>
          <Text style={styles.heading2}>Email</Text>
          <TextInput
            style={styles.input}
            onChangeText={setEmail}
            value={email}
            autoCapitalize="none"
          />
        </View>

        <View>
          <Text style={styles.heading2}>Password</Text>
          <TextInput
            style={styles.input}
            onChangeText={setPassword}
            value={password}
            autoCapitalize="none"
            secureTextEntry
          />
        </View>
      </View>

      <View style={styles.lowerContainer}>
        <View style={styles.longButton}>
          <Button
            title="Log In"
            color="white"
            onPress={login}
          />
        </View>

      </View>
    </View>
  );
};


const styles = StyleSheet.create({
  mainContainer: {
    flex: 1,
    backgroundColor: '#4682b4',
    alignItems: 'center',
  },

  upperContainer: {
    justifyContent: 'center',
    padding: 20,
  },

  lowerContainer: {
    alignContent: 'center',
    alignItems: 'center',
  },

  heading: {
    alignItems: 'center',
    padding: 20,
    fontWeight: 'bold',
    fontSize: 30,
    color: 'white',
  },

  heading2: {
    fontWeight: 'bold',
    fontSize: 15,
    color: 'white',
  },

  input: {
    height: height * 0.05,
    width: width * 0.8,
    justifyContent: 'center',
    margin: 10,
    borderWidth: 1,
    padding: 5,
  },

  longButton: {
    borderColor: 'black',
    justifyContent: 'center',
    borderWidth: 1,
    width: width * 0.6,
    height: height * 0.05,
    margin: 10,
  },
});

export default app;