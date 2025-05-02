import React from 'react';

export interface ThemeSelectorContext {
  theme: 'light' | 'dark';
  setTheme: React.Dispatch<React.SetStateAction<'light' | 'dark'>>;
}

export const ThemeSelectorContext = React.createContext<ThemeSelectorContext>({
  theme: 'dark',
  setTheme: () => {},
});

export const useThemeSelector = () => {
  const context = React.useContext(ThemeSelectorContext);
  if (!context) {
    throw new Error(
      'useThemeSelector must be used within a ThemeSelectorProvider'
    );
  }
  return context;
};
