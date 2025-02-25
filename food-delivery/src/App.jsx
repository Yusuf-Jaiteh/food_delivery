import { useState } from 'react'
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import './App.css'
import Login from './components/Login'
import CreateUser from './components/models/CreateUser'
import UserList from './components/models/UserList'
import MenuList from './components/models/MenuList'
import MenuForm from './components/models/MenuForm'
import Navbar from './components/Navbar';
import HomePage from './components/HomePage';
import Orders from './components/Orders';
import OrderPage from './components/OrderPage';
import MenuListTable from './components/models/MenuListTable';
import LandingPage from './components/LandilngPage';
import { AuthProvider } from './components/AuthContext';
import Footer from './components/Footer';

function App() {
  
  return (
    <AuthProvider>
    <Router> 
      <Navbar />
      <Routes>
        <Route path="/" element={<LandingPage />} />
        <Route path="/login" element={<Login />} />
        <Route path="/add-user/:id?" element={<CreateUser />} />
        <Route path='/user-list' element={<UserList /> } />
        <Route path="/menu-list" element={<MenuList />} />
        <Route path="/menu-form/:id?" element={<MenuForm />} />
        <Route path="menu" element={ <MenuListTable />} />
        <Route path="/orders" element={<Orders />} />
        <Route path='/landing-page' element={<LandingPage />} />
      </Routes>
      <Footer />
    </Router>
    </AuthProvider>
  
  )
}

export default App