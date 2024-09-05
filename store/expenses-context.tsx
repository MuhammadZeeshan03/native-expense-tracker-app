import React, { createContext, useReducer, ReactNode } from "react";

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
  addExpense: (expenseData: Expense) => void;
  setExpenses: (expenses: Expense[]) => void;
  deleteExpense: (id: string) => void;
  updateExpense: (id: string, updatedExpense: Partial<Expense>) => void;
}

// Create the context with a default value
export const ExpenseContext = createContext<ExpenseContextType>({
  expenses: [],
  addExpense: () => { },
  setExpenses: (expenses: Expense[]) => { },
  deleteExpense: () => { },
  updateExpense: () => { },
});

// Define the action types
type Action =
  | { type: 'ADD'; payload: Expense }
  | { type: 'UPDATE'; payload: { id: string; updatedExpense: Partial<Expense> } }
  | { type: 'DELETE'; payload: string }
  | { type: 'SET'; payload: Expense[] };

// Reducer function
function expensesReducer(state: Expense[], action: Action): Expense[] {
  switch (action.type) {
    case 'ADD':

      return [action.payload, ...state];
    case 'SET':
      const inverted = action.payload.reverse();
      return inverted;
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
  const [expenseState, dispatch] = useReducer(expensesReducer, []);

  function addExpense(expenseData: Expense) {
    dispatch({ type: 'ADD', payload: expenseData });
  }
  function setExpenses(expenses: Expense[]) {
    dispatch({ type: 'SET', payload: expenses });
  }

  function updateExpense(id: string, updatedExpense: Partial<Expense>) {
    dispatch({ type: 'UPDATE', payload: { id, updatedExpense } });
  }

  function deleteExpense(id: string) {
    dispatch({ type: 'DELETE', payload: id });
  }

  return (
    <ExpenseContext.Provider
      value={{ expenses: expenseState, addExpense, setExpenses, deleteExpense, updateExpense }}>
      {children}
    </ExpenseContext.Provider>
  );
}
