import React from 'react';
import { View, StyleSheet, Dimensions, Button, } from 'react-native';
import { useNavigation } from 'expo-router';

const app = () => {
  const navigation = useNavigation();
  return (
    <View style={styles.mainContainer}>
      <View style={styles.adminMenuButton}>
        <Button title='Employee Responses' color='white' onPress={() => navigation.navigate('response_page')} />
      </View>

      <View style={styles.adminMenuButton}>
        <Button title='Company KPIs' color='white' onPress={() => navigation.navigate('kpi_page')} />
      </View>

      <View style={styles.adminMenuButton}>
        <Button title='Employee Records' color='white' onPress={() => navigation.navigate('employeeRecords_page')} />
      </View>

      <View style={styles.adminMenuButton}>
        <Button title='Notify Employees' color='white' onPress={() => navigation.navigate('email_page')}
        />
      </View>

      <View style={styles.adminMenuButton}>
        <Button title='Profile' color='white' onPress={() => navigation.navigate('profile_page')} />
      </View>
    </View>
  );
};
export default app;

const { width, height } = Dimensions.get('window');
const styles = StyleSheet.create({
  mainContainer: {
    flex: 1,
    alignItems: 'center',
    backgroundColor: '#4682b4'
  },

  adminMenuButton: {
    margin: 10,
    padding: 10,
    borderWidth: 1,
    width: width * 0.8,
    fontSize: 15,
  },
});