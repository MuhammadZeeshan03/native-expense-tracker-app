import { StyleSheet, Text, View } from 'react-native'
import React, { useContext } from 'react'
import ExpensesOutput from '../components/ExpensesOutput'
import { ExpenseContext } from '../../store/expenses-context'

const AllExpenses = () => {
  const expensesCtx = useContext(ExpenseContext)

  return (
    <ExpensesOutput expensesPeriod='Total' expenses={expensesCtx.expenses} />
  )
}

export default AllExpenses

const styles = StyleSheet.create({})