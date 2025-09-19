  import React from 'react';
  import { ToastContainer } from 'react-toastify';
  import { BrowserRouter, Route, Routes, useLocation } from 'react-router-dom';

  import Home from './pages/Home';
  import Navbar from './Components/Navbar';
  import Login from './pages/Login';
  import SignUp from './pages/SignUp';
  import Unauthorized from './pages/Unauth';
  import AdminDashboard from './pages/AdminDashboard';
  import Profile from './pages/Profile';
  import ProtectedRoute from './utils/protectedRoute';
  import ShowProduct from './pages/Product/ShowProduct'
  import PrdouctById from './pages/Product/PrdouctById';
import Cart from './pages/Product/Cart';


  function Layout() {
    const location = useLocation();
    const hideNavbarOn = ["/login", "/signup"]; // hide navbar on login/signup

    return (
      <>
        {!hideNavbarOn.includes(location.pathname) && <Navbar />}
        <Routes>
      
          <Route path="/" element={<Home />} />
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<SignUp />} />
          <Route path='/unauth' element={<Unauthorized/>} />

          <Route path='/products' element={<ShowProduct/>} />
          <Route path='/products/:id' element={<PrdouctById/>} />

          <Route element={<ProtectedRoute authRoles={['admin']} />}> 
              <Route path='/AdminDashboard' element={<AdminDashboard/>} />
          </Route>

          <Route element={<ProtectedRoute authRoles={['user', 'admin']} />} >
            <Route path='/Profile' element={<Profile/>} />
            <Route path='/Cart' element={<Cart/>} />
          </Route>

        
        </Routes>
      </>
    );
  }

  export default function App() {
    return (
      <BrowserRouter>
        <Layout />
        <ToastContainer position="top-right" autoClose={3000} />
      </BrowserRouter>
    );
  }
