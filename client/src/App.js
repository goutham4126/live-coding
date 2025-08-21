import './App.css';
import { Routes, Route, Navigate } from 'react-router-dom';
import Home from "./pages/Home";
import Create from "./pages/Create";
import Navbar from './components/Navbar';
import Login from "./pages/Login";
import Register from "./pages/Register";
import ProductDetails from "./pages/ProductDetails";
import Footer from './components/Footer';

function PrivateRoute({ children }) {
  const isPresent = localStorage.getItem("token");
  return isPresent ? children : <Navigate to="/login" replace />;
}

function App() {
  return (
    <div>
      <Navbar />
      <Routes>
        <Route path="/"
          element={
            <PrivateRoute>
              <Home />
            </PrivateRoute>
          }
        />
        <Route path="/create"
          element={
            <PrivateRoute>
              <Create />
            </PrivateRoute>
          }
        />
        <Route path="/product/:id"
          element={
            <PrivateRoute>
              <ProductDetails />
            </PrivateRoute>
          }/>
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
      </Routes>
      <Footer />
    </div>
  );
}

export default App;