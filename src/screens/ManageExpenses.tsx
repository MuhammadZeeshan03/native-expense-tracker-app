import { StyleSheet, View } from 'react-native'
import React, { useContext, useLayoutEffect, useState } from 'react'
import IconButton from '../components/UI/IconButton';
import { GlobalStyles } from '../../constants/style';
import { ExpenseContext } from '../../store/expenses-context';
import ExpenseForm, { Input } from '../components/ManageExpense/ExpenseForm';
import { storeExpense, updateExpense, deleteExpense } from '../../utils/http';
import LoadingOverlay from '../components/UI/LoadingOverlay';
import ErrorOverlay from '../components/UI/ErrorOverlay';

const ManageExpenses = ({ route, navigation }: any) => {
  const editedExpenseId = route.params?.expenseId;
  const isEditing = !!editedExpenseId;
  const expenseCtx = useContext(ExpenseContext);
  const [isUploading, setIsUploading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null)

  const expenseData = expenseCtx.expenses.find((expense) => expense.id === editedExpenseId)

  useLayoutEffect(() => {

    navigation.setOptions({ title: isEditing ? 'Edit Expense' : 'Add Expense' })
  },
    [navigation, isEditing])

  const deleteExpenseHandler = async () => {
    setIsUploading(true);
    try {
      await deleteExpense(editedExpenseId);
      expenseCtx.deleteExpense(editedExpenseId);
      navigation.goBack();
    } catch (error) {
      setError('An error occured while deleting the expense data');
      setIsUploading(false);
    }
  }

  const cancelHandler = () => {
    navigation.goBack();
  }
  const confirmHandler = async (submittedValues: any) => {
    setIsUploading(true);

    const updatedExpenseData = {
      ...submittedValues,
      date: new Date(submittedValues.date!),
      description: submittedValues.description.value
    }
    try {
      if (isEditing) {
        expenseCtx.updateExpense(editedExpenseId, updatedExpenseData);
        await updateExpense({ id: editedExpenseId, expenseData: updatedExpenseData })
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
    } catch (error) {
      setError('An error occured while saving the expense data');
      setIsUploading(false);
    }
  }

  if (error && !isUploading) {
    return <ErrorOverlay message={error} />
  }

  if (isUploading) {
    return <LoadingOverlay />
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
            size={36} onPress={deleteExpenseHandler}
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