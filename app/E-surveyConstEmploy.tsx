import React, {Component, useState} from 'react';
import {
  Text, 
  View,
  StyleSheet,
  Button,
  Alert,
  TextInput,
  Dimensions,
  Image,
  Pressable,
} from 'react-native';

//Universal Constants
const { width, height } = Dimensions.get('window');
const DEFAULT_PADDING = 10; 
const DEFAULT_MARGIN = 10;

const styles = StyleSheet.create({
  //Container Styles
  mainContainer: {
    alignItems: 'center',
    borderWidth: 1,
  },

  containerRow: {
    flexDirection: 'row',
    justifyContent: 'flex-end',
    alignItems: 'flex-end',
    padding: DEFAULT_PADDING,
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

  heading3: {
    fontFamily: 'arial',
    fontSize: 12,
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
    margin: DEFAULT_MARGIN,
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

  surveyConsentTitle: {
    width: width * 0.9,
    height: height * 0.1,
    margin: DEFAULT_MARGIN,
    padding: DEFAULT_PADDING,
    borderWidth: 1,
  },

  surveyConsentText: {
    width: width * 0.9,
    margin: DEFAULT_MARGIN,
    padding: DEFAULT_PADDING,
    borderWidth: 1,
  },

});

const app = () => {
  const [isPressed, setIsPressed] = useState(false);

  const handlePress = async () => {
    setIsPressed(true);
    Alert.alert(`Button pressed`);
  };

  const [isChecked, setIsChecked] = useState(false);

  //Layout 
  return (
    <View style = {styles.mainContainer}>
     
     <View style = {styles.surveyConsentTitle}>
      <Text style = {styles.heading2}>Title</Text>
     </View>

     <View style = {styles.surveyConsentText}>
      <Text style = {styles.heading3}>Text</Text>
     </View>

    <View style = {styles.containerRow}>
      <Button
        title='next'
        onPress={handlePress}
      />
    </View>

    </View>
  );
};

export default app;