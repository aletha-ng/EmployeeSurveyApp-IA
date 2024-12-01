import React, {useState} from 'react';
import {Text, View, StyleSheet, Button, Alert, TextInput, Dimensions} from 'react-native';
import {CommonActions} from '@react-navigation/native';
import {useNavigation} from 'expo-router';

const {width, height} = Dimensions.get('window');

const app = () => {
  const navigation = useNavigation();
  const [loginErrror, setLoginErrorState] = useState(false);
  const [userRoleStatus, setUserRoleStatus] = useState(true);

  type ButtonType = 'Admin' | 'User';

  //Text Box States
  const [email, onChangeEmail] = React.useState('');
  const [password, onChangePass] = React.useState('');

  //Button States
  const [buttonSelected, setbuttonSelectedState] = useState<ButtonType | null>(null);
  const switchPage = (button: ButtonType) => {
    if (buttonSelected === button) {
      setbuttonSelectedState(null);
      setUserRoleStatus(false);
    } else {
      setbuttonSelectedState(button);
    }
  };

  //Log in 
  const testData = [
    { email: 'admin@example.com', password: 'admin123', role: 'Admin' },
    { email: 'employee@example.com', password: 'employee123', role: 'User' },
  ];


  const login = () => {
    if (!buttonSelected) {
      setLoginErrorState(true);
      Alert.alert('Please select either Admin or Employee to proceed.');
      return; 
    }

    //This shuold be replaced with the database of logging in
    const validLogin = testData.find(
      (user) => user.email === email && user.password === password && user.role === buttonSelected
    );
  
    if (!validLogin) {
      setLoginErrorState(true);
    }
    else {
      setLoginErrorState(false);
      //enter what to do if login is successful
      //check admin/menu

      let route;
      if (buttonSelected == 'Admin') {
        route = 'G-adminMenu';
      }
      else {
        route = 'D-menuEmployee';
      }

      navigation.dispatch(
        CommonActions.reset({
          index: 0,
          routes: [{ name: route }],
        })
      );
    }
  }

  //Layout 
  return (
    <View style={styles.mainContainer}>

    <View style={styles.heading}>
      <Text style={styles.heading}>Login</Text>
    </View>

    <View style={styles.containerRow}>
      <View style={[styles.shortButton, buttonSelected === 'Admin' && styles.buttonSelected]} >
        <Button
          title="Admin"
          color="black"
          onPress={() => switchPage('Admin')}
        />
      </View>

      <View style={[styles.shortButton, buttonSelected === 'User' && styles.buttonSelected]} >
        <Button
          title="Employee"
          color="black"
          onPress={() => switchPage('User')}
        />
      </View>
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
        />
      </View>
    </View>

    <View style={styles.containerBatch2}>
      <View style={styles.longButton}>
        <Button
          title="Log In"
          onPress={login}
        />
      </View>

      <View style={styles.longButton}>
        <Button
          title="Forgot Password"
        />
      </View>
    </View>


    <View style={styles.containerBatch3}>
      {(() => {
        if (loginErrror) {
          return <Text style={styles.heading2}>Invalid email or password</Text>;
        }
        else if (!userRoleStatus) {
            return <Text style={styles.heading2}>Please select either 'Admin' or 'Employee</Text>
        }
        else {
          return null;
        }
      })()}
    </View>
  </View>
  );
};

export default app;


const styles = StyleSheet.create({
  //Container Styles
  mainContainer: {
    flex: 1,
    backgroundColor: '#1c549e',
    alignItems: 'center'
  },

  containerRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    padding: 20,
  },

  containerBatch: {
    justifyContent: 'center',
    padding: 20,
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
    padding: 20,
    fontFamily: 'arial',
    fontWeight: 'bold',
    fontSize: 30,
    color: 'white'
  },

  heading2: {
    fontFamily: 'arial',
    fontWeight: 'bold',
    fontSize: 15,
    color: 'white'
  },

  //Component Styles
  input: {
    height: height * 0.05,
    width: width * 0.8,
    justifyContent: 'center',
    margin: 10,
    borderWidth: 1,
    padding: 5,
  },

  shortButton: {
    borderColor: 'black',
    borderWidth: 1,
    justifyContent: 'center',
    width: width * 0.4,
    height: height * 0.05,
    margin: 10
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

  buttonSelected: {
    backgroundColor: 'white',
  },
});