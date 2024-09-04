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

export const DUMMY_EXPENSE: Expenses[] = [
  {
    id: 'e1',
    amount: 100,
    description: 'A pair of shoes',
    date: new Date('2024-09-04')
  },
  {
    id: 'e2',
    amount: 50,
    description: 'Groceries',
    date: new Date('2024-09-03')
  },
  {
    id: 'e3',
    amount: 200,
    description: 'Monthly rent',
    date: new Date('2024-09-02')
  },
  {
    id: 'e4',
    amount: 15,
    description: 'Coffee with friends',
    date: new Date('2024-09-01')
  },
  {
    id: 'e5',
    amount: 120,
    description: 'New jacket',
    date: new Date('2024-08-04')
  },
  {
    id: 'e6',
    amount: 60,
    description: 'Dinner at a restaurant',
    date: new Date('2024-08-03')
  },
  {
    id: 'e7',
    amount: 30,
    description: 'Taxi ride',
    date: new Date('2024-08-02')
  },
  {
    id: 'e8',
    amount: 80,
    description: 'Grocery shopping',
    date: new Date('2024-08-01')
  },
  {
    id: 'e9',
    amount: 150,
    description: 'Concert tickets',
    date: new Date('2024-08-01')
  },
  {
    id: 'e10',
    amount: 40,
    description: 'Gas for the car',
    date: new Date('2024-08-02')
  },
  {
    id: 'e11',
    amount: 90,
    description: 'New headphones',
    date: new Date('2024-08-03')
  },
  {
    id: 'e12',
    amount: 70,
    description: 'Monthly subscription',
    date: new Date('2024-08-28')
  },
  {
    id: 'e13',
    amount: 20,
    description: 'Coffee beans',
    date: new Date('2024-08-27')
  },
  {
    id: 'e14',
    amount: 110,
    description: 'Gym membership',
    date: new Date('2024-08-26')
  },
  {
    id: 'e15',
    amount: 55,
    description: 'Movie night',
    date: new Date('2024-08-25')
  }
];



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