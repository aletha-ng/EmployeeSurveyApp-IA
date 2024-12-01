import React, {useState} from 'react';
import {Text, View, StyleSheet, Alert, Dimensions, Pressable} from 'react-native';

//Universal Constants
const { width, height } = Dimensions.get('window');

const app = () => {
  const [isPressed, setIsPressed] = useState(false);

  const handlePress = async () => {
    setIsPressed(true);
    Alert.alert(`Button pressed`);
  };

  //Layout 
  return (
    <View style = {styles.mainContainer}>
      <Text>Draft Surveys</Text>
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
    padding: 10,
    borderWidth: 1,
  },

  containerBatch: {
    alignItems: 'center',
    padding: 10,
    borderWidth: 1,
  },

  containerBatch1: {
    margin: 10,
    borderWidth: 1,
  },

  //Text Styles
  heading: {
    alignItems: 'center',
    padding: 10,
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

  pressableBox:{
    width: width * 0.9,
    height: height * 0.1,
    backgroundColor: 'grey',
  },

});