import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import ExpensesOutput from '../components/ExpensesOutput'

const RecentExpenses = () => {
  return (
    <ExpensesOutput
      expensesPeriod='Last 7 days'
      expenses={[]}
    />
  )
}

export default RecentExpenses

const styles = StyleSheet.create({})