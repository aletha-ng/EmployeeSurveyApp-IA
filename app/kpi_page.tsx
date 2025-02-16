import React, { useState, useEffect } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, ScrollView, Modal } from 'react-native';
import { LineChart } from 'react-native-chart-kit';
import { Dimensions } from 'react-native';
import axios from 'axios';

const KpiScreen = () => {
  const [retentionData, setRetentionData] = useState([]);
  const [turnoverData, setTurnoverData] = useState([]);

  const [modalVisible, setModalVisible] = useState(false);
  const [date, setDate] = useState('');
  const [numEmployeesBegin, setNumEmployeesBegin] = useState('');
  const [numEmployeesEnd, setNumEmployeesEnd] = useState('');
  const [numEmployeesLeft, setNumEmployeesLeft] = useState('');

  useEffect(() => {
    // Fetch data on initial load
    axios.get('http://localhost:5001/api/retention-rate')
      .then(response => {
        const data = response.data.map((entry) => ({
          date: entry.period || 'Period 1', // Assuming API has a 'period' field
          numEmployeesBegin: entry.employee_at_start,
          numEmployeesEnd: entry.employee_at_end,
          numEmployeesLeft: entry.employee_left_company || 0,
        }));
        setRetentionData(data);
        setTurnoverData(data);
      })
      .catch(error => console.error('Error fetching data:', error));
  }, []);

  const handleAddData = () => {
    if (!date || !numEmployeesBegin || !numEmployeesEnd || !numEmployeesLeft) {
      alert('Please fill in all fields');
      return;
    }

    const newEntry = {
      date,
      numEmployeesBegin: parseInt(numEmployeesBegin),
      numEmployeesEnd: parseInt(numEmployeesEnd),
      numEmployeesLeft: parseInt(numEmployeesLeft),
    };

    setRetentionData((prev) => [...prev, newEntry]);
    setTurnoverData((prev) => [...prev, newEntry]);

    // Clear the input fields and close the modal
    setDate('');
    setNumEmployeesBegin('');
    setNumEmployeesEnd('');
    setNumEmployeesLeft('');
    setModalVisible(false);
  };

  const retentionGraphData = {
    labels: retentionData.map((entry) => entry.date),
    datasets: [
      {
        data: retentionData.map((entry) =>
          ((entry.numEmployeesEnd - entry.numEmployeesLeft) / entry.numEmployeesBegin) * 100
        ),
      },
    ],
  };

  const turnoverGraphData = {
    labels: turnoverData.map((entry) => entry.date),
    datasets: [
      {
        data: turnoverData.map((entry) =>
          (entry.numEmployeesLeft / entry.numEmployeesBegin) * 100
        ),
      },
    ],
  };

  return (
    <ScrollView style={styles.container}>
      <View style={styles.section}>
        <Text style={styles.title}>Retention Rate Over Time</Text>
        <LineChart
          data={retentionGraphData}
          width={Dimensions.get('window').width - 40}
          height={220}
          yAxisSuffix="%"
          chartConfig={chartConfig}
          style={styles.chart}
        />
      </View>

      <View style={styles.section}>
        <Text style={styles.title}>Turnover Rate Over Time</Text>
        <LineChart
          data={turnoverGraphData}
          width={Dimensions.get('window').width - 40}
          height={220}
          yAxisSuffix="%"
          chartConfig={chartConfig}
          style={styles.chart}
        />
      </View>

      <TouchableOpacity style={styles.addButton} onPress={() => setModalVisible(true)}>
        <Text style={styles.addButtonText}>Add Data</Text>
      </TouchableOpacity>

      <Modal visible={modalVisible} animationType="slide" transparent>
        <View style={styles.modalContainer}>
          <View style={styles.modalContent}>
            <Text style={styles.modalTitle}>Add New Data</Text>

            <TextInput
              style={styles.input}
              placeholder="Date (e.g., Q1 2024)"
              value={date}
              onChangeText={setDate}
            />
            <TextInput
              style={styles.input}
              placeholder="Number of Employees at Start"
              keyboardType="numeric"
              value={numEmployeesBegin}
              onChangeText={setNumEmployeesBegin}
            />
            <TextInput
              style={styles.input}
              placeholder="Number of Employees at End"
              keyboardType="numeric"
              value={numEmployeesEnd}
              onChangeText={setNumEmployeesEnd}
            />
            <TextInput
              style={styles.input}
              placeholder="Number of Employees Left"
              keyboardType="numeric"
              value={numEmployeesLeft}
              onChangeText={setNumEmployeesLeft}
            />

            <TouchableOpacity style={styles.submitButton} onPress={handleAddData}>
              <Text style={styles.submitButtonText}>Submit</Text>
            </TouchableOpacity>

            <TouchableOpacity style={styles.cancelButton} onPress={() => setModalVisible(false)}>
              <Text style={styles.cancelButtonText}>Cancel</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>
    </ScrollView>
  );
};

