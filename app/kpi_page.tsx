import React, {useState, useEffect} from 'react';
import {View, Text, TextInput, TouchableOpacity, StyleSheet, ScrollView} from 'react-native';
import {LineChart} from 'react-native-chart-kit';
import {Dimensions} from 'react-native';
import axios from 'axios'; 

const kpiScreen = () => {
  const [numEmployeesBegin, setNumEmployeesBegin] = useState(0);
  const [numEmployeesEnd, setNumEmployeesEnd] = useState(0);
  const [numEmployeesLeft, setNumEmployeesLeft] = useState(0);
  const [numEmployeesStayed, setNumEmployeesStayed] = useState(0);

  //State to store retention and turnover rates
  const [retentionRate, setRetentionRate] = useState(0);
  const [turnoverRate, setTurnoverRate] = useState(0);

  useEffect(() => {
    //Fetch retention rate data 
    axios.get('http://localhost:5001/api/retention-rate')
      .then((response) => {
        const data = response.data[0]; 
        setNumEmployeesBegin(data.employee_at_start);
        setNumEmployeesEnd(data.employee_at_end);
      })
      .catch((error) => {
        console.error('Error fetching retention rate data:', error);
      });

    
    //Fetch turnover rate data 
    axios.get('http://localhost:5001/api/turnover-rate')
      .then((response) => {
        const data = response.data[0]; 
        setNumEmployeesLeft(data.employee_left_company);
        setNumEmployeesStayed(data.employee_stayed_company);
      })
      .catch((error) => {
        console.error('Error fetching turnover rate data:', error);
      });
  }, []); 

  //Calculate Retention Rate
  const calcRetentionRate = () => {
    return ((numEmployeesEnd - numEmployeesLeft) / numEmployeesBegin) * 100;
  };

  //Calculate Turnover Rate
  const calcTurnoverRate = () => {
    return (numEmployeesLeft / numEmployeesBegin) * 100;
  };

  const retentionGraphData = {
    labels: ['Begin', 'End'],
    datasets: [
      {
        data: [numEmployeesBegin, numEmployeesEnd], 
        strokeWidth: 2,  
      },
    ],
  };

  const turnoverGraphData = {
    labels: ['Left', 'Stayed'], 
    datasets: [
      {
        data: [numEmployeesLeft, numEmployeesStayed],  
        strokeWidth: 2,  
      },
    ],
  };

  return (
    <ScrollView style={styles.container}>
      {/* Retention Rate Section */}
      <View style={styles.section}>
        <Text style={styles.title}>Retention Rate</Text>
        <LineChart
          data={retentionGraphData}
          width={Dimensions.get('window').width - 40}
          height={220}
          yAxisSuffix="%"
          chartConfig={{
            backgroundColor: '#ffffff',
            backgroundGradientFrom: '#ffffff',
            backgroundGradientTo: '#ffffff',
            decimalPlaces: 2,
            color: (opacity = 1) => `rgba(0, 122, 255, ${opacity})`,
            labelColor: (opacity = 1) => `rgba(0, 0, 0, ${opacity})`,
            style: { borderRadius: 16 },
          }}
        />
        <Text style={styles.rateText}>Retention Rate: {calcRetentionRate().toFixed(2)}%</Text>
  
        {/* Admin Edit Section for Retention */}
        <View style={styles.editContainer}>
          <Text style={styles.editLabel}>Number of Employees at Beginning of Period:</Text>
          <TextInput
            style={styles.input}
            value={numEmployeesBegin.toString()}
            onChangeText={(text) => setNumEmployeesBegin(parseInt(text))}
            keyboardType="numeric"
          />
          <Text style={styles.editLabel}>Number of Employees at End of Period:</Text>

          <TextInput
            style={styles.input}
            value={numEmployeesEnd.toString()}
            onChangeText={(text) => setNumEmployeesEnd(parseInt(text))}
            keyboardType="numeric"
          />
          <Text style={styles.editLabel}>Number of Employees Left:</Text>
          
          <TextInput
            style={styles.input}
            value={numEmployeesLeft.toString()}
            onChangeText={(text) => setNumEmployeesLeft(parseInt(text))}
            keyboardType="numeric"
          />
        </View>
      </View>

      {/* Turnover Rate Section */}
      <View style={styles.section}>
        <Text style={styles.title}>Turnover Rate</Text>
        <LineChart
          data={turnoverGraphData}
          width={Dimensions.get('window').width - 40}
          height={220}
          yAxisSuffix="%"
          chartConfig={{
            backgroundColor: '#ffffff',
            backgroundGradientFrom: '#ffffff',
            backgroundGradientTo: '#ffffff',
            decimalPlaces: 2,
            color: (opacity = 1) => `rgba(255, 99, 132, ${opacity})`,
            labelColor: (opacity = 1) => `rgba(0, 0, 0, ${opacity})`,
            style: { borderRadius: 16 },
          }}
        />
        <Text style={styles.rateText}>Turnover Rate: {calcTurnoverRate().toFixed(2)}%</Text>
        
        {/* Admin Edit Section for Turnover */}
        <View style={styles.editContainer}>
          <Text style={styles.editLabel}>Number of Employees Left:</Text>
          <TextInput
            style={styles.input}
            value={numEmployeesLeft.toString()}
            onChangeText={(text) => setNumEmployeesLeft(parseInt(text))}
            keyboardType="numeric"
          />
        </View>
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: '#4682b4',
  },

  section: {
    marginBottom: 30,
    alignItems: 'center',
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 8,
    padding: 20,
  },

  title: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 10,
  },

  rateText: {
    fontSize: 18,
    fontWeight: 'bold',
    marginTop: 10,
  },

  editContainer: {
    width: '100%',
    marginTop: 20,
    paddingHorizontal: 20,
  },

  editLabel: {
    fontSize: 16,
    marginBottom: 8,
  },

  input: {
    borderColor: '#ccc',
    borderWidth: 1,
    borderRadius: 8,
    padding: 10,
    marginBottom: 15,
    width: '100%',
  },
});

export default kpiScreen;
