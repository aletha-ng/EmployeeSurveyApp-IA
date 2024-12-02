// QuestionManager.js
import React from 'react';
import { FlatList, View, Text, Button, StyleSheet } from 'react-native';

const QuestionManager = () => {
  const data = [/* Your data here */];

  return (
    <FlatList
      data={data}
      renderItem={({ item }) => <Text>{item}</Text>}
      keyExtractor={(item, index) => index.toString()}
    />
  );
};

export default QuestionManager;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
    width: '100%',
  },
});
