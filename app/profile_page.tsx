/**
 * Profile Page:
 * Displays the logged in user's details and option for logging out
*/

import AsyncStorage from '@react-native-async-storage/async-storage';
import axios from 'axios';
import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, Button, Dimensions } from 'react-native';
import { useNavigation } from 'expo-router';
import { CommonActions } from '@react-navigation/native';


const app = () => {
  const navigation = useNavigation();
  const [user, setUser] = useState(null); 
  const [loading, setLoading] = useState(true); 
  const [userId, setUserId] = useState(null);

  /** 
   * Fetch User ID to match for user detail
   * Automatically runs once page is loaded
  */ 
  useEffect(() => {
    const getUserId = async () => {
      try {
        const storedUserId = await AsyncStorage.getItem('userID');
        if (storedUserId) {
          setUserId(storedUserId);
        } else {
          console.log("No user ID found");
        }
      } catch (error) {
        console.error('Error retrieving user_id:', error);
      }
    };

    getUserId();
  }, []);

  /** 
   * Fetch User details that match user ID
   * Will run everytime userID changes (e.g user changes)
  */ 
 
  useEffect(() => {
    //Making sure userId is not null to avoid user not found
    if (userId) {
      axios
        .get('http://localhost:5001/user', { params: { id: userId } })
        .then((response) => {
          const data = response.data;
          setUser(data);
          setLoading(false);
          console.log('Succesfully fetched data', data);
        })
        .catch((error) => {
          console.error('Error fetching user data:', error);
          setLoading(false);
        });
    }
    else {
      setLoading(false);
    }
  }, [userId]);

  const logout = async () => {
    try {
      await AsyncStorage.removeItem('userID');
      navigation.dispatch(
        CommonActions.reset({
          index: 0,
          routes: [{ name: 'index' }],
        })
      );
      console.log('User logged out');
      
    } catch (error) {
      console.error('Logout error:', error);
    }
  };

  if (loading) {
    return (
      <View style={styles.container}>
        <Text>Loading...</Text>
      </View>
    );
  }

  if (!user) {
    return (
      <View style={styles.container}>
        <Text>No user data found</Text>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <View style={styles.detailsContainer}>
        <Text style={styles.detailsText}>ID: {userId}</Text>
        <Text style={styles.detailsText}>Name: {user.user_name}</Text>
        <Text style={styles.detailsText}>Email: {user.user_email}</Text>
        <Text style={styles.detailsText}>Department: {user.user_department}</Text>
      </View>

      <View style={styles.logoutButtonContainer}>
        <Button title="Logout" onPress={logout} color="#ff6347" />
      </View>
    </View>
  );
};

const { width, height } = Dimensions.get('window');

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#4682b4',
    alignItems: 'center',
    justifyContent: 'center',
    padding: 20,
  },

  detailsContainer: {
    marginBottom: 30,
    width: '100%',
    borderWidth: 1,
    borderColor: 'black',
    borderRadius: 5,
    backgroundColor: 'white',
    padding: 10,

  },
  detailsText: {
    fontSize: 18,
    marginVertical: 5,
    color: 'black',
  },
  logoutButtonContainer: {
    width: width * 0.6,
    margin: 20,
    backgroundColor: 'white',
    borderRadius: 5,
    borderWidth: 1,
    borderColor: 'black',
  },
  submitButton: {
    backgroundColor: 'white',
    padding: 10,
    width: '40%',
    borderRadius: 5,
    alignItems: 'center',
    borderColor: 'black',
    margin: 10,
    borderWidth: 1,
  },
  submitButtonText: {
    color: 'black',
    fontSize: 16,
  },
  selectedBtn: {
    backgroundColor: '#8ab1b5',
  },
});

export default app;
