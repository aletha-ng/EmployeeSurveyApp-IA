//might need to delete
import React, {Component, useState} from 'react';
import {
  Text, 
  View,
  StyleSheet,
  Button,
  Alert,
  TextInput,
  Dimensions,
} from 'react-native';
import { Picker } from '@react-native-picker/picker';
import Dropdown from './components/questionTypeMenu';
import { DataTable } from 'react-native-paper';

//Universal Constants
const { width, height } = Dimensions.get('window');
const DEFAULT_PADDING = 20;
const DEFAULT_MARGIN = 20;

const styles = StyleSheet.create({
  //Container Styles
  mainContainer: {
    justifyContent: 'center',
  },

  table: {

  },

  buttonRow: {

  },

  addPopUp: {

  },

  deletePopUp:{

  },


});

const app = () => {
    return (
      <DataTable>
        <DataTable.Header>
          <DataTable.Title>Name</DataTable.Title>
          <DataTable.Title numeric>Age</DataTable.Title>
          <DataTable.Title numeric>Height (cm)</DataTable.Title>
        </DataTable.Header>
  
        <DataTable.Row>
          <DataTable.Cell>John Doe</DataTable.Cell>
          <DataTable.Cell numeric>25</DataTable.Cell>
          <DataTable.Cell numeric>175</DataTable.Cell>
        </DataTable.Row>
  
        <DataTable.Row>
          <DataTable.Cell>Jane Smith</DataTable.Cell>
          <DataTable.Cell numeric>28</DataTable.Cell>
          <DataTable.Cell numeric>160</DataTable.Cell>
        </DataTable.Row>

        <DataTable.Row>
          <DataTable.Cell>Jane Smith</DataTable.Cell>
          <DataTable.Cell numeric>28</DataTable.Cell>
          <DataTable.Cell numeric>160</DataTable.Cell>
        </DataTable.Row>
  
        <DataTable.Pagination
          page={0}
          numberOfPages={3}
          onPageChange={(page) => console.log(page)}
          label="1-2 of 6"
        />
      </DataTable>
    );
  };
  
export default app;
  