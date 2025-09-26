import { Box, CssBaseline } from '@mui/material';
import { ThemeProvider } from '@mui/material/styles';
import { ActionBar } from './components/ActionBar';
import { CharacterSheet } from './components/CharacterSheet';
import { DetailTabs } from './components/DetailTabs';
import { darkTheme } from './theme/theme';

export default function App() {
  return (
    <ThemeProvider theme={darkTheme}>
      <CssBaseline />
      <Box
        sx={{
          height: '100vh',
          width: '100vw',
          backgroundColor: '#0f172a',
          color: '#a5f3fc',
          overflow: 'hidden',
          display: 'flex',
        }}
      >
        {/* Left sidebar - Character Sheet */}
        <Box
          sx={{
            width: 320,
            backgroundColor: 'rgba(30, 41, 59, 0.9)',
            borderRight: '1px solid rgba(6, 182, 212, 0.3)',
          }}
        >
          <CharacterSheet />
        </Box>

        {/* Main content area */}
        <Box sx={{ flexGrow: 1, display: 'flex', flexDirection: 'column' }}>
          {/* Game content area (placeholder) */}
          <Box
            sx={{
              flexGrow: 1,
              background:
                'linear-gradient(135deg, #0f172a 0%, #1e293b 50%, #0f172a 100%)',
              position: 'relative',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
            }}
          >
            <Box
              sx={{
                position: 'absolute',
                inset: 0,
                background:
                  'linear-gradient(90deg, rgba(88, 28, 135, 0.1) 0%, rgba(8, 145, 178, 0.1) 100%)',
              }}
            />
            <Box sx={{ textAlign: 'center', zIndex: 1 }}>
              <Box
                sx={{
                  fontSize: '2.25rem',
                  color: 'rgba(6, 182, 212, 0.5)',
                  mb: 1,
                }}
              >
                GAME CONTENT AREA
              </Box>
              <Box sx={{ color: 'rgba(103, 232, 249, 0.3)' }}>
                Ready for implementation...
              </Box>
            </Box>
          </Box>

          {/* Bottom action bar */}
          <Box
            sx={{
              height: 96,
              backgroundColor: 'rgba(30, 41, 59, 0.95)',
              borderTop: '1px solid rgba(6, 182, 212, 0.3)',
            }}
          >
            <ActionBar />
          </Box>
        </Box>

        {/* Right sidebar - Detail Tabs */}
        <Box
          sx={{
            width: 320,
            backgroundColor: 'rgba(30, 41, 59, 0.9)',
            borderLeft: '1px solid rgba(6, 182, 212, 0.3)',
          }}
        >
          <DetailTabs />
        </Box>
      </Box>
    </ThemeProvider>
  );
}
