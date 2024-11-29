import React, {Component, useState} from 'react';
import {
  Text, 
  View,
  StyleSheet,
  Button,
  Alert,
  TextInput,
  Dimensions,
} from 'react-native';

//Universal Constants
const { width, height } = Dimensions.get('window');
const DEFAULT_PADDING = 20;
type ButtonType = 'Press'; 

const styles = StyleSheet.create({
  //Container Styles
  mainContainer: {
    justifyContent: 'center',
  },

  containerRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    padding: DEFAULT_PADDING,
  },

  containerBatch: {
    alignItems: 'center',
    padding: DEFAULT_PADDING,
  },

  containerBatch1: {
    margin: 10,
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
    backgroundColor: '#c3d4d3', // Background color when selected
  },

});

const app = () => {
  //Text Box States
  const [text, onChangeText] = React.useState('Placeholder');
  const [text2, onChangeText2] = React.useState('Placeholder');
  const [text3, onChangeText3] = React.useState('Placeholder');
  const [text4, onChangeText4] = React.useState('Placeholder');

  //Button States
  const [selectedButton, setSelectedButton] = useState<ButtonType | null>(null);

  const handlePress = (button: ButtonType) => { // Specify the type here
    setSelectedButton(button);
    Alert.alert(`${button} Button pressed`);
  };

  //Layout 
  return (
    <View style = {styles.mainContainer}>

      <View style = {styles.containerBatch}>
        <View style = {styles.containerBatch1}>
          <Text style = {styles.heading2}>Email</Text>
          <TextInput
            style={styles.input}
            onChangeText={onChangeText}
            value={text}
          />
        </View>

        <View style = {styles.containerBatch1}>
          <Text style = {styles.heading2}>Code</Text>
          <TextInput
            style={styles.input}
            onChangeText={onChangeText2}
            value={text2}
          />
        </View>

        <View style = {styles.containerBatch1}>
          <Text style = {styles.heading2}>New Password</Text>
          <TextInput
            style={styles.input}
            onChangeText={onChangeText3}
            value={text3}
          />
        </View>
        
        <View style = {styles.containerBatch1}>
          <Text style = {styles.heading2}>Confirm Password</Text>
          <TextInput
            style={styles.input}
            onChangeText={onChangeText4}
            value={text4}
          />
        </View>

        <View style = {[styles.shortButton, selectedButton === 'Press' && styles.selectedButton]} >
        <Button 
            title="Confirm"
            color="black"
            onPress={() => handlePress('Press')} 
          />
        </View>

      </View>

    </View>
  );
};

export default app;