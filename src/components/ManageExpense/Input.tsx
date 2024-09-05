import { StyleSheet, Text, TextInput, View } from 'react-native'
import React from 'react'
import { GlobalStyles } from '../../../constants/style';

interface InputProps {
  label: string;
  textInputConfig: any;
  style?: any,
  invalid: boolean
}

const Input: React.FC<InputProps> = ({ label, style, textInputConfig, invalid }) => {

  const inputStyles = [styles.input];

  if (textInputConfig && textInputConfig.multiline) {
    // @ts-ignore
    inputStyles.push(styles.inputMultiLine)
  }
  if (invalid) {
    //@ts-ignore
    inputStyles.push(styles.invalidInput)
  }


  return (
    <View style={[styles.inputContainer, style]}>
      <Text style={[styles.label, invalid && styles.invalidLabel]}>{label}</Text>
      <TextInput
        style={inputStyles}
        {...textInputConfig}
      />
    </View>
  )
}

export default Input

const styles = StyleSheet.create({
  inputContainer: {
    marginHorizontal: 4,
    marginVertical: 8,
    // flex: 1,
  },
  label: {
    fontSize: 12,
    color: GlobalStyles.colors.primary100,
    marginBottom: 4,
  },
  input: {
    backgroundColor: GlobalStyles.colors.primary100,
    color: GlobalStyles.colors.primary700,
    padding: 6,
    borderRadius: 6,
    fontSize: 18,
  },
  inputMultiLine: {
    minHeight: 100,
    textAlignVertical: 'top',
  },
  invalidLabel: {
    color: GlobalStyles.colors.error500,
  },
  invalidInput: {
    backgroundColor: GlobalStyles.colors.error50
  }
})
