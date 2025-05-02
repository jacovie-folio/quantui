import { ThemeProvider } from '@emotion/react';
import { CssBaseline } from '@mui/material';
import React from 'react';
import { FactoryLayoutFlow } from './components/FactoryLayout/FactoryLayout';
import { Main } from './components/Main';
import { ThemeSelectorContext } from './hooks/useThemeSelector';
import { DarkQuiTheme, LightQuiTheme } from './theme/getQuiTheme';

function App() {
  const [theme, setTheme] = React.useState<'light' | 'dark'>('dark');

  return (
    <ThemeSelectorContext.Provider value={{ theme, setTheme }}>
      <ThemeProvider theme={theme === 'light' ? LightQuiTheme : DarkQuiTheme}>
        <CssBaseline />
        <Main>
          <FactoryLayoutFlow />
        </Main>
      </ThemeProvider>
    </ThemeSelectorContext.Provider>
  );
}

export default App;
