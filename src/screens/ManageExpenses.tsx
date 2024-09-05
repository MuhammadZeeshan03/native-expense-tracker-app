import { StyleSheet, Text, View } from 'react-native'
import React, { useContext, useLayoutEffect } from 'react'
import IconButton from '../components/UI/IconButton';
import { GlobalStyles } from '../../constants/style';
import Button from '../components/UI/Button';
import { ExpenseContext } from '../../store/expenses-context';
import ExpenseForm from '../components/ManageExpense/ExpenseForm';

const ManageExpenses = ({ route, navigation }: any) => {
  const editedExpenseId = route.params?.expenseId;
  const isEditing = !!editedExpenseId;
  const expenseCtx = useContext(ExpenseContext);

  useLayoutEffect(() => {

    navigation.setOptions({
      title: isEditing ? 'Edit Expense' : 'Add Expense'
    })
  }, [navigation, isEditing])

  const deleteExpense = () => {
    expenseCtx.deleteExpense(
      editedExpenseId
    );
    navigation.goBack();
  }

  const cancelHandler = () => {
    navigation.goBack();
  }
  const confirmHandler = () => {

    if (isEditing) {
      expenseCtx.updateExpense(
        editedExpenseId,
        {
          amount: 19.00,
          description: 'New updated expense',
          date: new Date()
        }
      );
    } else {
      expenseCtx.addExpense({
        amount: 49.99,
        description: 'New added expense',
        date: new Date()
      });
    }

    navigation.goBack();
  }

  return (
    <View style={styles.container}>
      <ExpenseForm />
      <View style={styles.buttons}>
        <Button style={styles.button} mode={'flat'} onPress={cancelHandler}> Cancel</Button>
        <Button style={styles.button} onPress={confirmHandler}>{isEditing ? 'Update' : 'Add'}</Button>
      </View>
      {isEditing &&
        <View style={styles.deleteCotainer}>
          <IconButton
            name={'trash'}
            color={GlobalStyles.colors.error500}
            size={36} onPress={deleteExpense}
          /></View>}
      {/* {!isEditing && <Text>Adding New Expense</Text>}
      <Button title="Save" />
      <Button title="Delete" />
      <Button title="Cancel" onPress={() => navigation.goBack()} /> */}

    </View>
  )
}

export default ManageExpenses

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 24,
    backgroundColor: GlobalStyles.colors.primary800
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
  deleteCotainer: {
    marginTop: 16,
    paddingTop: 8,
    borderTopWidth: 2,
    borderTopColor: GlobalStyles.colors.primary200,
    alignItems: 'center',


  }

})