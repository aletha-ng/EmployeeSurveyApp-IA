import React, { useState } from 'react';
import { Text, View, StyleSheet, Button, Alert, TextInput, Dimensions } from 'react-native';
import { CommonActions } from '@react-navigation/native';
import { useNavigation } from 'expo-router';

const { width, height } = Dimensions.get('window');

const App = () => {
  const navigation = useNavigation();
  const [loginError, setLoginErrorState] = useState(false);
  const [buttonSelected, setButtonSelectedState] = useState<'Admin' | 'User' | null>(null);

  // Text Box States
  const [email, onChangeEmail] = useState('');
  const [password, onChangePass] = useState('');

  const switchPage = (button: 'Admin' | 'User') => {
    if (buttonSelected === button) {
      setButtonSelectedState(null);
    } else {
      setButtonSelectedState(button);
    }
  };

  const login = () => {
    if (!buttonSelected) {
      setLoginErrorState(true);
      Alert.alert('Please select either Admin or Employee to proceed.');
      return;
    }

    // For the purpose of the frontend-only app, assume successful login based on role
    setLoginErrorState(false);

    // Navigate based on the selected role
    const route = buttonSelected === 'Admin' ? 'G-adminMenu' : 'D-menuEmployee';

    navigation.dispatch(
      CommonActions.reset({
        index: 0,
        routes: [{ name: route }],
      })
    );
  };

  return (
    <View style={styles.mainContainer}>
      <View style={styles.heading}>
        <Text style={styles.heading}>Login</Text>
      </View>

      <View style={styles.containerRow}>
        <View style={[styles.shortButton, buttonSelected === 'Admin' && styles.buttonSelected]}>
          <Button
            title="Admin"
            color="black"
            onPress={() => switchPage('Admin')}
          />
        </View>

        <View style={[styles.shortButton, buttonSelected === 'User' && styles.buttonSelected]}>
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

        <View style={styles.longButton}>
          <Button
            title="Forgot Password"
            color="white"
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

  shortButton: {
    borderColor: 'black',
    borderWidth: 1,
    justifyContent: 'center',
    width: width * 0.4,
    height: height * 0.05,
    margin: 10,
  },

  longButton: {
    borderColor: 'black',
    justifyContent: 'center',
    borderWidth: 1,
    width: width * 0.6,
    height: height * 0.05,
    margin: 10,
  },

  buttonSelected: {
    backgroundColor: 'white',
  },
});
