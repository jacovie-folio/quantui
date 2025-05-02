import { Stack, useTheme } from '@mui/material';

export const Main = ({ children }: { children: React.ReactNode }) => {
  const theme = useTheme();
  return (
    <Stack
      direction="row"
      alignItems="center"
      justifyContent="center"
      spacing={2}
      sx={{
        width: '100vw',
        height: '100vh',
        backgroundColor: theme.palette.background.default,
      }}
    >
      <Stack
        direction="column"
        alignItems="center"
        justifyContent="center"
        spacing={2}
        sx={{ width: '100vw', height: '100vh' }}
      >
        <main>{children}</main>
      </Stack>
    </Stack>
  );
};
