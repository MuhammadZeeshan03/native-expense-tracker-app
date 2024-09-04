import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import { Expenses } from '.';

interface ExpensesSummaryProps {
  periodName: string;
  expenses: Array<Expenses>;
}

const ExpensesSummary = ({ expenses, periodName }: ExpensesSummaryProps) => {
  const totalAmount = expenses.reduce((sum, expense) => sum + expense.amount, 0)
  return (
    <View>
      <Text>{periodName}</Text>
      <Text>${totalAmount.toFixed(2)}</Text>
    </View>
  )
}

export default ExpensesSummary

const styles = StyleSheet.create({})