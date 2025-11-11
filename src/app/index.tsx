import { QueryClientProvider } from '@tanstack/react-query';
import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import { ThemeProvider } from 'styled-components';
import { queryClient } from '@/app/provider/queryClient';
import { Theme } from '@/app/styles/theme.ts';
import App from './App';
import './styles/index.css';

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <QueryClientProvider client={queryClient}>
      <ThemeProvider theme={Theme}>
        <App />
      </ThemeProvider>
    </QueryClientProvider>
  </StrictMode>,
);
