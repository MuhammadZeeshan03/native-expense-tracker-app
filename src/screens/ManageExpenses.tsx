import { StyleSheet, Text, View } from 'react-native'
import React, { useLayoutEffect } from 'react'
import IconButton from '../components/UI/IconButton';
import { GlobalStyles } from '../../constants/style';
import Button from '../components/UI/Button';

const ManageExpenses = ({ route, navigation }: any) => {
  const editedExpenseId = route.params?.expenseId;
  const isEditing = !!editedExpenseId;

  useLayoutEffect(() => {

    navigation.setOptions({
      title: isEditing ? 'Edit Expense' : 'Add Expense'
    })
  }, [navigation, isEditing])

  const deleteExpense = () => {

    navigation.goBack();
  }

  const cancelHandler = () => {
    navigation.goBack();
  }
  const confirmHandler = () => {

    navigation.goBack();
  }

  return (
    <View style={styles.container}>
      <Text>ManageExpenses Screen</Text>
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