import { FlatList, StyleSheet, Text, View } from 'react-native'
import React from 'react'
import { Expenses } from '.'
import ExpenseItem from './ExpenseItem';

interface ExpensesListProps {
  expenses: Expenses[];
}
interface RenderExpenseItemProps {
  itemData: {
    item: Expenses,
  }
}

function RenderExpenseItem({ itemData }: RenderExpenseItemProps) {
  return <ExpenseItem {...itemData.item} />
}

const ExpensesList = ({ expenses }: ExpensesListProps) => {
  return (
    <FlatList
      data={expenses}
      renderItem={(item) => <RenderExpenseItem itemData={item} />}
      keyExtractor={(item) => item.id}
    />
  )
}

export default ExpensesList

const styles = StyleSheet.create({})