import React, { useContext, useState } from 'react';
import { StyleSheet, Text, View, TouchableOpacity, FlatList, Alert } from 'react-native';
import { DataContext } from './dataprovider';
import { Button } from 'react-native';
import { Clipboard } from 'react-native';

export default function List({ handleEdit, editable }) {

  const {data, setData} = useContext(DataContext)
  const handleDelete = (index) => {
    Alert.alert(
      '!!!',
      'Are you sure you want to PERMANENTLY delete this entry?',
      [
        {
          text: 'Delete',
          onPress: () => setData([...data.slice(0, index), ...data.slice(index + 1)]),
          style: 'delete',
        },
        {
          text: 'Cancel',
          style: 'cancel',
        },
      ],
      {
        cancelable: true,
      },
    );
    };
  const renderItem = ({ item, index }) => {
    return (
      <View style={styles.entry}>
        <View style={styles.entryInfo}>
          <Text style={styles.title}>{item.title}</Text>
          <Text style={styles.username}>{item.username}</Text>
          <Text style={styles.password}>*****</Text>
        </View>
        {!editable ?
          <View style={styles.entryButtons}>
            <Button
              onPress={() => handleDelete(index)}
              title="DELETE "
              color="red"
            />
          </View>
          : null}
        {!editable ?
          <View style={styles.entryButtons}>
            <Button
              onPress={
                () => Clipboard.setString(item.password) &
                Alert.alert(
                  'Password copied to clipboard',
                  '',
                  [
                    {
                      text: 'ok',
                    },
                  ],
                  {
                    cancelable: true,
                  },
                )
              }
              title="COPY "
              color="white"
            />
          </View>
          : null}
      </View>
    );
  };

  return (
    <View style={styles.container}>
      <FlatList
        data={data}
        renderItem={renderItem}
        keyExtractor={(item, index) => index.toString()}
        style={styles.list}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#000',
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: 20,
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
    marginTop: 20,
    marginBottom: 10,
    color: '#fff',
  },
  input: {
    borderWidth: 1,
    borderColor: '#fff',
    borderRadius: 5,
    padding: 10,
    width: '100%',
    marginBottom: 10,
    color: '#fff',
  },
  passwordInput: {
    flexDirection: 'row',
    alignItems: 'center',
    width: '100%',
    marginBottom: 10,
  },
  passwordInputText: {
    borderWidth: 1,
    borderColor: '#fff',
    borderRadius: 5,
    padding: 10,
    flex: 1,
    color: '#fff',
  },
  generateButton: {
    backgroundColor: '#fff',
    borderRadius: 5,
    padding: 10,
    marginLeft: 10,
  },
  generateButtonText: {
    color: '#000',
    fontWeight: 'bold',
  },
  addButton: {
    backgroundColor: 'blue',
    borderRadius: 5,
    padding: 10,
    width: '100%',
    alignItems: 'center',
    marginTop: 10,
  },
  addButtonText: {
    color: '#fff',
    fontWeight: 'bold',
  },
  list: {
    width: '100%',
    marginTop: 30,
  },
  entry: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    borderWidth: 1,
    borderColor: '#fff',
    borderRadius: 5,
    padding: 10,
    marginBottom: 10,
  },
  entryInfo: {
    flex: 1,
  },
  entryButtons: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    padding:10,
    marginBottom: 10,
  },
  username: {
    marginTop: 5,
    color: '#fff',
  },
  password: {
    marginTop: 5,
    color: '#fff',
  },
  passwordHidden: {
    marginTop: 5,
    color: '#ccc',
  },
});

