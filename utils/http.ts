import axios from 'axios'
import { Expenses } from '../src/components/ExpensesOutput'

export const storeExpense = async (expenseData: Expenses) => {
  console.log(process.env.FIREBASE_URL!)
  await axios.post(process.env.FIREBASE_URL!,
    expenseData
  );
}