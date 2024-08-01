import React from 'react';
import { Route, Routes } from 'react-router-dom';
import ExpenseList from './components/ExpenseList';
import AddExpenseForm from './components/AddExpenseForm';
import EditExpenseForm from './components/EditExpenseForm';

const App: React.FC = () => {
  return (
    <div>
      <nav>
        <ul>
          <li><a href="/">Home</a></li>
          <li><a href="/add">Add Expense</a></li>
        </ul>
      </nav>
      <Routes>
        <Route path="/" element={<ExpenseList />} />
        <Route path="/add" element={<AddExpenseForm />} />
        <Route path="/edit/:id" element={<EditExpenseForm />} />
      </Routes>
    </div>
  );
};

export default App;
