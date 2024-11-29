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
      <View>
        <DataTable>
          <DataTable.Header>
            <DataTable.Title>ID</DataTable.Title>
            <DataTable.Title>employee</DataTable.Title>
            <DataTable.Title>email</DataTable.Title>
            <DataTable.Title>departmennt</DataTable.Title>
            <DataTable.Title>role</DataTable.Title>
          </DataTable.Header>
    
          <DataTable.Row>
            <DataTable.Cell>1</DataTable.Cell>
            <DataTable.Cell numeric>25</DataTable.Cell>
            <DataTable.Cell >dfdafa</DataTable.Cell>
            <DataTable.Cell >dfdafa</DataTable.Cell>
            <DataTable.Cell >dfdafa</DataTable.Cell>
            <DataTable.Cell >dfdafa</DataTable.Cell>
          </DataTable.Row>
    
          <DataTable.Row>
            <DataTable.Cell>2</DataTable.Cell>
            <DataTable.Cell numeric>25</DataTable.Cell>
            <DataTable.Cell >alafiea@gmail.com</DataTable.Cell>
            <DataTable.Cell >dfdafa</DataTable.Cell>
            <DataTable.Cell >dfdafa</DataTable.Cell>
            <DataTable.Cell >dfdafa</DataTable.Cell>
          </DataTable.Row>

          <DataTable.Pagination
            page={0}
            numberOfPages={3}
            onPageChange={(page) => console.log(page)}
            label="1-2 of 6"
          />
        </DataTable>

      </View>
    );
  };
  
export default app;
  