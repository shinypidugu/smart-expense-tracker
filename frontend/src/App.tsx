import React, { useState, useEffect } from 'react';
import { Container, CssBaseline, AppBar, Toolbar, Typography, Snackbar, ThemeProvider, Paper } from '@mui/material';
import ExpenseList from './components/ExpenseList';
import AddExpenseForm from './components/AddExpenseForm';
import axios from 'axios';
import { Expense } from './types';
import darkTheme from './theme';  // Import the dark theme

function App() {
  const [expenses, setExpenses] = useState<Expense[]>([]);
  const [expenseToEdit, setExpenseToEdit] = useState<Expense | null>(null);
  const [successMessage, setSuccessMessage] = useState<string | null>(null);

  const fetchExpenses = async () => {
    try {
      const response = await axios.get('http://localhost:8080/api/expenses');
      setExpenses(response.data);
    } catch (error) {
      console.error('Error fetching expenses:', error);
    }
  };

  const handleDelete = async (id: number) => {
    try {
      await axios.delete(`http://localhost:8080/api/expenses/${id}`);
      setSuccessMessage('Expense deleted successfully.');
      fetchExpenses(); // Refresh the list after deletion
    } catch (error) {
      console.error('Error deleting expense:', error);
    }
  };

  useEffect(() => {
    fetchExpenses();
  }, []);

  return (
    <ThemeProvider theme={darkTheme}>
      <CssBaseline />
      <AppBar position="static" color="primary">
        <Toolbar>
          <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
            Smart Expense Tracker
          </Typography>
        </Toolbar>
      </AppBar>
      <Container maxWidth="md" style={{ marginTop: '20px', padding: '20px', borderRadius: '8px', backgroundColor: '#0d1117' }}>
        <Typography variant="h4" gutterBottom>
          {expenseToEdit ? 'Edit Expense' : 'Add Expense'}
        </Typography>
        <Paper elevation={3} style={{ padding: '20px', backgroundColor: '#0d1117', border: '1px solid #3d444d' }}>
          <AddExpenseForm 
            fetchExpenses={fetchExpenses} 
            expenseToEdit={expenseToEdit} 
            setExpenseToEdit={setExpenseToEdit} 
            setSuccessMessage={setSuccessMessage}
          />
        </Paper>
        <Typography variant="h4" gutterBottom style={{ marginTop: '40px' }}>
          Expense List
        </Typography>
        <Paper elevation={3} style={{ backgroundColor: '#0d1117', border: '1px solid #3d444d' }}>
          <ExpenseList 
            expenses={expenses} 
            fetchExpenses={fetchExpenses} 
            setExpenseToEdit={setExpenseToEdit} 
            handleDelete={handleDelete}
          />
        </Paper>

        <Snackbar
          open={Boolean(successMessage)}
          autoHideDuration={4000}
          onClose={() => setSuccessMessage(null)}
          message={successMessage}
        />
      </Container>
    </ThemeProvider>
  );
}

export default App;
