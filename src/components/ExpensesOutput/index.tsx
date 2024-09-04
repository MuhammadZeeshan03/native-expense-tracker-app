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
  },
  {
    id: 'e6',
    amount: 60,
    description: 'Dinner at a restaurant',
    date: new Date('2022-01-14')
  },
  {
    id: 'e7',
    amount: 30,
    description: 'Taxi ride',
    date: new Date('2022-01-15')
  },
  {
    id: 'e8',
    amount: 80,
    description: 'Grocery shopping',
    date: new Date('2022-01-18')
  },
  {
    id: 'e9',
    amount: 150,
    description: 'Concert tickets',
    date: new Date('2022-01-20')
  },
  {
    id: 'e10',
    amount: 40,
    description: 'Gas for the car',
    date: new Date('2022-01-22')
  },
  {
    id: 'e11',
    amount: 90,
    description: 'New headphones',
    date: new Date('2022-01-24')
  },
  {
    id: 'e12',
    amount: 70,
    description: 'Monthly subscription',
    date: new Date('2022-01-26')
  },
  {
    id: 'e13',
    amount: 20,
    description: 'Coffee beans',
    date: new Date('2022-01-28')
  },
  {
    id: 'e14',
    amount: 110,
    description: 'Gym membership',
    date: new Date('2022-01-29')
  },
  {
    id: 'e15',
    amount: 55,
    description: 'Movie night',
    date: new Date('2022-01-30')
  }
];



const ExpensesOutput = ({ expenses, expensesPeriod }: ExpensesOutputProps) => {
  return (
    <View style={styles.container}>
      <ExpensesSummary expenses={DUMMY_EXPENSE} periodName={expensesPeriod} />
      <ExpensesList expenses={DUMMY_EXPENSE} />
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
  }
})