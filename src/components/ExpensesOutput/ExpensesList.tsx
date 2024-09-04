import { FlatList, StyleSheet, Text, View } from 'react-native'
import React from 'react'
import { Expenses } from '.'

interface ExpensesListProps {
  expenses: Expenses[];
}
interface RenderExpenseItemProps {
  itemData: {
    item: Expenses,
  }
}

function RenderExpenseItem({ itemData }: RenderExpenseItemProps) {
  return <Text>{itemData.item.description}</Text>
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