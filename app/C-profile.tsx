import React, {Component, useState} from 'react';
import {Text, View,StyleSheet,Button,Alert,TextInput,Dimensions,Image} from 'react-native';

//Universal Constants
const { width, height } = Dimensions.get('window');
const DEFAULT_PADDING = 20;
type ButtonType = 'Press'; 

const app = () => {
  //Button States
  const [selectedButton, setSelectedButton] = useState<ButtonType | null>(null);

  const handlePress = (button: ButtonType) => { // Specify the type here
    setSelectedButton(button);
    Alert.alert(`${button} Button pressed`);
  };

  //Layout 
  return (
    <View style = {styles.mainContainer}>
      <View style = {styles.containerRow}>
        <Button 
              title="Back"
              color="black"
              onPress={() => handlePress('Press')} 
        />
        <Text>Profile</Text>      
        <Image 
          //source={require('../images/profpicplaceholder.webp')} 
          style={{ width: 50, height: 50 }} 
        />
      </View>
      
      <Image 
          //source={require('../images/profpicplaceholder.webp')} 
          style={styles.profile} 
        />

      <View style = {styles.containerBatch}>
        <Text>Profile Details</Text>

        <View style = {styles.containerBatch1}>
          <Text>Name</Text>
          <Text>Email</Text>
          <Text>ID</Text>

          <View style = {styles.containerRow}>
            <Text>Language</Text>
            <Button 
              title="English"
              color="black"
              onPress={() => handlePress('Press')} 
              />
              <Button 
              title="Indo"
              color="black"
              onPress={() => handlePress('Press')} 
              />
          </View>

          <Button 
              title="Logout"
              color="black"
              onPress={() => handlePress('Press')} 
              />
        </View>


      </View>

    </View>
  );
};

export default app;
const styles = StyleSheet.create({
  //Container Styles
  mainContainer: {
    alignItems: 'center',
  },

  containerRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    padding: DEFAULT_PADDING,
    borderWidth: 1,
  },

  containerBatch: {
    alignItems: 'center',
    padding: DEFAULT_PADDING,
    borderWidth: 1,
  },

  containerBatch1: {
    margin: 10,
    borderWidth: 1,
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
    backgroundColor: '#c3d4d3', // Background color when selected
  },

  profile: {
    width: width * 0.7,
    height: height * 0.3,
    margin: 10,
  },

});