const chartConfig = {
  backgroundColor: '#ffffff',
  backgroundGradientFrom: '#ffffff',
  backgroundGradientTo: '#ffffff',
  decimalPlaces: 2,
  color: (opacity = 1) => `rgba(0, 122, 255, ${opacity})`,
  labelColor: (opacity = 1) => `rgba(0, 0, 0, ${opacity})`,
  style: { borderRadius: 16 },
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: '#f0f4f8',
  },
  section: {
    marginBottom: 20,
  },
  title: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 8,
  },
  chart: {
    marginVertical: 8,
    borderRadius: 16,
  },
  addButton: {
    backgroundColor: '#007AFF',
    padding: 12,
    borderRadius: 8,
    alignItems: 'center',
    marginVertical: 10,
  },
  addButtonText: {
    color: '#fff',
    fontSize: 16,
  },
  modalContainer: {
    flex: 1,
    justifyContent: 'center',
    backgroundColor: 'rgba(0,0,0,0.5)',
  },
  modalContent: {
    backgroundColor: '#fff',
    padding: 20,
    marginHorizontal: 30,
    borderRadius: 12,
    elevation: 5,
  },
  modalTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  input: {
    borderWidth: 1,
    borderColor: '#ddd',
    padding: 10,
    marginBottom: 10,
    borderRadius: 8,
  },
  submitButton: {
    backgroundColor: '#007AFF',
    padding: 10,
    borderRadius: 8,
    alignItems: 'center',
    marginVertical: 5,
  },
  submitButtonText: {
    color: '#fff',
    fontSize: 16,
  },
  cancelButton: {
    marginTop: 5,
    alignItems: 'center',
  },
  cancelButtonText: {
    color: '#007AFF',
  },
});

export default KpiScreen;




// import React, {useState, useEffect} from 'react';
// import {View, Text, TextInput, TouchableOpacity, StyleSheet, ScrollView} from 'react-native';
// import {LineChart} from 'react-native-chart-kit';
// import {Dimensions} from 'react-native';
// import axios from 'axios'; 

// const kpiScreen = () => {
//   const [numEmployeesBegin, setNumEmployeesBegin] = useState(0);
//   const [numEmployeesEnd, setNumEmployeesEnd] = useState(0);
//   const [numEmployeesLeft, setNumEmployeesLeft] = useState(0);
//   const [numEmployeesStayed, setNumEmployeesStayed] = useState(0);

//   //State to store retention and turnover rates
//   const [retentionRate, setRetentionRate] = useState(0);
//   const [turnoverRate, setTurnoverRate] = useState(0);

//   //ALSO MAYBE MODIFY THIS SO THE ADMIN CAN INPUT DATA PER YEAR OR QUARTER, ETC TO SHOW A GRAPH? 
//   //NECESSARY FORMULAS DELETE LATER
//   //(Number of employees at the end of a set time period / the number of employees at the start of a set time period) x 100 = retention rate percentage
//   //Turnover Rate = [(# of employee separations) / (average # of employees)] x 100

//   //Retention rate andn turover should be line chart 
//   //Satisfactionn should be bar chart 

//   useEffect(() => {
//     //Fetch retention rate data 
//     axios.get('http://localhost:5001/api/retention-rate')
//       .then((response) => {
//         const data = response.data[0]; 
//         setNumEmployeesBegin(data.employee_at_start);
//         setNumEmployeesEnd(data.employee_at_end);
//       })
//       .catch((error) => {
//         console.error('Error fetching retention rate data:', error);
//       });

    
//     //Fetch turnover rate data 
//     axios.get('http://localhost:5001/api/turnover-rate')
//       .then((response) => {
//         const data = response.data[0]; 
//         setNumEmployeesLeft(data.employee_left_company);
//         setNumEmployeesStayed(data.employee_stayed_company);
//       })
//       .catch((error) => {
//         console.error('Error fetching turnover rate data:', error);
//       });
//   }, []); 

//   //Calculate Retention Rate
//   const calcRetentionRate = () => {
//     return ((numEmployeesEnd - numEmployeesLeft) / numEmployeesBegin) * 100;
//   };

//   //Calculate Turnover Rate
//   const calcTurnoverRate = () => {
//     return (numEmployeesLeft / numEmployeesBegin) * 100;
//   };

