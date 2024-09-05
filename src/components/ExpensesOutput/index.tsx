import { FlatList, StyleSheet, Text, View } from 'react-native'
import React from 'react'
import ExpensesSummary from './ExpensesSummary'
import ExpensesList from './ExpensesList'
import { GlobalStyles } from '../../../constants/style'

export interface Expenses {
  id: string,
  amount: number,
  description: string,
  date: Date
}

interface ExpensesOutputProps {
  expenses: Expenses[];
  expensesPeriod: string;
  fallBackText: string;
}

const ExpensesOutput = ({ expenses, expensesPeriod, fallBackText }: ExpensesOutputProps) => {
  let content = <Text style={styles.infoText}>{fallBackText}</Text>
  if (expenses.length > 0) {
    content = <ExpensesList expenses={expenses} />
  }
  return (
    <View style={styles.container}>
      <ExpensesSummary expenses={expenses} periodName={expensesPeriod} />
      {content}
    </View>
  )
}

export default ExpensesOutput

const styles = StyleSheet.create({
  container: {
    paddingHorizontal: 24,
    paddingTop: 24,
    paddingBottom: 0,
    backgroundColor: GlobalStyles.colors.primary700,
    flex: 1,
  },
  infoText: {
    color: 'white',
    fontSize: 16,
    textAlign: 'center',
    marginTop: 32,

  }
})