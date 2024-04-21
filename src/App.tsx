import { useEffect, useState } from 'react';
import { Route, Routes, useLocation, useNavigate } from 'react-router-dom';

import Loader from './common/Loader';
import PageTitle from './components/PageTitle';
import SignIn from './pages/Authentication/SignIn';
import SignUp from './pages/Authentication/SignUp';
import Calendar from './pages/Calendar';
import Chart from './pages/Chart';
import ECommerce from './pages/Dashboard/ECommerce';
import FormElements from './pages/Form/FormElements';
import FormLayout from './pages/Form/FormLayout';
import Profile from './pages/Profile';
import Settings from './pages/Settings';
import Tables from './pages/Tables';
import Alerts from './pages/UiElements/Alerts';
import Buttons from './pages/UiElements/Buttons';
import ViewProduct from './pages/Product/ViewProduct';
import AddProduct from './pages/Product/AddProduct';
import UpdateProduct from './pages/Product/UpdateProduct';
import { AuthProvider } from './pages/Authentication/AuthContext'; 
import ProtectedRoute from './pages/Authentication/ProtectedRoute'; // Adjust the import path as necessary
import { useAuth } from './pages/Authentication/AuthContext'; // Adjust the import path as necessary

function App() {
  const [loading, setLoading] = useState<boolean>(true);
  const { pathname } = useLocation();
  const { isAuthenticated } = useAuth();
  const navigate = useNavigate();
  const [errorMessage, setErrorMessage] = useState('');
 
  useEffect(() => {
    // Retrieve the authentication status from local storage
    const isAuthenticated = localStorage.getItem('isAuthenticated');
    console.log(isAuthenticated);
    // Check if the status is true
    if (isAuthenticated === 'true') {
      navigate('/'); // Navigate to the home page
    } else {
      setErrorMessage('User is not authenticated');
    }
 }, [navigate]);
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);

  useEffect(() => {
    setTimeout(() => setLoading(false), 1000);
  }, []);

  return loading ? (
    <Loader />
  ) : (
    <>
          
    <AuthProvider>
    <Routes>
        <Route
          path="/"
          element={
            <ProtectedRoute>
              <PageTitle title="eCommerce Dashboard |  Admin Dashboard " />
              <ECommerce />
            </ProtectedRoute>
          }
        />
        <Route
          path="/calendar"
          element={
            <ProtectedRoute>
              <PageTitle title="Calendar" />
              <Calendar />
            </ProtectedRoute>
          }
        />
        <Route
          path="/products"
          element={
            <ProtectedRoute>
              <PageTitle title="ViewProduct " />
              <ViewProduct />
            </ProtectedRoute>
          }
        />
        <Route
          path="/addproducts"
          element={
            <ProtectedRoute>
              <PageTitle title="ViewProduct " />
              <AddProduct />
            </ProtectedRoute>
          }
        />

        <Route
          path="/updateproducts"
          element={
            <ProtectedRoute>
              <PageTitle title="ViewProduct " />
              <UpdateProduct />
            </ProtectedRoute>
          }
        />

        <Route
          path="/profile"
          element={
            <ProtectedRoute>
              <PageTitle title="Profile " />
              <Profile />
            </ProtectedRoute>
          }
        />
        <Route
          path="/forms/form-elements"
          element={
            <ProtectedRoute>
              <PageTitle title="Form Elements | TailAdmin - Tailwind CSS Admin Dashboard Template" />
              <FormElements />
            </ProtectedRoute>
          }
        />
        <Route
          path="/forms/form-layout"
          element={
            <ProtectedRoute>
              <PageTitle title="Form Layout | TailAdmin - Tailwind CSS Admin Dashboard Template" />
              <FormLayout />
            </ProtectedRoute>
          }
        />
        <Route
          path="/tables"
          element={
            <ProtectedRoute>
              <PageTitle title="Tables | TailAdmin - Tailwind CSS Admin Dashboard Template" />
              <Tables />
            </ProtectedRoute>
          }
        />
        <Route
          path="/settings"
          element={
            <ProtectedRoute>
              <PageTitle title="Settings | TailAdmin - Tailwind CSS Admin Dashboard Template" />
              <Settings />
            </ProtectedRoute>
          }
        />
        <Route
          path="/chart"
          element={
            <ProtectedRoute>
              <PageTitle title="Basic Chart | TailAdmin - Tailwind CSS Admin Dashboard Template" />
              <Chart />
            </ProtectedRoute>
          }
        />
        <Route
          path="/ui/alerts"
          element={
            <ProtectedRoute>
              <PageTitle title="Alerts | TailAdmin - Tailwind CSS Admin Dashboard Template" />
              <Alerts />
            </ProtectedRoute>
          }
        />
        <Route
          path="/ui/buttons"
          element={
            <ProtectedRoute>
              <PageTitle title="Buttons | TailAdmin - Tailwind CSS Admin Dashboard Template" />
              <Buttons />
            </ProtectedRoute>
          }
        />
        <Route
          path="/auth/signin"
          element={
            <>
              <PageTitle title="Signin | TailAdmin - Tailwind CSS Admin Dashboard Template" />
              <SignIn />
            </>
          }
        />
        <Route
          path="/auth/signup"
          element={
            <ProtectedRoute>
              <PageTitle title="Signup | TailAdmin - Tailwind CSS Admin Dashboard Template" />
              <SignUp />
            </ProtectedRoute>
          }
        />
      </Routes>
    </AuthProvider>

    </>
  );
}

export default App;
