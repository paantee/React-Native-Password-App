import { StatusBar } from 'expo-status-bar';
import { Alert, StyleSheet, Text, View, Button, TextInput, FlatList, Image } from 'react-native';
import { useState } from 'react';

export default function Generator() {

    const [keyword, setKeyword] = useState('');
    const [password, setPassword] = useState([]);

    const getPassword = () => {
        fetch(`https://api.api-ninjas.com/v1/passwordgenerator?length=${keyword}`, {
            headers: {'X-Api-Key': 'b0TqFhgtUBuwTTzxFZz0ww==9UZwBpXqo95F9zC4'}
    })
        .then(response => response.json())
        .then(data => setPassword(data.random_password))
        .catch(error => {Alert.alert('Error', error);
        });
        console.log(password);
      }

  return (
    <View style={styles.container}>
      <TextInput style={{marginTop: 70, fontSize: 18}} placeholder='Enter Number' 
        onChangeText={text => setKeyword(text)} />
      <Button title="Find" onPress={getPassword} />
        <Text>{password}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: '#fff',
      alignItems: 'center',
      justifyContent: 'center',
    },
  });