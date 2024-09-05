import { Alert, StyleSheet, Text, View } from 'react-native'
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
  const [inputValues, setInputValues] = useState({
    amount: {
      value: defaultValue ? defaultValue.amount : 0,
      isValid: true,
    },

    date: {
      value: defaultValue?.date ? getFormattedDate(new Date(defaultValue?.date)) : '',
      isValid: true,
    },
    description: {
      value: defaultValue ? defaultValue.description : '',
      isValid: true,
    }
  })

  const inputChangedHandler = (inputIdentifier: string, entereValue: string) => {
    setInputValues(
      (pre) => {
        return {
          ...pre,
          [inputIdentifier]: {
            value: entereValue,
            isValid: true,
          },
        }
      }
    )
  }

  const submitHandler = () => {
    const amountIsValid = !isNaN(inputValues.amount.value) && inputValues.amount.value > 0;
    const dateIsValid = inputValues.date?.toString() !== 'Invalid Date'
    const descriptionIsValid = inputValues.description.value.trim().length > 0;

    if (!amountIsValid || !dateIsValid || !descriptionIsValid) {
      setInputValues((curInputs): any => {
        return {
          amount: { value: curInputs.amount.value, isValid: amountIsValid, },
          date: { value: curInputs.date.value, isValid: dateIsValid },
          description: { value: curInputs.description.value, isValid: descriptionIsValid },
        }
      })
      return
    }

    const expenseData = {
      amount: +inputValues.amount,
      date: new Date(inputValues.date.value!),
      description: inputValues.description,
    }

    onSubmit(expenseData);
  }

  const formIsInValid =
    !inputValues.amount.isValid ||
    !inputValues.date.isValid ||
    !inputValues.description.isValid;


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
            value: inputValues.amount.value.toString()
          }} />
        <Input
          style={styles.rowInput}
          label='Date'
          textInputConfig={{
            placeholder: 'YYYY-MM-DD',
            maxlength: 10,
            onChangeText: inputChangedHandler.bind(this, 'date'),
            value: inputValues.date.value
          }} />
      </View>
      <Input label='Description' textInputConfig={{
        multiline: true,
        autoCorrect: false,
        onChangeText: inputChangedHandler.bind(this, 'description'),
        value: inputValues.description.value
      }} />


      {formIsInValid && <Text>
        Invalid input values - Please check your entered values!</Text>}

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