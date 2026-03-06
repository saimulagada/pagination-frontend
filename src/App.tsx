import { Routes,Route } from "react-router-dom";
import Login from './Login';
import PaginatedEmails from './PaginatedEmails';
import ProtectedRoute from './ProtectedRoute';
import Register from './Register';
import Success from "./Success";
import Cancel from "./Cancel";

const App = () => {
  return (
    <div>
        
    <Routes>
        <Route path="/login" element={<Login />}></Route>
        <Route path="/register" element={<Register />} />
        <Route path="/paginated-emails" element={<ProtectedRoute><PaginatedEmails /></ProtectedRoute>}></Route>
        <Route path="/success" element={<Success />} />
        <Route path="/cancel" element={<Cancel />} />
    </Routes>
    
    </div>
  )
}

export default App