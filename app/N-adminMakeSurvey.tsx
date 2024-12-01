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
import { useNavigation } from 'expo-router';
import SurveyTitle from './components/surveyTitle';

//Universal Constants
const { width, height } = Dimensions.get('window');
const DEFAULT_PADDING = 20;
type ButtonType = 'Admin' | 'User'; 

const app = () => {
  const navigation = useNavigation();
  //Text Box States
  const [text, onChangeText] = React.useState('Placeholder');
  const [text2, onChangeText2] = React.useState('Placeholder');

  //Button States
  const [selectedButton, setSelectedButton] = useState<ButtonType | null>(null);

  const handlePress = (button: ButtonType) => { // Specify the type here
    setSelectedButton(button);
    Alert.alert(`${button} Button pressed`);
  };

  //Layout 
  return (
    <View style = {styles.mainContainer}>
      <SurveyTitle></SurveyTitle>
    </View>
  );
};

export default app;


const styles = StyleSheet.create({
  //Container Formats
  mainContainer: {
    alignItems: 'center',
    margin: 30
  }
});