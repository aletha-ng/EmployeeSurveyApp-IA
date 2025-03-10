/**
 * KPI Page: 
 * Displays the data and charts relation to company KPI
*/

import React, { useEffect, useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, Alert, ScrollView, Dimensions } from 'react-native';
import axios from 'axios';
import { LineChart } from 'react-native-chart-kit';

const { width, height } = Dimensions.get('window');

const app = () => {
  const [startEmployees, setStartEmployees] = useState('');
  const [endEmployees, setEndEmployees] = useState('');
  const [selectedQuarter, setSelectedQuarter] = useState(null);
  const [kpiData, setKpiData] = useState([]);
  const [x, setX] = useState([]);
  const [pointsRetention, setPointsRetention] = useState([]);
  const [pointsTurnover, setPointsTurnover] = useState([]);
  const [loading, setLoading] = useState(true);
  const [lastR, setLastR] = useState('');
  const [lastT, setLastT] = useState('');

  const saveKpi = async () => {
    if (startEmployees.trim() == '' || endEmployees.trim() == '' || selectedQuarter == null) {
      Alert.alert("Please fill in all data.");
      return;
    }

    let quarterVal = 0;
    if (selectedQuarter === 'Q1') {
      quarterVal = 1;
    }
    if (selectedQuarter === 'Q2') {
      quarterVal = 2;
    }
    if (selectedQuarter === 'Q3') {
      quarterVal = 3;
    }
    if (selectedQuarter === 'Q4') {
      quarterVal = 4;
    }

    const kpiToSend = {
      quarter_month: quarterVal,
      num_employees_start: startEmployees,
      num_employees_end: endEmployees,
      submittedDate: new Date().toISOString().split('T')[0],
    };

    try {
      await axios.post('http://localhost:5001/kpis/new', kpiToSend);

      Alert.alert('KPI data saved');
      setStartEmployees('');
      setEndEmployees('');
      setSelectedQuarter(null);

    } catch (error) {
      Alert.alert('Unable to save kpi data, please try again');
    }
  };

  const fetchKpiData = async () => {
    try {
      const response = await axios.get('http://localhost:5001/kpis/all');
      setKpiData(response.data.results);
      setLoading(false);
    } catch (error) {
      setLoading(false);
    }
  };

  //To fetch KPI data once the page is loaded
  useEffect(() => {
    fetchKpiData();
  }, []);

  useEffect(() => {
    let retentionR = [];
    let turnoverR = [];
    let xAxis = [];

    kpiData.forEach(data => {
      retentionR.push(Number(data.retention_rate));
      turnoverR.push(Number(data.turnover_rate));
      xAxis.push(data.quarter_month);
    });

    setPointsRetention(retentionR);
    setPointsTurnover(turnoverR);
    setX(xAxis);

    setLastR(retentionR[retentionR.length - 1]);
    setLastT(turnoverR[retentionR.length - 1]);



  }, [kpiData]); //Page will update whenever kpiData is updated

  if (loading == true) {
    return (
      //Avoiding to load any charts with initialised values (empty values) before fetching 
      <View style={styles.container}>
        <Text>Loading...</Text>
      </View>
    );
  }

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Text style={styles.title}>KPI Dashboard</Text>

      <TextInput
        style={styles.input}
        placeholder='Insert Number of Employees at start of time period'
        placeholderTextColor='#adb2b3'
        keyboardType='numeric'
        value={startEmployees}
        onChangeText={setStartEmployees}
      />

      <TextInput
        style={styles.input}
        placeholder='Insert Number of Employees at end of time period'
        placeholderTextColor='#adb2b3'
        keyboardType='numeric'
        value={endEmployees}
        onChangeText={setEndEmployees}
      />

      <View style={styles.quarterGroup}>
        <Text style={styles.subTitle}>Select Quarter</Text>
        <View style={styles.buttonGroup}>
          
          {/*Creates array of four pressable buttons "Q1", "Q2", "Q3", and "Q4". */}
          {['Q1', 'Q2', 'Q3', 'Q4'].map((quarter) => (
            <TouchableOpacity
              key={quarter}
              style={[
                styles.button,
                selectedQuarter === quarter && styles.selectedButton,
              ]}
              onPress={() => setSelectedQuarter(quarter)}
            >
              <Text style={[styles.buttonText, selectedQuarter === quarter && styles.selectedButtonText,]}>
                {quarter}
              </Text>
            </TouchableOpacity>
          ))}
        </View>
      </View>

      <TouchableOpacity style={styles.submitButton} onPress={saveKpi}>
        <Text style={styles.submitButtonText}>Submit Data</Text>
      </TouchableOpacity>

      <TouchableOpacity style={styles.reloadBtn} onPress={fetchKpiData}>
        <Text style={styles.submitButtonText}>Reload New Chart</Text>
      </TouchableOpacity>

      <View style={styles.chartNTitleGroup}>
        <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
          <Text style={styles.chartTitle}>Latest Retention Rate</Text>
          <Text style={styles.chartTitle}>{lastR}%</Text>
        </View>
        <LineChart
          data={{
            labels: x,
            datasets: [{ data: pointsRetention, },],
          }}

          width={width - 40}
          height={height * 0.5}

          chartConfig={{
            backgroundGradientFrom: 'white',
            backgroundGradientTo: 'white',
            decimalPlaces: 1,
            color: (opacity = 1) => `blue`,
          }}
          yAxisSuffix="%"
        />
      </View>


      <View style={styles.chartNTitleGroup}>
        <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
          <Text style={styles.chartTitle}>Latest Turnover Rate</Text>
          <Text style={styles.chartTitle}>{lastT}%</Text>
        </View>
        <LineChart
          data={{
            labels: x,
            datasets: [{ data: pointsTurnover, },],
          }}
          width={width - 40}
          height={height * 0.5}
          chartConfig={{
            backgroundGradientFrom: 'white',
            backgroundGradientTo: 'white',
            decimalPlaces: 1,
            color: (opacity = 1) => `blue`,
          }}
          yAxisSuffix="%"
        />
      </View>


    </ScrollView>
  );
};



