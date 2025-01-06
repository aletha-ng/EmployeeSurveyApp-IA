import AsyncStorage from '@react-native-async-storage/async-storage';
import axios from 'axios';
import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, Image, Button, Dimensions } from 'react-native';

const UserProfile = () => {
  const [user, setUser] = useState(null); // State to store user data
  const [loading, setLoading] = useState(true); // State to manage loading state
  const [userId, setUserId] = useState(null);

   //Fetch User ID
   useEffect(() => {
    const getUserId = async () => {
        try {
            const storedUserId = await AsyncStorage.getItem('user_id');
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

  //Fetch user data 
  useEffect(() => {
    const fetchUserData = async () => {
        try {
            const response = await axios.get('http://your-backend-url/api/user', userId); 
            const data = await response.json();
            setUser(data); 
            setLoading(false); 
        } catch (error) {
            console.error('Error fetching user data:', error);
            setLoading(false);
        }
    };
    fetchUserData();
  }, []);

  //Logging Out
  const handleLogout = async () => {
    try {
        await AsyncStorage.removeItem('token');
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
      {/* User Profile Image */}
      <Image source={{uri: user.profileImage }} style={styles.profileImage} />

      {/* User Details */}
      <View style={styles.detailsContainer}>
        <Text style={styles.detailsText}>ID: {user.id}</Text>
        <Text style={styles.detailsText}>Name: {user.name}</Text>
        <Text style={styles.detailsText}>Email: {user.email}</Text>
        <Text style={styles.detailsText}>Department: {user.department}</Text>
      </View>

      {/* Logout Button */}
      <View style={styles.logoutButtonContainer}>
        <Button title="Logout" onPress={handleLogout} color="#ff6347" />
      </View>
    </View>
  );
};

const width = Dimensions.get('window');

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f0f8ff',
    alignItems: 'center',
    justifyContent: 'center',
    padding: 20,
  },
  
  profileImage: {
    width: width * 0.4,
    height: width * 0.4,
    borderRadius: width * 0.2, 
    marginBottom: 20,
  },
  detailsContainer: {
    marginBottom: 30,
  },
  detailsText: {
    fontSize: 18,
    marginVertical: 5,
    color: '#333',
  },
  logoutButtonContainer: {
    width: width * 0.6,
    marginTop: 20,
  },
});

export default UserProfile;
