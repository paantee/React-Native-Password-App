import React, { useState } from 'react';
import {
  StyleSheet,
  Text,
  View,
  TextInput,
  TouchableOpacity,
  FlatList,
  Alert,
} from 'react-native';

export default function App() {
  const [title, setTitle] = useState('');
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [data, setData] = useState([]);

  const generatePassword = () => {
    const length = 12;
    const charset = 'abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789!@#$%^&*()_+-=';
    let newPassword = '';
    for (let i = 0; i < length; i++) {
      newPassword += charset.charAt(Math.floor(Math.random() * charset.length));
    }
    setPassword(newPassword);
  };

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
    setData([...data.slice(0, index), ...data.slice(index + 1)]);
  };

  const renderItem = ({ item, index }) => {
    return (
      <View style={styles.entry}>
        <View style={styles.entryInfo}>
          <Text style={styles.title}>{item.title}</Text>
          <Text style={styles.username}>{item.username}</Text>
          <Text style={styles.password}>{item.password}</Text>
        </View>
        <View style={styles.entryButtons}>
          <TouchableOpacity onPress={() => handleEdit(index)}>
            <Text style={styles.edit}>Edit</Text>
          </TouchableOpacity>
          <TouchableOpacity onPress={() => handleDelete(index)}>
            <Text style={styles.delete}>Delete</Text>
          </TouchableOpacity>
        </View>
      </View>
    );
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Add Entry</Text>
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
          onPress={() => generatePassword()}
        >
          <Text style={styles.generateButtonText}>Generate</Text>
        </TouchableOpacity>
      </View>
      <TouchableOpacity style={styles.addButton} onPress={() => handleAdd()}>
        <Text style={styles.addButtonText}>Add Entry</Text>
      </TouchableOpacity>
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
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: 20,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginTop: 20,
    marginBottom: 10,
  },
  input: {
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 5,
    padding: 10,
    width: '100%',
    marginBottom: 10,
  },
  passwordInput: {
    flexDirection: 'row',
    alignItems: 'center',
    width: '100%',
    marginBottom: 10,
  },
  passwordInputText: {
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 5,
    padding: 10,
    flex: 1,
  },
  generateButton: {
    backgroundColor: '#ccc',
    borderRadius: 5,
    padding: 10,
    marginLeft: 10,
  },
  generateButtonText: {
    color: '#fff',
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
    marginTop: 20,
  },
  entry: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    borderWidth: 1,
    borderColor: '#ccc',
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
  },
  delete: {
    color: 'red',
  },
  username: {
    marginTop: 5,
  },
  password: {
    marginTop: 5,
    secureTextEntry: 'true'
  },
  passwordHidden: {
    marginTop: 5,
    color: '#ccc',
  },
});