import React, { createContext, useReducer, ReactNode } from "react";
import { DUMMY_EXPENSE } from "../src/components/ExpensesOutput";

// Define the Expense interface
interface Expense {
  id: string;
  description: string;
  amount: number;
  date: Date;
}

// Define the initial context type
interface ExpenseContextType {
  expenses: Expense[];
  addExpense: (expenseData: Omit<Expense, 'id'>) => void;
  deleteExpense: (id: string) => void;
  updateExpense: (id: string, updatedExpense: Partial<Expense>) => void;
}

// Create the context with a default value
export const ExpenseContext = createContext<ExpenseContextType>({
  expenses: [],
  addExpense: () => { },
  deleteExpense: () => { },
  updateExpense: () => { },
});

// Define the action types
type Action =
  | { type: 'ADD'; payload: Omit<Expense, 'id'> }
  | { type: 'UPDATE'; payload: { id: string; updatedExpense: Partial<Expense> } }
  | { type: 'DELETE'; payload: string };

// Reducer function
function expensesReducer(state: Expense[], action: Action): Expense[] {
  switch (action.type) {
    case 'ADD':
      const id = new Date().toISOString() + Math.random().toString();
      return [{ ...action.payload, id }, ...state];
    case 'UPDATE':
      return state.map((expense) =>
        expense.id === action.payload.id ? { ...expense, ...action.payload.updatedExpense } : expense
      );
    case 'DELETE':
      return state.filter((expense) => expense.id !== action.payload);
    default:
      return state;
  }
}

// Provider component
interface ExpensesContextProviderProps {
  children: ReactNode;
}

export function ExpensesContextProvider({ children }: ExpensesContextProviderProps) {
  const [expenseState, dispatch] = useReducer(expensesReducer, DUMMY_EXPENSE);

  function addExpense(expenseData: Omit<Expense, 'id'>) {
    dispatch({ type: 'ADD', payload: expenseData });
  }

  function updateExpense(id: string, updatedExpense: Partial<Expense>) {
    dispatch({ type: 'UPDATE', payload: { id, updatedExpense } });
  }

  function deleteExpense(id: string) {
    dispatch({ type: 'DELETE', payload: id });
  }

  return (
    <ExpenseContext.Provider
      value={{ expenses: expenseState, addExpense, deleteExpense, updateExpense }}>
      {children}
    </ExpenseContext.Provider>
  );
}
