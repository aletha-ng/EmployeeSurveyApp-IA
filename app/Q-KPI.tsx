import React, { useState } from 'react';
import { View, Text, Button, TextInput, StyleSheet, Dimensions, ScrollView } from 'react-native';
import { BarChart, PieChart } from 'react-native-chart-kit';

// Mock Data
const mockData = [
  { period: 1, start: 1000, end: 900 },
  { period: 2, start: 900, end: 850 },
  { period: 3, start: 850, end: 700 },
  { period: 4, start: 700, end: 690 },
];

export default function App() {
  const [currentScreen, setCurrentScreen] = useState('Dashboard');
  const [tableData, setTableData] = useState(mockData);
  const [satisfactionRatings, setSatisfactionRatings] = useState([24, 30, 29, 38, 38]);

  // Helper function to calculate average
  const calculateAverage = (data) => {
    const total = data.reduce((sum, value) => sum + value, 0);
    return (total / data.length).toFixed(2);
  };

  // Dashboard Screen
  const DashboardScreen = () => {
    const retentionRate = 57; // Percentage
    const turnoverRate = 30; // Percentage

    const barChartData = {
      labels: ['Start of Period', 'End of Period'],
      datasets: [{ data: [50, 40] }],
    };

    const pieChartData = [
      { name: 'Stayed', population: 60, color: '#4CAF50', legendFontColor: '#7F7F7F', legendFontSize: 15 },
      { name: 'Left', population: 40, color: '#F44336', legendFontColor: '#7F7F7F', legendFontSize: 15 },
    ];

    const satisfactionChartData = {
      labels: ['1', '2', '3', '4', '5'],
      datasets: [{ data: satisfactionRatings }],
    };

    return (
      <ScrollView style={styles.container}>
        <Text style={styles.header}>KPIs</Text>

        {/* Retention Rate */}
        <Text style={styles.subHeader}>Employee Retention Rate</Text>
        <Text style={styles.percentage}>{retentionRate}%</Text>
        <BarChart
          data={barChartData}
          width={Dimensions.get('window').width - 50}
          height={220}
          chartConfig={{
            backgroundColor: '#ffffff',
            backgroundGradientFrom: '#ffffff',
            backgroundGradientTo: '#ffffff',
            decimalPlaces: 1,
            color: (opacity = 1) => `rgba(0, 0, 255, ${opacity})`,
          }}
          style={styles.chart}
        />
        <Button title="Update Data" onPress={() => setCurrentScreen('Update')} />

        {/* Turnover Rate */}
        <Text style={styles.subHeader}>Employee Turnover Rate</Text>
        <Text style={styles.percentage}>{turnoverRate}%</Text>
        <PieChart
          data={pieChartData}
          width={Dimensions.get('window').width - 50}
          height={220}
          chartConfig={{
            color: (opacity = 1) => `rgba(255, 0, 0, ${opacity})`,
          }}
          accessor="population"
          backgroundColor="transparent"
          paddingLeft="15"
          style={styles.chart}
        />
        <Button title="Update Data" onPress={() => setCurrentScreen('Update')} />

        {/* Satisfaction Rate */}
        <Text style={styles.subHeader}>Employee Satisfaction Rate</Text>
        <Text style={styles.average}>
          Average Satisfaction Rating: {calculateAverage(satisfactionRatings)}
        </Text>
        <BarChart
          data={satisfactionChartData}
          width={Dimensions.get('window').width - 50}
          height={220}
          chartConfig={{
            backgroundColor: '#ffffff',
            backgroundGradientFrom: '#ffffff',
            backgroundGradientTo: '#ffffff',
            decimalPlaces: 1,
            color: (opacity = 1) => `rgba(0, 255, 0, ${opacity})`,
          }}
          style={styles.chart}
        />
        <Button title="Update Satisfaction Ratings" onPress={() => setCurrentScreen('UpdateSatisfaction')} />
      </ScrollView>
    );
  };

  // Update Data Screen
  const UpdateScreen = () => {
    const handleInputChange = (index, key, value) => {
      const updatedData = [...tableData];
      updatedData[index][key] = parseInt(value, 10) || 0;
      setTableData(updatedData);
    };

    const handleSave = () => {
      console.log('Saved data:', tableData);
      setCurrentScreen('Dashboard');
    };

    return (
      <ScrollView style={styles.container}>
        <Text style={styles.header}>Update Data</Text>

        {tableData.map((row, index) => (
          <View key={index} style={styles.row}>
            <Text style={styles.cell}>Period {row.period}</Text>
            <TextInput
              style={styles.input}
              keyboardType="numeric"
              value={String(row.start)}
              onChangeText={(value) => handleInputChange(index, 'start', value)}
            />
            <TextInput
              style={styles.input}
              keyboardType="numeric"
              value={String(row.end)}
              onChangeText={(value) => handleInputChange(index, 'end', value)}
            />
          </View>
        ))}

        <View style={styles.buttonRow}>
          <Button title="Cancel" onPress={() => setCurrentScreen('Dashboard')} />
          <Button title="Save Data" onPress={handleSave} />
        </View>
      </ScrollView>
    );
  };

  // Update Satisfaction Ratings Screen
  const UpdateSatisfactionScreen = () => {
    const handleSatisfactionChange = (index, value) => {
      const updatedRatings = [...satisfactionRatings];
      updatedRatings[index] = parseInt(value, 10) || 0;
      setSatisfactionRatings(updatedRatings);
    };

    const handleSave = () => {
      console.log('Saved satisfaction ratings:', satisfactionRatings);
      setCurrentScreen('Dashboard');
    };

    return (
      <ScrollView style={styles.container}>
        <Text style={styles.header}>Update Satisfaction Ratings</Text>

        {satisfactionRatings.map((rating, index) => (
          <View key={index} style={styles.row}>
            <Text style={styles.cell}>Rating {index + 1}</Text>
            <TextInput
              style={styles.input}
              keyboardType="numeric"
              value={String(rating)}
              onChangeText={(value) => handleSatisfactionChange(index, value)}
            />
          </View>
        ))}

        <View style={styles.buttonRow}>
          <Button title="Cancel" onPress={() => setCurrentScreen('Dashboard')} />
          <Button title="Save Ratings" onPress={handleSave} />
        </View>
      </ScrollView>
    );
  };

  // Render Screens
  if (currentScreen === 'Dashboard') return DashboardScreen();
  if (currentScreen === 'Update') return UpdateScreen();
  if (currentScreen === 'UpdateSatisfaction') return UpdateSatisfactionScreen();

  return null;
}

const styles = StyleSheet.create({
  container: { flex: 1, padding: 20, backgroundColor: '#f4f4f4' },
  header: { fontSize: 24, fontWeight: 'bold', textAlign: 'center', marginBottom: 20 },
  subHeader: { fontSize: 18, marginTop: 20 },
  average: { fontSize: 18, fontWeight: 'bold', color: '#333', marginBottom: 10 },
  percentage: { fontSize: 24, fontWeight: 'bold', color: '#333' },
  chart: { marginVertical: 20 },
  row: { flexDirection: 'row', justifyContent: 'space-between', marginVertical: 10 },
  cell: { fontSize: 16, width: '25%' },
  input: { borderWidth: 1, borderColor: '#ccc', padding: 5, width: '30%' },
  buttonRow: { flexDirection: 'row', justifyContent: 'space-between', marginTop: 20 },
});
