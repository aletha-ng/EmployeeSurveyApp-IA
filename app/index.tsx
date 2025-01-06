import React, {useState} from 'react';
import { Text, View, StyleSheet, Button, Alert, TextInput, Dimensions } from 'react-native';
import { CommonActions } from '@react-navigation/native';
import { useNavigation } from 'expo-router';
import axios from 'axios'; 
import AsyncStorage from '@react-native-async-storage/async-storage';
const { width, height } = Dimensions.get('window');

const App = () => {
  const navigation = useNavigation();
  const [email, onChangeEmail] = useState('');
  const [password, onChangePass] = useState('');

  const login = async () => {
    try {

      //Request to backend to check user's details
      const response = await axios.post('http://localhost:5001/login', {
        email: email,
        password: password
      });
  
      //If details of user are correct 
      if (response.status === 200) {
        const {user_role, user_id} = response.data;
      
        console.log('User role:', user_role);
        console.log('Login successful', response.data);

        //Save user_id in AsyncStorage
        await AsyncStorage.setItem('user_id', user_id.toString()); 

        //Setting the routes of main menu page according to user role passed back 
        let route = '';
        if(user_role == 'admin'){
          route = 'adminMainMenu_page';
        }
        else if(user_role == 'employee'){
          route = 'employeeMainMenu_page';
        }        
              
        //Resets navigation states to not allow user return to login page 
        navigation.dispatch(
          CommonActions.reset({
            index: 0,
            routes: [{name: route}],
          })
        );
      }
    } 
    
    catch (error) {
      if (error.response?.status === 404 || error.response?.status === 400) {
        Alert.alert('Unable to Login', 'Invalid email or password.', [{ text: 'OK' }]);
      } else {
        console.error('Login error:', error);
      }  
    }
  };
  

  return (
    <View style={styles.mainContainer}>
      <View style={styles.heading}>
        <Text style={styles.heading}>Login</Text>
      </View>

      <View style={styles.containerBatch}>
        <View>
          <Text style={styles.heading2}>Email</Text>
          <TextInput
            style={styles.input}
            onChangeText={onChangeEmail}
            value={email}
            autoCapitalize="none"
          />
        </View>

        <View>
          <Text style={styles.heading2}>Password</Text>
          <TextInput
            style={styles.input}
            onChangeText={onChangePass}
            value={password}
            autoCapitalize="none"
            secureTextEntry
          />
        </View>
      </View>

      <View style={styles.containerBatch2}>
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

export default App;

const styles = StyleSheet.create({
  mainContainer: {
    flex: 1,
    backgroundColor: '#4682b4',
    alignItems: 'center',
  },

  containerBatch: {
    justifyContent: 'center',
    padding: 20,
  },

  containerBatch2: {
    alignContent: 'center',
    alignItems: 'center',
  },

  heading: {
    alignItems: 'center',
    padding: 20,
    fontFamily: 'arial',
    fontWeight: 'bold',
    fontSize: 30,
    color: 'white',
  },

  heading2: {
    fontFamily: 'arial',
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
