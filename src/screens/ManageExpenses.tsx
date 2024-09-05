import { StyleSheet, View } from 'react-native'
import React, { useContext, useLayoutEffect } from 'react'
import IconButton from '../components/UI/IconButton';
import { GlobalStyles } from '../../constants/style';
import { ExpenseContext } from '../../store/expenses-context';
import ExpenseForm, { Input } from '../components/ManageExpense/ExpenseForm';
import { storeExpense } from '../../utils/http';

const ManageExpenses = ({ route, navigation }: any) => {
  const editedExpenseId = route.params?.expenseId;
  const isEditing = !!editedExpenseId;
  const expenseCtx = useContext(ExpenseContext);

  const expenseData = expenseCtx.expenses.find((expense) => expense.id === editedExpenseId)

  useLayoutEffect(() => {

    navigation.setOptions({ title: isEditing ? 'Edit Expense' : 'Add Expense' })
  },
    [navigation, isEditing])

  const deleteExpense = () => {
    expenseCtx.deleteExpense(editedExpenseId);
    navigation.goBack();
  }

  const cancelHandler = () => {
    navigation.goBack();
  }
  const confirmHandler = async (submittedValues: any) => {

    const updatedExpenseData = {
      ...submittedValues,
      date: new Date(submittedValues.date!),
      description: submittedValues.description.value
    }

    if (isEditing) {
      expenseCtx.updateExpense(
        editedExpenseId,
        updatedExpenseData
      );
    } else {

      const id = await storeExpense(updatedExpenseData)
      expenseCtx.addExpense(
        {
          ...updatedExpenseData,
          id
        }
      );
    }

    navigation.goBack();
  }

  return (
    <View style={styles.container}>
      <ExpenseForm
        onCancel={cancelHandler}
        onSubmit={confirmHandler}
        defaultValue={expenseData}
        submitButtonLabel={isEditing ? 'Update' : 'Add'} />
      {isEditing &&
        <View style={styles.deleteCotainer}>
          <IconButton
            name={'trash'}
            color={GlobalStyles.colors.error500}
            size={36} onPress={deleteExpense}
          /></View>}
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
  deleteCotainer: {
    marginTop: 16,
    paddingTop: 8,
    borderTopWidth: 2,
    borderTopColor: GlobalStyles.colors.primary200,
    alignItems: 'center',
  },
})