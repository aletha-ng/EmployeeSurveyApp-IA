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
            <DataTable.Title>ratings</DataTable.Title>
            <DataTable.Title numeric>2023</DataTable.Title>
            <DataTable.Title numeric>2024</DataTable.Title>
          </DataTable.Header>
    
          <DataTable.Row>
            <DataTable.Cell>1</DataTable.Cell>
            <DataTable.Cell numeric>25</DataTable.Cell>
            <DataTable.Cell numeric>175</DataTable.Cell>
          </DataTable.Row>
    
          <DataTable.Row>
            <DataTable.Cell>2</DataTable.Cell>
            <DataTable.Cell numeric>28</DataTable.Cell>
            <DataTable.Cell numeric>160</DataTable.Cell>
          </DataTable.Row>

          <DataTable.Row>
            <DataTable.Cell>3</DataTable.Cell>
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

        <View>
          <Button
              title="save"
              color="black"
            />
            <Button
              title="delete"
              color="black"
            />
        </View>

        <View style = {styles.mainContainer}>
          <Text>Employee satifaction rate</Text>
          <Text>filler rating</Text>
          <Text>Filler graph</Text>
          <Button
              title="update"
              color="black"
            />
        </View>

        <DataTable>
          <DataTable.Header>
            <DataTable.Title>ratings</DataTable.Title>
            <DataTable.Title numeric>emp left</DataTable.Title>
            <DataTable.Title numeric>emp stayed</DataTable.Title>
            <DataTable.Title numeric>emp total</DataTable.Title>
          </DataTable.Header>
    
          <DataTable.Row>
            <DataTable.Cell>1</DataTable.Cell>
            <DataTable.Cell numeric>25</DataTable.Cell>
            <DataTable.Cell numeric>175</DataTable.Cell>
            <DataTable.Cell numeric>175</DataTable.Cell>
          </DataTable.Row>
    
          <DataTable.Row>
            <DataTable.Cell>2</DataTable.Cell>
            <DataTable.Cell numeric>28</DataTable.Cell>
            <DataTable.Cell numeric>160</DataTable.Cell>
            <DataTable.Cell numeric>175</DataTable.Cell>
          </DataTable.Row>

          <DataTable.Row>
            <DataTable.Cell>3</DataTable.Cell>
            <DataTable.Cell numeric>28</DataTable.Cell>
            <DataTable.Cell numeric>160</DataTable.Cell>
            <DataTable.Cell numeric>175</DataTable.Cell>
          </DataTable.Row>
        </DataTable>

        <View>
          <Button
              title="save"
              color="black"
            />
            <Button
              title="delete"
              color="black"
            />
        </View>

        <View style = {styles.mainContainer}>
          <Text>Employee turnover rate</Text>
          <Text>filler rate</Text>
          <Text>Filler graph</Text>
          <Button
              title="update"
              color="black"
            />
        </View>

        <DataTable>
          <DataTable.Header>
            <DataTable.Title>ratings</DataTable.Title>
            <DataTable.Title numeric>emp left</DataTable.Title>
            <DataTable.Title numeric>emp stayed</DataTable.Title>
            <DataTable.Title numeric>emp total</DataTable.Title>
          </DataTable.Header>
    
          <DataTable.Row>
            <DataTable.Cell>1</DataTable.Cell>
            <DataTable.Cell numeric>25</DataTable.Cell>
            <DataTable.Cell numeric>175</DataTable.Cell>
            <DataTable.Cell numeric>175</DataTable.Cell>
          </DataTable.Row>
    
          <DataTable.Row>
            <DataTable.Cell>2</DataTable.Cell>
            <DataTable.Cell numeric>28</DataTable.Cell>
            <DataTable.Cell numeric>160</DataTable.Cell>
            <DataTable.Cell numeric>175</DataTable.Cell>
          </DataTable.Row>

          <DataTable.Row>
            <DataTable.Cell>3</DataTable.Cell>
            <DataTable.Cell numeric>28</DataTable.Cell>
            <DataTable.Cell numeric>160</DataTable.Cell>
            <DataTable.Cell numeric>175</DataTable.Cell>
          </DataTable.Row>
        </DataTable>

        <View>
          <Button
              title="save"
              color="black"
            />
            <Button
              title="delete"
              color="black"
            />
        </View>

        <View style = {styles.mainContainer}>
          <Text>Employee turnover rate</Text>
          <Text>filler rate</Text>
          <Text>Filler graph</Text>
          <Button
              title="update"
              color="black"
            />
        </View>

      </View>
    );
  };
  
export default app;
  