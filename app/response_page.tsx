///ADD STYLE SHEET

import React, { useState, useEffect } from 'react';
import { View, Text, ScrollView, TouchableOpacity, StyleSheet } from 'react-native';
import { BarChart } from 'react-native-chart-kit';
import { Dimensions } from 'react-native';
import { DataTable } from 'react-native-paper';
import axios from 'axios';

const app = () => {
  const [ratingCounts, setRatingCounts] = useState([0, 0, 0, 0, 0]);
  const [feedback, setFeedback] = useState([]);

  //Fetch employee list from the backend API first time loaded for displaying data
  useEffect(() => {
    axios
      .get('http://localhost:5001/api/feedbacks')
      .then((response) => {
        setFeedback(response.data);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

  useEffect(() => {
    axios
      .get('http://localhost:5001/satisfaction-distribution')
      .then((response) => {
        const count = response.data.map((item) => item.count);
        setRatingCounts(count);
        console.log('check', ratingCounts)
      })
      .catch((err) => {
        console.log('Failed to load satisfaction value count', err);
      });
  }, []);

  let sumRating = 0;
  let totalRatingResponse = 0;

  ratingCounts.forEach((count, index) => {
    const multiplier = index + 1;
    totalRatingResponse += count;
    sumRating += multiplier * count;
    console.log(multiplier, totalRatingResponse, sumRating);
  });

  let averageSatisfaction = 0;
  if (totalRatingResponse === 0) {
    averageSatisfaction = 0;
  }
  else {
    averageSatisfaction = sumRating / totalRatingResponse;
  }

  const yAxisInterval = Math.ceil(totalRatingResponse / 5);
  const maxY = yAxisInterval * 5;

  const chartData = {
    labels: ['1', '2', '3', '4', '5'],
    datasets: [{ data: ratingCounts }],
  };

  const screenWidth = Dimensions.get('window').width;

  return (
    <ScrollView>
      <View style={styles.container}>
        <View style={styles.labelGroup}>
          <Text style={styles.label}>Satisfaction Ratings</Text>
          <Text style={styles.label}>{averageSatisfaction}</Text>
        </View>

        <BarChart
          data={chartData}
          width={screenWidth - 30}
          height={400}
          yAxisLabel=""
          yAxisSuffix=""
          yAxisInterval={1}
          chartConfig={{
            backgroundColor: 'white',
            backgroundGradientFrom: 'white',
            backgroundGradientTo: 'white',
            decimalPlaces: 0,
            color: (opacity = 1) => `rgba(34, 94, 180, ${opacity})`,
            style: { borderRadius: 8 },
            barPercentage: 0.6,
          }}
          fromZero
          showValuesOnTopOfBars
          segments={5}
          yMax={maxY}
        />
      </View>

      <View style={{ padding: 16 }}>
        <DataTable>
          <DataTable.Header>
            <DataTable.Title>User ID</DataTable.Title>
            <DataTable.Title>Feedback Type</DataTable.Title>
            <DataTable.Title>Response</DataTable.Title>
          </DataTable.Header>
          {feedback.map((feedback, index) => (
            <DataTable.Row key={index}>
              <DataTable.Cell>{feedback.user_id}</DataTable.Cell>
              <DataTable.Cell>{feedback.written_type}</DataTable.Cell>
              <DataTable.Cell>
                <Text style={{ flexWrap: 'wrap' }}>{feedback.written_response}</Text>
                </DataTable.Cell>
            </DataTable.Row>
          ))}
        </DataTable>
      </View>
    </ScrollView>
  );
};

export default app;

const { width, height } = Dimensions.get('window');

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#4682b4',
    alignItems: 'center',
    justifyContent: 'center',
    padding: 20,
  },

  label: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 8,
    paddingHorizontal: 20, 
  },

  labelGroup: {
    flexDirection: 'row',
    marginHorizontal: 10,
  }

});
