import { PropsWithChildren } from 'react';
import { StyledEngineProvider } from '@mui/material/styles';

export default function MUIProvider({children}: PropsWithChildren) {
  return (
    <StyledEngineProvider injectFirst>
      {children}
    </StyledEngineProvider>
  );
}