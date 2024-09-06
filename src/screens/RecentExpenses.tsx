import { StyleSheet, Text, View } from 'react-native'
import React, { useContext, useEffect, useState } from 'react'
import ExpensesOutput from '../components/ExpensesOutput'
import { ExpenseContext } from '../../store/expenses-context'
import { getDateMinusDays } from '../../utils/date'
import { fetchExpenses } from '../../utils/http'

const RecentExpenses = () => {
  const expensesCtx = useContext(ExpenseContext);

  const recentExpenses = expensesCtx.expenses.filter((expense) => {
    const today = new Date();
    const date7DaysAgo = getDateMinusDays(today, 7);
    return (expense.date >= date7DaysAgo) && (expense.date <= today)
  })

  useEffect(() => {
    async function getExpenses() {
      const expenses = await fetchExpenses();
      expensesCtx.setExpenses(expenses);
    }

    getExpenses();
  }, [])

  return (
    <ExpensesOutput
      expensesPeriod='Last 7 days'
      fallBackText='No Expenses Registered for the last 7 days'
      expenses={recentExpenses}
    />
  )
}

export default RecentExpenses

const styles = StyleSheet.create({})
