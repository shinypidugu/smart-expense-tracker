// src/theme.ts
import { createTheme } from '@mui/material/styles';

const darkTheme = createTheme({
  palette: {
    mode: 'dark',
    primary: {
      main: '#30363d',  // Button background color
    },
    secondary: {
      main: '#d73a49',  // Delete button color
    },
    background: {
      default: '#0d1117',  // Unified background color
    },
    text: {
      primary: '#c9d1d9',  // Light gray for text
      secondary: '#8b949e',  // Muted text color
    },
  },
  components: {
    MuiPaper: {
      styleOverrides: {
        root: {
          backgroundColor: '#010409',  // Same background color as the main app background
          borderBottom: '1px solid #3d444d',  // Border for visual separation
          boxShadow: 'none',  // Remove any shadow or overlay effect
          backgroundImage: 'none',  // Remove any background-image like overlay effects
        },
      },
    },
    MuiContainer: {
      styleOverrides: {
        root: {
          backgroundColor: '#0d1117',  // Ensure containers use the same background
        },
      },
    },
    MuiButton: {
      styleOverrides: {
        root: {
          border: '1px solid #3d444d',  // Button border
          backgroundColor: '#30363d',  // Same color as the background
          color: '#c9d1d9',  // Text color
          '&:hover': {
            backgroundColor: '#484f58',  // Lighten on hover
          },
        },
      },
    },
    MuiTableCell: {
      styleOverrides: {
        root: {
          backgroundColor: '#0d1117',  // Table cells should have the same background as the main background
          border: '1px solid #3d444d',  // Borders for table cells
        },
      },
    },
    MuiOutlinedInput: {
      styleOverrides: {
        root: {
          '& .MuiSvgIcon-root': {
            color: '#c9d1d9',  // Change the color of the calendar icon
          },
        },
      },
    },
    MuiIconButton: {
      styleOverrides: {
        root: {
          color: '#c9d1d9',  // Ensures that any icon buttons (like the calendar icon button) are light
        },
      },
    },
  },
});

export default darkTheme;
