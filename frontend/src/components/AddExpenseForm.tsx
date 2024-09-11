import React, { useState, useEffect } from 'react';
import { TextField, Button, Grid, Paper, MenuItem } from '@mui/material';
import axios from 'axios';
import { Expense } from '../types';

interface AddExpenseFormProps {
  fetchExpenses: () => void;
  expenseToEdit: Expense | null;
  setExpenseToEdit: (expense: Expense | null) => void;
  setSuccessMessage: (message: string | null) => void;
}

const AddExpenseForm: React.FC<AddExpenseFormProps> = ({ fetchExpenses, expenseToEdit, setExpenseToEdit, setSuccessMessage }) => {
  const [description, setDescription] = useState('');
  const [amount, setAmount] = useState('');
  const [date, setDate] = useState('');
  const [category, setCategory] = useState('');

  const categories = ['Groceries', 'Utilities', 'Entertainment', 'Travel', 'Other'];

  useEffect(() => {
    if (expenseToEdit) {
      setDescription(expenseToEdit.description);
      setAmount(String(expenseToEdit.amount));
      setDate(expenseToEdit.date);
      setCategory(expenseToEdit.category);
    } else {
      setDescription('');
      setAmount('');
      setDate('');
      setCategory('');
    }
  }, [expenseToEdit]);

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();

    const expenseData: Expense = {
      description,
      amount: parseFloat(amount),
      date,
      category,
    };

    try {
      if (expenseToEdit?.id) {
        await axios.put(`http://localhost:8080/api/expenses/${expenseToEdit.id}`, expenseData);
        setExpenseToEdit(null);
        setSuccessMessage('Expense updated successfully.');
      } else {
        await axios.post(`http://localhost:8080/api/expenses`, expenseData);
        setSuccessMessage('Expense added successfully.');
      }

      setDescription('');
      setAmount('');
      setDate('');
      setCategory('');

      fetchExpenses();
    } catch (error) {
      console.error('Error saving expense:', error);
    }
  };

  // Disable button if any field is empty
  const isFormValid = description !== '' && amount !== '' && date !== '' && category !== '';

  return (
    <Paper 
      elevation={0}  // Remove shadow
      style={{ 
        padding: '20px', 
        backgroundColor: '#0d1117', 
        border: '1px solid #30363d',  // Ensure border consistency
        marginBottom: '20px',  // Add consistent spacing with the Expense List
        boxShadow: 'none',  // Ensure no shadow is applied
      }}
    >
      <form onSubmit={handleSubmit}>
        <Grid container spacing={2}>
          <Grid item xs={12} sm={6}>
            <TextField
              label="Description"
              variant="outlined"
              fullWidth
              required
              value={description}
              onChange={(e) => setDescription(e.target.value)}
            />
          </Grid>
          <Grid item xs={12} sm={3}>
            <TextField
              label="Amount"
              variant="outlined"
              type="number"
              fullWidth
              required
              value={amount}
              onChange={(e) => setAmount(e.target.value)}
            />
          </Grid>
          <Grid item xs={12} sm={3}>
            <TextField
              label="Date"
              variant="outlined"
              type="date"
              fullWidth
              required
              value={date}
              onChange={(e) => setDate(e.target.value)}
              InputLabelProps={{
                shrink: true,
              }}
            />
          </Grid>
          <Grid item xs={12}>
            <TextField
              select
              label="Category"
              variant="outlined"
              fullWidth
              required
              value={category}
              onChange={(e) => setCategory(e.target.value)}
            >
              {categories.map((option) => (
                <MenuItem key={option} value={option}>
                  {option}
                </MenuItem>
              ))}
            </TextField>
          </Grid>
          <Grid item xs={12}>
            <Button
              variant="contained"
              sx={{
                backgroundColor: isFormValid ? '#30363d' : '#484f58',  // Dark button background when valid, lighter when disabled
                color: '#c9d1d9',
                '&:hover': {
                  backgroundColor: isFormValid ? '#484f58' : '#30363d',  // Lighten on hover if valid
                },
              }}
              type="submit"
              fullWidth
              disabled={!isFormValid}  // Disable button if form is invalid
            >
              {expenseToEdit ? 'Update Expense' : 'Add Expense'}
            </Button>
          </Grid>
        </Grid>
      </form>
    </Paper>
  );
};

export default AddExpenseForm;
