import axios from 'axios'
import { Expenses } from '../src/components/ExpensesOutput'

export const storeExpense = async (expenseData: Expenses) => {
  const response = await axios.post(process.env.FIREBASE_URL!,
    expenseData
  );
  const id = response.data.name;
  return id;
}

export const fetchExpenses = async () => {
  const response = await axios.get(process.env.FIREBASE_URL!);
  const expenses = [];

  for (const key in response.data) {
    const expenseObj = {
      id: key,
      amount: response.data[key].amount,
      date: new Date(response.data[key].date),
      description: response.data[key].description,
    };
    expenses.push(expenseObj);
  }

  return expenses;
}