//   const retentionGraphData = {
//     labels: ['Begin', 'End'],
//     datasets: [
//       {
//         data: [numEmployeesBegin, numEmployeesEnd], 
//         strokeWidth: 2,  
//       },
//     ],
//   };

//   const turnoverGraphData = {
//     labels: ['Left', 'Stayed'], 
//     datasets: [
//       {
//         data: [numEmployeesLeft, numEmployeesStayed],  
//         strokeWidth: 2,  
//       },
//     ],
//   };

//   return (
//     <ScrollView style={styles.container}>
//       {/* Retention Rate Section */}
//       <View style={styles.section}>
//         <Text style={styles.title}>Retention Rate</Text>
//         <LineChart
//           data={retentionGraphData}
//           width={Dimensions.get('window').width - 40}
//           height={220}
//           yAxisSuffix="%"
//           chartConfig={{
//             backgroundColor: '#ffffff',
//             backgroundGradientFrom: '#ffffff',
//             backgroundGradientTo: '#ffffff',
//             decimalPlaces: 2,
//             color: (opacity = 1) => `rgba(0, 122, 255, ${opacity})`,
//             labelColor: (opacity = 1) => `rgba(0, 0, 0, ${opacity})`,
//             style: { borderRadius: 16 },
//           }}
//         />
//         <Text style={styles.rateText}>Retention Rate: {calcRetentionRate().toFixed(2)}%</Text>
  
//         {/* Admin Edit Section for Retention */}
//         <View style={styles.editContainer}>
//           <Text style={styles.editLabel}>Number of Employees at Beginning of Period:</Text>
//           <TextInput
//             style={styles.input}
//             value={numEmployeesBegin.toString()}
//             onChangeText={(text) => setNumEmployeesBegin(parseInt(text))}
//             keyboardType="numeric"
//           />
//           <Text style={styles.editLabel}>Number of Employees at End of Period:</Text>

//           <TextInput
//             style={styles.input}
//             value={numEmployeesEnd.toString()}
//             onChangeText={(text) => setNumEmployeesEnd(parseInt(text))}
//             keyboardType="numeric"
//           />
//           <Text style={styles.editLabel}>Number of Employees Left:</Text>
          
//           <TextInput
//             style={styles.input}
//             value={numEmployeesLeft.toString()}
//             onChangeText={(text) => setNumEmployeesLeft(parseInt(text))}
//             keyboardType="numeric"
//           />
//         </View>
//       </View>

//       {/* Turnover Rate Section */}
//       <View style={styles.section}>
//         <Text style={styles.title}>Turnover Rate</Text>
//         <LineChart
//           data={turnoverGraphData}
//           width={Dimensions.get('window').width - 40}
//           height={220}
//           yAxisSuffix="%"
//           chartConfig={{
//             backgroundColor: '#ffffff',
//             backgroundGradientFrom: '#ffffff',
//             backgroundGradientTo: '#ffffff',
//             decimalPlaces: 2,
//             color: (opacity = 1) => `rgba(255, 99, 132, ${opacity})`,
//             labelColor: (opacity = 1) => `rgba(0, 0, 0, ${opacity})`,
//             style: { borderRadius: 16 },
//           }}
//         />
//         <Text style={styles.rateText}>Turnover Rate: {calcTurnoverRate().toFixed(2)}%</Text>
        
//         {/* Admin Edit Section for Turnover */}
//         <View style={styles.editContainer}>
//           <Text style={styles.editLabel}>Number of Employees Left:</Text>
//           <TextInput
//             style={styles.input}
//             value={numEmployeesLeft.toString()}
//             onChangeText={(text) => setNumEmployeesLeft(parseInt(text))}
//             keyboardType="numeric"
//           />
//         </View>
//       </View>
//     </ScrollView>
//   );
// };

// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//     padding: 20,
//     backgroundColor: '#4682b4',
//   },

//   section: {
//     marginBottom: 30,
//     alignItems: 'center',
//     borderWidth: 1,
//     borderColor: '#ccc',
//     borderRadius: 8,
//     padding: 20,
//   },

//   title: {
//     fontSize: 20,
//     fontWeight: 'bold',
//     marginBottom: 10,
//   },

//   rateText: {
//     fontSize: 18,
//     fontWeight: 'bold',
//     marginTop: 10,
//   },

//   editContainer: {
//     width: '100%',
//     marginTop: 20,
//     paddingHorizontal: 20,
//   },

//   editLabel: {
//     fontSize: 16,
//     marginBottom: 8,
//   },

//   input: {
//     borderColor: '#ccc',
//     borderWidth: 1,
//     borderRadius: 8,
//     padding: 10,
//     marginBottom: 15,
//     width: '100%',
//   },
// });

// export default kpiScreen;
