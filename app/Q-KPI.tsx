import React, { useState, useEffect } from 'react';
import { View, Text, Button, TextInput, StyleSheet, Dimensions, ScrollView, ActivityIndicator } from 'react-native';
import { BarChart, PieChart } from 'react-native-chart-kit';

export default function App(){
  const [currentScreen, setCurrentScreen] = useState('Dashboard');
  const [loading, setLoading] = useState(true);
  const [retentionData, setRetentionData] = useState({ start: 0, end: 0 });
  const [turnoverData, setTurnoverData] = useState({ stayed: 0, left: 0 });
  const [satisfactionRatings, setSatisfactionRatings] = useState([0, 0, 0, 0, 0]);

  // Fetch data from API
  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);

        // Fetch Retention Data
        const retentionResponse = await fetch('http://localhost:5001/retention-rate');
        const retentionJson = await retentionResponse.json();
        setRetentionData(retentionJson);

        // Fetch Turnover Data
        const turnoverResponse = await fetch('http://localhost:5001/turnover-rate');
        const turnoverJson = await turnoverResponse.json();
        setTurnoverData(turnoverJson);

        // Fetch Satisfaction Ratings
        const satisfactionResponse = await fetch('http://localhost:5001/satisfaction-ratings');
        const satisfactionJson = await satisfactionResponse.json();
        setSatisfactionRatings(satisfactionJson);

        setLoading(false);
      } catch (error) {
        console.error('Error fetching data:', error);
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  // Helper function to calculate averages
  const calculateAverageSatisfaction = (ratings) => {
    const totalWeighted = ratings.reduce((sum, count, index) => sum + count * (index + 1), 0);
    const totalResponses = ratings.reduce((sum, count) => sum + count, 0);
    return totalResponses === 0 ? 0 : (totalWeighted / totalResponses).toFixed(2);
  };

  if (loading) {
    return (
      <View style={styles.container}>
        <ActivityIndicator size="large" color="#0000ff" />
        <Text> Loading Data... </Text>
      </View>
    );
  }

  // Dashboard Screen
  const DashboardScreen = () => {
    const retentionRate = ((retentionData.end / retentionData.start) * 100).toFixed(2);
    const turnoverRate = ((turnoverData.left / (turnoverData.stayed + turnoverData.left)) * 100).toFixed(2);

    const barChartData = {
      labels: ['Start of Period', 'End of Period'],
      datasets: [{ data: [retentionData.start, retentionData.end] }],
    };

    const pieChartData = [
      { name: 'Stayed', population: turnoverData.stayed, color: '#4CAF50', legendFontColor: '#7F7F7F', legendFontSize: 15 },
      { name: 'Left', population: turnoverData.left, color: '#F44336', legendFontColor: '#7F7F7F', legendFontSize: 15 },
    ];

    const satisfactionChartData = {
      labels: ['1', '2', '3', '4', '5'],
      datasets: [{ data: satisfactionRatings }],
    };

    return (
      <ScrollView style={styles.container}>
        {/* Retention Rate */}
        <Text style={styles.subHeader}> Employee Retention Rate </Text>
        <Text style={styles.percentage}> {retentionRate}% </Text>
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

        {/* Turnover Rate */}
        <Text style={styles.subHeader}> Employee Turnover Rate </Text>
        <Text style={styles.percentage}> {turnoverRate}% </Text>
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

        {/* Satisfaction Rate */}
        <Text style={styles.subHeader}>Employee Satisfaction Rate </Text>
        <Text style={styles.average}> Average Satisfaction Rating: {calculateAverageSatisfaction(satisfactionRatings)} </Text>
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
      </ScrollView>
    );
  };

  return DashboardScreen();
}

const styles = StyleSheet.create({
  container: { 
    flex: 1, 
    padding: 20, 
    backgroundColor: '#f4f4f4' },

  header: { fontSize: 24, fontWeight: 'bold', textAlign: 'center', marginBottom: 20 },
  subHeader: { fontSize: 18, marginTop: 20 },
  average: { fontSize: 18, fontWeight: 'bold', color: '#333', marginBottom: 10 },
  percentage: { fontSize: 24, fontWeight: 'bold', color: '#333' },
  chart: { marginVertical: 20 },
});
