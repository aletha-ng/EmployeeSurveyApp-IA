import React, {useState, useLayoutEffect} from 'react';
import {Text, View, StyleSheet, Button, Alert, TextInput, Dimensions,} from 'react-native';
import { useNavigation, CommonActions } from '@react-navigation/native';

const { width, height } = Dimensions.get('window');
const DEFAULT_PADDING = 20;
type ButtonType = 'Admin' | 'User'; 

const app = () => {
  //Text Box States
  const [email, onChangeEmail] = React.useState('');
  const [password, onChangePass] = React.useState('');

  //Button States
  const [selectedButton, setSelectedButton] = useState<ButtonType | null>(null);
  const handlePress = (button: ButtonType) => { 
    setSelectedButton(button);
  };

  //Other states
  const navigation = useNavigation();
  const [loginErrror, setLoginError] = useState(false);

  //Log in 
  const login = () => {
    //This shuold be replaced with the database of logging in
    const validLogin = email === 'admin@example.com' && password === 'admin123';
    if(!validLogin){
      setLoginError(true);
    }
    else{
      setLoginError(false);
      //enter what to do if login is successful
      //check admin/menu

      let route; 
      if(selectedButton == 'Admin'){
        route = 'G-adminMenu';
      }
      else{
        route = 'D-menuEmployee';
      }

      navigation.dispatch(
        CommonActions.reset({
          index: 0,
          routes: [{ name: route}], 
        })
      );
    }   
  }

  //Layout 
  return (
    <View style = {styles.mainContainer}>

      <View style = {styles.heading}>
        <Text style = {styles.heading}>Login as...</Text>
      </View>

      <View style = {styles.containerRow}>
        <View style = {[styles.shortButton, selectedButton === 'Admin' && styles.selectedButton]} >
          <Button 
            title="Admin"
            color="black"
            onPress={() => handlePress('Admin')} 
          />
        </View>

        <View style = {[styles.shortButton, selectedButton === 'User' && styles.selectedButton]} >
          <Button
            title="Employee"
            color="black"
            onPress={() => handlePress('User')} 
          />
        </View>
      </View>

      <View style = {styles.containerBatch}>
        <View style = {styles.containerBatch1}>
          <Text style = {styles.heading2}>Email</Text>
          <TextInput
            style={styles.input}
            onChangeText={onChangeEmail}
            value={email}
            autoCapitalize="none"
          />
        </View>
    
        <View style = {styles.containerBatch1}>
          <Text style = {styles.heading2}>Password</Text>
          <TextInput
            style={styles.input}
            onChangeText={onChangePass}
            value={password}
            autoCapitalize="none"
          />
        </View>
      </View>

      <View style = {styles.containerBatch2}>
        <View style = {styles.longButton}>
            <Button
              title="Log In"
              onPress={login}
            />
        </View>

        <View style = {styles.longButton}>
          <Button
            title="Forgot Password"
          />
        </View>
      </View>


      <View style = {styles.containerBatch3}>
        { loginErrror && (<Text style = {styles.heading2}>Invalid email or password</Text>)}
      </View>
    </View>
  );
};

export default app;


const styles = StyleSheet.create({
  //Container Styles
  mainContainer: {
    flex: 1,
    justifyContent: 'center',
    backgroundColor: '#6c7c8c'
  },

  containerRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    padding: DEFAULT_PADDING,
  },

  containerBatch: {
    justifyContent: 'center',
    padding: DEFAULT_PADDING,
  },

  containerBatch1: {
    //margin: 10,
  },

  containerBatch2: {
    alignContent: 'center',
    alignItems: 'center',
  },

  containerBatch3: {
    alignItems: 'center',
    margin: 10,
  },

  //Text Styles
  heading: {
    alignItems: 'center',
    padding: DEFAULT_PADDING,
    fontFamily: 'arial',
    fontWeight: 'bold',
    fontSize: 30,
  },

  heading2: {
    fontFamily: 'arial',
    fontWeight: 'bold',
    fontSize: 15,
  },

  //Component Styles
  input: {
    height: height * 0.05,
    width: width*0.8,
    justifyContent: 'center',
    margin: 10,
    borderWidth: 1,
    padding: 5,
  },

  shortButton: {
    borderColor: 'black',
    borderWidth: 1,
    justifyContent: 'center',
    width: width*0.4,
    height: height*0.05,
  },

  longButton: {
    borderColor: 'black',
    justifyContent: 'center',
    borderWidth: 1,
    width: width * 0.6,
    height: height * 0.05,
    margin: 10,
  },

  button: {
    backgroundColor: '#3498db',
    width: 100,
    height: 100,
  },

  selectedButton: {
    backgroundColor: '#c3d4d3', 
  },
});