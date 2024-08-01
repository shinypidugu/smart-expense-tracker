import React, { useState } from 'react';
import axios from 'axios';

const AddExpenseForm: React.FC = () => {
  const [description, setDescription] = useState('');
  const [amount, setAmount] = useState<number | ''>('');
  const [category, setCategory] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    axios.post('/api/expenses', { description, amount, category })
      .then(() => {
        setDescription('');
        setAmount('');
        setCategory('');
      })
      .catch(error => console.error('Error adding expense:', error));
  };

  return (
    <form onSubmit={handleSubmit}>
      <label>
        Description:
        <input type="text" value={description} onChange={(e) => setDescription(e.target.value)} />
      </label>
      <label>
        Amount:
        <input type="number" value={amount} onChange={(e) => setAmount(Number(e.target.value))} />
      </label>
      <label>
        Category:
        <input type="text" value={category} onChange={(e) => setCategory(e.target.value)} />
      </label>
      <button type="submit">Add Expense</button>
    </form>
  );
};

export default AddExpenseForm;
