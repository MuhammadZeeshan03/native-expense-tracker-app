import { StyleSheet, Text, View } from 'react-native'
import React, { useContext, useEffect, useState } from 'react'
import ExpensesOutput from '../components/ExpensesOutput'
import { ExpenseContext } from '../../store/expenses-context'
import { getDateMinusDays } from '../../utils/date'
import { fetchExpenses } from '../../utils/http'
import LoadingOverlay from '../components/UI/LoadingOverlay'
import ErrorOverlay from '../components/UI/ErrorOverlay'

const RecentExpenses = () => {
  const expensesCtx = useContext(ExpenseContext);
  const [isFetching, setIsFetching] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  const recentExpenses = expensesCtx.expenses.filter((expense) => {
    const today = new Date();
    const date7DaysAgo = getDateMinusDays(today, 7);
    return (expense.date >= date7DaysAgo) && (expense.date <= today)
  })

  useEffect(() => {
    async function getExpenses() {
      setIsFetching(true);
      try {
        const expenses = await fetchExpenses();
        expensesCtx.setExpenses(expenses);
      } catch (error) {
        setError('Could not Fetch Expenses');
      }
      setIsFetching(false);
    }

    getExpenses();
  }, []);

  if (error && !isFetching) {
    return <ErrorOverlay message={error} />
  }

  if (isFetching) {
    return (<LoadingOverlay />)
  }

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
