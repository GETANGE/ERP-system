import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { QueryClientProvider, QueryClient } from "@tanstack/react-query";
import './index.css'
import App from './App.tsx'
import Login from './layouts/Auth/login.tsx'
import Register from './layouts/Auth/register.tsx'
import ForgotPassword from './components/auth/forgotPassword.tsx';
import Sidebar from './components/dashboard/sideBarWrapper.tsx';
import { InputOTPForm } from './components/auth/otp-form.tsx';
import CustomerDashboard from './layouts/Dashboard/customerDashboard/mainDashboard.tsx';

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
            <Route path='/otp' element={<InputOTPForm/>}/>
            <Route path='/sidebar' element={<Sidebar children={undefined}/>}/>

            {/* 👇 Nested Route inside Sidebar */}
            <Route path='/dashboard' element={<Sidebar children={undefined} />}>
              <Route index element={<CustomerDashboard />} />
            </Route>
        </Routes>
      </QueryClientProvider>
    </StrictMode>
  </BrowserRouter>
)