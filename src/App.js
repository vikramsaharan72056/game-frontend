import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Login from './pages/Login';
import Register from './pages/Register';
import AdminLogin from './pages/AdminLogin';
import AdminDashboard from './components/Admin/AdminDashboard';
import Layout from './pages/Layout';
import Homepage from './pages/Homepage';
import Users from './components/Admin/Users';
import { UserPrivateRoute, AdminPrivateRoute } from './PrivateRoute';

function App() {
  return (
    <Router>
      <Layout>
        <Routes>
          {/* Public Routes */}
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/admin-login" element={<AdminLogin />} />
          <Route path="*" element={<Homepage />} />
          

          {/* Protected User Routes */}
          <Route
            path="/"
            element={
              <UserPrivateRoute>
                <Homepage />
              </UserPrivateRoute>
            }
          />

          {/* Protected Admin Routes */}
          <Route
            path="/admin"
            element={
              <AdminPrivateRoute>
                <AdminDashboard />
              </AdminPrivateRoute>
            }
          />
          <Route
            path="/admin/users"
            element={
              <AdminPrivateRoute>
                <Users />
              </AdminPrivateRoute>
            }
          />
        </Routes>
      </Layout>
    </Router>
  );
}

export default App;
