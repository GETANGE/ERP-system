import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { QueryClientProvider, QueryClient } from "@tanstack/react-query";
import './index.css'
import App from './App.tsx'
import Login from './layouts/Auth/login.tsx'
import Register from './layouts/Auth/register.tsx'
import ForgotPassword from './components/auth/forgotPassword.tsx';

const queryClient = new QueryClient(); // contains cache tools

createRoot(document.getElementById('root')!).render(
  <BrowserRouter>
    <StrictMode>
      <QueryClientProvider client={queryClient}>
        <Routes>
            <Route path='/' element={<App />}/>
            <Route path='/login' element={<Login/>}/>
            <Route path='/register' element={<Register/>}/>
            <Route path='/forgotPassword' element={<ForgotPassword/>}/>
        </Routes>
      </QueryClientProvider>
    </StrictMode>
  </BrowserRouter>
)