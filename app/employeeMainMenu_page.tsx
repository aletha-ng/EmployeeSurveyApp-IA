/**
 * Employee Main Menu Page: 
 * Provides navigation for employee to access their pages of the app.
*/

import React from 'react';
import { View, StyleSheet, Dimensions, Button, } from 'react-native';
import { useNavigation } from 'expo-router';

const app = () => {
  const navigation = useNavigation();

  return (
    <View style={styles.mainContainer}>
      <View style={styles.employeeMenuButton}>
        <Button title='Submit A Survey' color='white' onPress={() => navigation.navigate('answerSurvey_page')}/>
      </View>

      <View style={styles.employeeMenuButton}>
        <Button title='Profile' color='white' onPress={() => navigation.navigate('profile_page')}/>
      </View>
    </View>
  );
};


const { width, height } = Dimensions.get('window');
const styles = StyleSheet.create({
  mainContainer: {
    flex: 1,
    alignItems: 'center',
    backgroundColor: '#4682b4',
  },

  employeeMenuButton: {
    margin: 10,
    padding: 10,
    borderWidth: 1,
    width: width * 0.8,
    fontSize: 15,
  },
});

export default app;