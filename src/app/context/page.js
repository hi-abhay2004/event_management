'use client'
import React, { createContext, useContext, useState, useEffect } from 'react';
import { ThemeProvider as MuiThemeProvider, createTheme } from '@mui/material/styles';
import WebFont from 'webfontloader';

const ThemeContext = createContext();

export const useThemeContext = () => useContext(ThemeContext);

export const ThemeProvider = ({ children }) => {
  const [themeMode, setThemeMode] = useState('light');

  useEffect(() => {
    WebFont.load({
      google: {
        families: ['Cormorant Garamond:300,400,500,600,700']
      }
    });
  }, []);

  const toggleTheme = () => {
    setThemeMode((prevMode) => (prevMode === 'light' ? 'dark' : 'light'));
  };

  const commonThemeProperties = {
    typography: {
      fontFamily: 'Cormorant Garamond, serif',
      h1: {
        fontFamily: 'Cormorant Garamond, serif',
        fontSize: 43,
        fontWeight: 600,
      },
      h2: {
        fontFamily: 'Cormorant Garamond, serif',
        fontSize: 37,
        fontWeight: 600,
      },
      h3: {
        fontFamily: 'Cormorant Garamond, serif',
        fontSize: 33,
        fontWeight: 600,
      },
      h4: {
        fontFamily: 'Cormorant Garamond, serif',
        fontSize: 27,
        fontWeight: 600,
      },
      h5: {
        fontFamily: 'Cormorant Garamond, serif',
        fontSize: 23,
        fontWeight: 600,
      },
      h6: {
        fontFamily: 'Cormorant Garamond, serif',
        fontSize: 18,
        fontWeight: 600,
      },
    },
    breakpoints: {
      values: {
        xs: 0,
        sm: 600,
        md: 960,
        lg: 1280,
        xl: 1920,
      },
    },
    components: {
      MuiAppBar: {
        // styleOverrides: {
        //   colorPrimary: {
        //     background: themeMode === 'dark' ? '#25293C !important' : '#ffffff !important',
        //     color: themeMode === 'dark' ? '#edeff2 !important' : '#363636 !important',
        //   },
        // },
      },
    },
  };

  const lightTheme = createTheme({
    ...commonThemeProperties,
    // palette: {
    //   mode: 'light',
    //   primary: {
    //     main: '#7367f0',
    //   },
    //   secondary: {
    //     main: '#3bb6f6',
    //   },
    //   action: {
    //     main: '#hhhhhh',
    //   },
    //   error: {
    //     main: '#ea5455',
    //   },
    //   neutral: {
    //     dark: '#856EDF',
    //     main: '#856EDF',
    //     light: '#856EDF',
    //   },
    //   background: {
    //     default: '#F2F5F6',
    //     paper: '#ffffff',
    //     hover: '#856EDF',
    //     timeRange: '#ffffff',
    //     textColor: '#363636',
    //   },
    // },
  });

  const darkTheme = createTheme({
    ...commonThemeProperties,
    // palette: {
    //   mode: 'dark',
    //   primary: {
    //     main: '#7367f0',
    //   },
    //   secondary: {
    //     main: '#3bb6f6',
    //   },
    //   action: {
    //     main: '#fafafa',
    //   },
    //   error: {
    //     main: '#ea5455',
    //   },
    //   neutral: {
    //     dark: '#856EDF',
    //     main: '#856EDF',
    //     light: '#856EDF',
    //   },
    //   background: {
    //     default: '#3a3e4f',
    //     paper: '#25293C',
    //     widget: '#3a3e4f',
    //     hover: '#856EDF',
    //     timeRange: '#303654',
    //     textColor: '#fafafa',
    //   },
    // },
  });

  return (
    <ThemeContext.Provider value={{ themeMode, toggleTheme, darkTheme, lightTheme }}>
      <MuiThemeProvider theme={themeMode === 'dark' ? darkTheme : lightTheme}>
        {children}
      </MuiThemeProvider>
    </ThemeContext.Provider>
  );
};
