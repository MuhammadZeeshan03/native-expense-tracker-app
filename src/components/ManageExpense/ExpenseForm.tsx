import { StyleSheet, Text, View } from 'react-native'
import React, { useState } from 'react'
import Input from './Input'
import Button from '../UI/Button';
import { getFormattedDate } from '../../../utils/date';
import { Expenses } from '../ExpensesOutput';

export interface Input {
  amount: number;
  date: string | undefined;
  description: string;
}

interface ExpenseFormProps {
  onCancel: () => void;
  onSubmit: (expense: any) => void;
  submitButtonLabel: string;
  defaultValue?: Expenses | undefined;
}

const ExpenseForm: React.FC<ExpenseFormProps> = ({ onCancel, onSubmit, submitButtonLabel, defaultValue }) => {
  const [inputValues, setInputValues] = useState<Input>({
    amount: defaultValue ? defaultValue.amount : 0,
    date: defaultValue ? getFormattedDate(new Date(defaultValue?.date!)) : '',
    description: defaultValue ? defaultValue.description : '',
  })

  const inputChangedHandler = (inputIdentifier: string, entereValue: string) => {
    setInputValues(
      (pre) => {
        return {
          ...pre,
          [inputIdentifier]: entereValue
        }
      }
    )
  }

  const submitHandler = () => {
    const expenseData = {
      amount: +inputValues.amount,
      date: new Date(inputValues.date!),
      description: inputValues.description,
    }
    onSubmit(expenseData);
  }

  return (
    <View style={styles.form}>
      <Text style={styles.title}>Your Expense</Text>
      <View style={styles.inputsRow}>
        <Input
          label='Amount'
          style={styles.rowInput}
          textInputConfig={{
            keyboardType: 'decimal-pad',
            onChangeText: inputChangedHandler.bind(this, 'amount'),
            value: inputValues.amount.toString()
          }} />
        <Input
          style={styles.rowInput}
          label='Date'
          textInputConfig={{
            placeholder: 'YYYY-MM-DD',
            maxlength: 10,
            onChangeText: inputChangedHandler.bind(this, 'date'),
            value: inputValues.date!
          }} />
      </View>
      <Input label='Description' textInputConfig={{
        multiline: true,
        autoCorrect: false,
        onChangeText: inputChangedHandler.bind(this, 'description'),
        value: inputValues.description
      }} />

      <View style={styles.buttons}>
        <Button style={styles.button} mode={'flat'} onPress={onCancel}> Cancel</Button>
        <Button style={styles.button} onPress={submitHandler}>{submitButtonLabel}</Button>
      </View>
    </View>
  )
}

export default ExpenseForm

const styles = StyleSheet.create({
  form: {
    marginTop: 40,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 16,
    textAlign: 'center',
    color: 'white',
  },
  inputsRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  rowInput: {
    flex: 1,
  },
  buttons: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
  },
  button: {
    minWidth: 120,
    marginHorizontal: 8,
  },
})