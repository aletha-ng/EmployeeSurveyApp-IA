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
import { Picker } from '@react-native-picker/picker';
import Dropdown from './components/questionTypeMenu';
import { DataTable } from 'react-native-paper';
import QuestionManager from './components/_testFile';
import SurveyTitle from './components/surveyTitle';

//Universal Constants
const { width, height } = Dimensions.get('window');
const DEFAULT_PADDING = 20;
const DEFAULT_MARGIN = 20;

const styles = StyleSheet.create({
  //Container Styles
  mainContainer: {
    justifyContent: 'center',
  },

  table: {

  },

  buttonRow: {

  },

  addPopUp: {

  },

  deletePopUp:{

  },


});

const app = () => {
    return (
      <View>
        <QuestionManager></QuestionManager>
        <Dropdown></Dropdown>
        <SurveyTitle></SurveyTitle>
      </View>
    );
  };
  
export default app;
  