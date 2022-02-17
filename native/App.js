import { StatusBar } from 'expo-status-bar';
import React from 'react';
import { StyleSheet, Text, View, TextInput, Image, Button } from 'react-native';
import Navigator from './Routes/Stack';

export default function App() {
  const [name, onChangeName] = React.useState("");
  const [password, onChangePassword] = React.useState("");
  const [login, onPressLogin] = React.useState("");

  return (
    <Navigator />
  );
}