const styles = StyleSheet.create({
  container: {
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
    backgroundColor: '#4682b4',
  },
  title: {
    fontSize: 26,
    fontWeight: 'bold',
    marginBottom: 20,
  },
  input: {
    height: 40,
    borderColor: 'white',
    borderWidth: 1,
    marginBottom: 15,
    width: '100%',
    paddingHorizontal: 10,
    borderRadius: 5,
  },
  subTitle: {
    fontSize: 18,
    fontWeight: '500',
    marginTop: 20,
  },
  buttonGroup: {
    flexDirection: 'row',
    margin: 20,
  },
  button: {
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 5,
    backgroundColor: '#ddd',
    margin: 5,
    borderColor: 'white',
    borderWidth: 1,
  },
  selectedButton: {
    backgroundColor: '#007BFF',
    borderWidth: 1,

  },
  buttonText: {
    fontSize: 16,
    color: '#333',
  },
  selectedButtonText: {
    color: 'black',
  },
  message: {
    color: 'red',
    marginBottom: 10,
  },
  submitButton: {
    backgroundColor: '#8ab1b5',
    padding: 10,
    width: '100%',
    borderRadius: 5,
    marginBottom: 20,
    alignItems: 'center',
  },
  submitButtonText: {
    color: 'white',
    fontSize: 16,
  },
  reloadBtn: {
    backgroundColor: '#8ab1b5',
    padding: 10,
    width: '100%',
    borderRadius: 5,
    marginBottom: 20,
    alignItems: 'center',
  },

  chartTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    marginVertical: 10,
    marginHorizontal: 20,
  },
  quarterGroup: {
    alignItems: 'center',
    width: '100%',
    borderColor: 'white',
    borderWidth: 1,
    borderRadius: 5,
    marginBottom: 20,
  },
  chartNTitleGroup: {
    borderWidth: 1,
    borderColor: 'white',
    margin: 10,
    alignItems: 'center',
    borderRadius: 5,
  },
});

export default app;
