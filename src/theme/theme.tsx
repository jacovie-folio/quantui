import { createTheme } from '@mui/material';

export const darkTheme = createTheme({
  palette: {
    mode: 'dark',
    primary: {
      main: '#00ffff', // glowing cyan
      contrastText: '#02161c',
    },
    secondary: {
      main: '#ffc060', // radiant gold
      contrastText: '#02161c',
    },
    background: {
      default: '#02161c', // deep teal background
      paper: '#032226', // panels
    },
    text: {
      primary: '#fceca8', // pale gold for main text
      secondary: '#00e6e6', // light cyan for labels
    },
    divider: '#00c0c066',
  },
  typography: {
    fontFamily: `'Segoe UI', 'Roboto', 'Helvetica Neue', sans-serif`,
    fontWeightRegular: 400,
    fontWeightBold: 700,
    h1: { fontSize: '2.5rem', color: '#ffc060' },
    h2: { fontSize: '2rem', color: '#ffc060' },
    h3: { fontSize: '1.75rem', color: '#00ffff' },
    body1: { fontSize: '1rem', color: '#fceca8' },
    button: {
      textTransform: 'uppercase',
      fontWeight: 700,
    },
  },
  components: {
    MuiPaper: {
      styleOverrides: {
        root: {
          backgroundColor: '#042229',
          border: '2px solid #ffaa00',
          boxShadow: '0 0 12px #00ffff55',
        },
      },
    },
    MuiButton: {
      styleOverrides: {
        root: {
          borderRadius: '8px',
          boxShadow: '0 0 6px #00ffff88',
          backgroundColor: '#033a3a',
          color: '#ffc060',
          '&:hover': {
            backgroundColor: '#044f4f',
            boxShadow: '0 0 10px #00ffffaa',
          },
        },
      },
    },
    MuiCard: {
      styleOverrides: {
        root: {
          background: '#031c22',
          border: '1px solid #00c0ff',
          boxShadow: '0 0 8px #00ffff33',
        },
      },
    },
    MuiTypography: {
      styleOverrides: {
        root: {
          textShadow: '0 0 4px #00ffff44',
        },
      },
    },
    MuiDivider: {
      styleOverrides: {
        root: {
          backgroundColor: '#00ffff66',
        },
      },
    },
  },
});
