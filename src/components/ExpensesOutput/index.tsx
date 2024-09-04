import { FlatList, StyleSheet, Text, View } from 'react-native'
import React from 'react'
import ExpensesSummary from './ExpensesSummary'
import ExpensesList from './ExpensesList'

export interface Expenses {
  id: string,
  amount: number,
  description: string,
  date: Date
}

interface ExpensesOutputProps {
  expenses: Expenses[];
  expensesPeriod: string;
}

const DUMMY_EXPENSE: Expenses[] = [
  {
    id: 'e1',
    amount: 100,
    description: 'A pair of shoes',
    date: new Date('2022-01-01')
  },
  {
    id: 'e2',
    amount: 50,
    description: 'Groceries',
    date: new Date('2022-01-03')
  },
  {
    id: 'e3',
    amount: 200,
    description: 'Monthly rent',
    date: new Date('2022-01-05')
  },
  {
    id: 'e4',
    amount: 15,
    description: 'Coffee with friends',
    date: new Date('2022-01-10')
  },
  {
    id: 'e5',
    amount: 120,
    description: 'New jacket',
    date: new Date('2022-01-12')
  }
];


const ExpensesOutput = ({ expenses, expensesPeriod }: ExpensesOutputProps) => {
  return (
    <View>
      <ExpensesSummary expenses={DUMMY_EXPENSE} periodName={expensesPeriod} />
      <ExpensesList expenses={DUMMY_EXPENSE} />
    </View>
  )
}

export default ExpensesOutput

const styles = StyleSheet.create({})