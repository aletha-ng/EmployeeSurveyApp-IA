import React, {Component, useState} from 'react';
import {
  Text, 
  View,
  StyleSheet,
  Button,
  Alert,
  TextInput,
  Dimensions,
  ScrollView
} from 'react-native';
import ConsentForm from './components/consentFormEdit';

//Universal Constants
const { width, height } = Dimensions.get('window');

const app = () => {
  //Layout 
  return (
    <ScrollView 
    style={styles.mainContainer}
    contentContainerStyle={{alignItems: 'center'}}>
        <View style={styles.row}>
            <View style={styles.smallButton}>
            <Button
                title='Save'
            />
            </View>

            <View style={styles.smallButton}>
            <Button
                title='Delete'
            />
            </View>

            <View style={styles.smallButton}>
            <Button
                title='Publish'
            />
            </View>
        </View>

        <ConsentForm></ConsentForm>
        <View style={styles.button}>
            <Button
            title='Add Question'
            />
        </View>
    </ScrollView>
  );
};

export default app;

const styles = StyleSheet.create({
  //Container Styles
  mainContainer: {
    margin: 20,
  },

  row:{
    flexDirection: 'row',
    justifyContent: 'space-between',
  },

  button: {
    width: width * 0.8,
    borderWidth: 1,
    borderRadius: 5,
    backgroundColor: 'white',
    marginTop: 10, 
    marginBottom: 10
  },

  smallButton: {
    width: width * 0.25,
    borderWidth: 1,
    borderRadius: 5,
    backgroundColor: 'white',
    margin: 5
  }
});