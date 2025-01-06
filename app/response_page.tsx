import React, { useState, useEffect } from 'react';
import { View, Text, ScrollView, StyleSheet } from 'react-native';
import { LineChart } from 'react-native-chart-kit';
import { DataTable } from 'react-native-paper';
import axios from 'axios';

const surveyResponse = () => {
  const [satisfactionData, setSatisfactionData] = useState([]);
  const [feedbackData, setFeedbackData] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        //Get satisfaction rating
        const satisfactionResponse = await axios.get('http://localhost:5001/satisfaction-ratings');
        setSatisfactionData(satisfactionResponse.data);

        //Get feedback data
        const feedbackResponse = await axios.get('http://localhost:5001/feedbacks');
        setFeedbackData(feedbackResponse.data);
      } catch (error) {
        console.error(error);
      }
    };
    fetchData();
  }, []);

  const satisfactionLabels = satisfactionData.map((item) => item.date);
  const satisfactionValues = satisfactionData.map((item) => item.rating);

  return (
    <ScrollView style={styles.container}>
      <Text style={styles.title}>Satisfaction Rating</Text>
      <LineChart
        data={{
          labels: satisfactionLabels,
          datasets: [
            {
              data: satisfactionValues,
            },
          ],
        }}
        width={320}
        height={220}
        yAxisLabel="Rating"
        chartConfig={{
          backgroundColor: '#e26a00',
          backgroundGradientFrom: '#fb8c00',
          backgroundGradientTo: '#ff9800',
          decimalPlaces: 1,
          color: (opacity = 1) => `rgba(255, 255, 255, ${opacity})`,
          labelColor: (opacity = 1) => `rgba(255, 255, 255, ${opacity})`,
        }}
        style={styles.graph}
      />

      <Text style={styles.title}>Feedback Table</Text>
      <DataTable>
        <DataTable.Header>
          <DataTable.Title>User ID</DataTable.Title>
          <DataTable.Title>Feedback Type</DataTable.Title>
          <DataTable.Title>Response</DataTable.Title>
        </DataTable.Header>
        {feedbackData.map((item, index) => (
          <DataTable.Row key={index}>
            <DataTable.Cell>{item.userId}</DataTable.Cell>
            <DataTable.Cell>{item.type}</DataTable.Cell>
            <DataTable.Cell>{item.response}</DataTable.Cell>
          </DataTable.Row>
        ))}
      </DataTable>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: '#4682b4',
  },
  
  title: {
    fontSize: 20,
    fontWeight: 'bold',
    marginVertical: 10,
  },
  graph: {
    marginVertical: 20,
    borderRadius: 10,
  },
});

export default surveyResponse;
