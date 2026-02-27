import React from 'react'
import { BrowserRouter,Routes,Route } from "react-router-dom";
import Login from './Login';
import PaginatedEmails from './PaginatedEmails';
import ProtectedRoute from './ProtectedRoute';
import Register from './Register';

const App = () => {
  return (
    <div>
        
    <Routes>
        <Route path="/login" element={<Login />}></Route>
        <Route path="/register" element={<Register />} />
        <Route path="/paginated-emails" element={<ProtectedRoute><PaginatedEmails /></ProtectedRoute>}></Route>
    </Routes>
    
    </div>
  )
}

export default App