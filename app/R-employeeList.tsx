import React, { useEffect, useState } from 'react';
import { View, Text, FlatList, StyleSheet, ActivityIndicator } from 'react-native';
import axios from 'axios';

const EmployeeListScreen = () => {
  const [employees, setEmployees] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    // Fetch employee list from the backend API
    axios
      .get('http://localhost:5001/getEmpList') 
      .then((response) => {
        setEmployees(response.data.employees);
        setLoading(false);
      })
      .catch((err) => {
        setError('Failed to load employee records');
        setLoading(false);
      });
  }, []);

  // Render employee data
  const renderItem = ({item}) => (
    <View style={styles.itemContainer}>
      <Text style={styles.itemText}>ID: {item.user_id}</Text>
      <Text style={styles.itemText}>Name: {item.user_name}</Text>
      <Text style={styles.itemText}>Email: {item.user_email}</Text>
      <Text style={styles.itemText}>Department: {item.user_department}</Text>
      <Text style={styles.itemText}>Role: {item.user_role}</Text>
    </View>
  );

  return (
    <View style={styles.container}>
      {loading ? (
        <ActivityIndicator size="large" color="#0000ff" />
      ) : error ? (
        <Text style={styles.errorText}>{error}</Text>
      ) : (
        <FlatList
          data={employees}
          renderItem={renderItem}
          keyExtractor={(item) => item.user_id.toString()} // Assuming 'user_id' is the unique ID
        />
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: '#4682b4'
  },
  itemContainer: {
    padding: 10,
    borderBottomWidth: 1,
    borderBottomColor: '#ccc',
    marginBottom: 10,
  },
  itemText: {
    fontSize: 16,
    color: 'white',
  },
  errorText: {
    fontSize: 18,
    color: 'red',
    textAlign: 'center',
  },
});

export default EmployeeListScreen;
