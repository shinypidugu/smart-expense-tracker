import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useParams, useNavigate } from 'react-router-dom';

const EditExpenseForm: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const [description, setDescription] = useState('');
  const [amount, setAmount] = useState<number | ''>('');
  const [category, setCategory] = useState('');

  useEffect(() => {
    axios.get(`/api/expenses/${id}`)
      .then(response => {
        setDescription(response.data.description);
        setAmount(response.data.amount);
        setCategory(response.data.category);
      })
      .catch(error => console.error('Error fetching expense:', error));
  }, [id]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    axios.put(`/api/expenses/${id}`, { description, amount, category })
      .then(() => navigate('/'))
      .catch(error => console.error('Error updating expense:', error));
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
      <button type="submit">Update Expense</button>
    </form>
  );
};

export default EditExpenseForm;
