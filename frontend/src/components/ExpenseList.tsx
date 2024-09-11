import React from 'react';
import { Paper, Typography, Button, Box, Divider } from '@mui/material';
import { Expense } from '../types';

interface ExpenseListProps {
  expenses: Expense[];
  fetchExpenses: () => void;
  setExpenseToEdit: (expense: Expense | null) => void;
  handleDelete: (id: number) => void;
}

const formatDateForDisplay = (date: string) => {
  const [year, month, day] = date.split('-');
  return `${day}/${month}/${year}`;
};

const ExpenseList: React.FC<ExpenseListProps> = ({ expenses, setExpenseToEdit, handleDelete }) => {
  return (
    <Paper 
      elevation={0} 
      style={{ 
        padding: '20px', 
        backgroundColor: '#0d1117', 
        border: '1px solid #30363d', 
        borderRadius: '8px', 
      }}
    >
      {/* Header Row for the Column Titles */}
      <Box display="flex" justifyContent="space-between" py={1} style={{ borderBottom: '1px solid #30363d' }}>
        <Typography variant="h6" style={{ flex: 1, textAlign: 'center' }}>Description</Typography>
        <Typography variant="h6" style={{ flex: 1, textAlign: 'center' }}>Amount</Typography>
        <Typography variant="h6" style={{ flex: 1, textAlign: 'center' }}>Date</Typography>
        <Typography variant="h6" style={{ flex: 1, textAlign: 'center' }}>Category</Typography>
        <Typography variant="h6" style={{ flex: 1, textAlign: 'center' }}>Actions</Typography>
      </Box>

      {/* Expense Items */}
      {expenses.map((expense, index) => (
        <React.Fragment key={expense.id}>
          <Box display="flex" justifyContent="space-between" alignItems="center" py={2} style={{ paddingLeft: '10px', paddingRight: '10px' }}>
            {/* Description */}
            <Typography variant="body2" style={{ flex: 1 }}>{expense.description}</Typography>

            {/* Amount */}
            <Typography variant="body2" style={{ flex: 1, textAlign: 'center' }}>${expense.amount.toFixed(2)}</Typography>

            {/* Date */}
            <Typography variant="body2" style={{ flex: 1, textAlign: 'center' }}>{formatDateForDisplay(expense.date)}</Typography>

            {/* Category */}
            <Typography variant="body2" style={{ flex: 1, textAlign: 'center' }}>{expense.category}</Typography>

            {/* Actions */}
            <Box display="flex" justifyContent="flex-end" style={{ flex: 1 }}>
              <Button
                variant="contained"
                sx={{
                  backgroundColor: '#30363d',
                  color: '#c9d1d9',
                  '&:hover': {
                    backgroundColor: '#484f58',
                  },
                  marginRight: '10px',
                }}
                onClick={() => setExpenseToEdit(expense)}
              >
                Edit
              </Button>
              <Button
                variant="contained"
                sx={{
                  backgroundColor: '#d73a49',
                  color: '#ffffff',
                  '&:hover': {
                    backgroundColor: '#a82a3c',
                  },
                }}
                onClick={() => handleDelete(expense.id!)}
              >
                Delete
              </Button>
            </Box>
          </Box>

          {/* Full-Length Divider */}
          {index < expenses.length - 1 && <Divider style={{ backgroundColor: '#30363d', width: '100%' }} />}
        </React.Fragment>
      ))}
    </Paper>
  );
};

export default ExpenseList;
