import React, { useContext, useState } from 'react';
import Passwordlist from './list';
import { DataContext } from './dataprovider';
import { StyleSheet, Text, View, TextInput, TouchableOpacity, Alert } from 'react-native';


export default function Generator() {
  const [keyword, setKeyword] = useState(20);
  const {data, setData} = useContext(DataContext)
  const [title, setTitle] = useState('');
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  const getPassword = () => {
    fetch(`https://api.api-ninjas.com/v1/passwordgenerator?length=${keyword}`, {
        headers: {'X-Api-Key': 'b0TqFhgtUBuwTTzxFZz0ww==9UZwBpXqo95F9zC4'}
  })
    .then(response => response.json())
    .then(data => setPassword(data.random_password))
    .catch(error => {Alert.alert('Error', error);
    });
  }

  const handleAdd = () => {
    if (!title || !username || !password) {
      Alert.alert('Error', 'Please fill in all fields');
      return;
    }

    setData([...data, { title, username, password }]);
    setTitle('');
    setUsername('');
    setPassword('');
  };

  const handleEdit = (index) => {
    const entry = data[index];
    setTitle(entry.title);
    setUsername(entry.username);
    setPassword(entry.password);
    setData([...data.slice(0, index), ...data.slice(index + 1)]);
  };
  

  const handleDelete = (index) => {
    if (window.confirm('Are you sure you want to DELETE this entry permanently'))
{
  setData([...data.slice(0, index), ...data.slice(index + 1)]);
}
    
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Password Generator</Text>
      <TextInput
        style={styles.input}
        placeholder="Title"
        value={title}
        onChangeText={(text) => setTitle(text)}
      />
      <TextInput
        style={styles.input}
        placeholder="Username"
        value={username}
        onChangeText={(text) => setUsername(text)}
      />
      <View style={styles.passwordInput}>
        <TextInput
          style={styles.passwordInputText}
          placeholder="Password"
          value={password}
          onChangeText={(text) => setPassword(text)}
        />
        <TouchableOpacity
          style={styles.generateButton}
          onPress={() => getPassword()}
        >
          <Text style={styles.generateButtonText}>Generate Random Password</Text>
        </TouchableOpacity>
      </View>
      <TouchableOpacity style={styles.addButton} onPress={() => handleAdd()}>
        <Text style={styles.addButtonText}>Add</Text>
      </TouchableOpacity>
      <Passwordlist handleDelete={handleDelete} handleEdit={handleEdit} editable/>
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
    backgroundColor: 'green',
    borderRadius: 5,
    padding: 10,
    marginLeft: 10,
  },
  generateButtonText: {
    color: 'white',
    fontWeight: 'bold',
  },
  addButton: {
    backgroundColor: 'green',
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
    marginTop: 20,
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
    width: '100%',
  },
  entryInfo: {
    flex: 1,
  },
  entryButtons: {
    flexDirection: 'row',
  },
  edit: {
    color: 'blue',
    marginRight: 10,
    color: '#fff',
  },
  delete: {
    color: 'red',
    color: '#fff',
  },
  username: {
    marginTop: 5,
    color: '#fff',
  },
  password: {
    marginTop: 5,
    secureTextEntry: 'true',
    color: '#fff',
  },
  passwordHidden: {
    marginTop: 5,
    color: '#ccc',
  },
});