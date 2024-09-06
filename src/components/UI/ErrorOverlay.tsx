import { ActivityIndicator, StyleSheet, Text, View } from 'react-native'
import React from 'react'
import { GlobalStyles } from '../../../constants/style'
import Button from './Button';

interface ErrorOverlayProps {
  message: string;
}

const ErrorOverlay: React.FC<ErrorOverlayProps> = ({ message }) => {
  return (
    <View style={styles.container}>
      <Text style={[styles.text, styles.title]}>An Error Occured!</Text>
      <Text style={styles.text}>{message}</Text>
    </View>
  )
}

export default ErrorOverlay

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 24,
    backgroundColor: GlobalStyles.colors.primary700,
  },
  text: {
    color: 'white',
    textAlign: 'center',
    marginBottom: 0,
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
  },
})

