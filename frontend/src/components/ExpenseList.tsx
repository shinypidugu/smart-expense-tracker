import React, { useEffect, useState } from 'react';
import axios from 'axios';

interface Expense {
  id: number;
  description: string;
  amount: number;
  category: string;
}

const ExpenseList: React.FC = () => {
  const [expenses, setExpenses] = useState<Expense[]>([]);

  useEffect(() => {
    console.log("Fetching expenses...");
    axios.get('http://localhost:8080/api/expenses')
      .then(response => {
        console.log('Fetched expenses:', response.data);
        setExpenses(response.data);
      })
      .catch(error => console.error('Error fetching expenses:', error));
  }, []);

  return (
    <div>
      <h1>Expense List</h1>
      <ul>
        {expenses.map(expense => (
          <li key={expense.id}>
            {expense.description} - ${expense.amount}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default ExpenseList;
