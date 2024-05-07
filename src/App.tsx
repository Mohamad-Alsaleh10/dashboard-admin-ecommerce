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
import CategoryAdd from './pages/Category/CategoryAdd';
import CategoryShowing from './pages/Category/CategoryShowing';
import CategoryUpdate from './pages/Category/CategoryUpdate';
import ViewColors from './pages/color/ViewColors';
import AddColor from './pages/color/AddColor';
import ViewBrands from './pages/brand/ViewBrands';
import AddBrand from './pages/brand/AddBrand';
import ViewStorage from './pages/storage/ViewStorage';
import AddStorage from './pages/storage/AddStorage';
import Customer from './pages/Customer/Customer';
import Recharge from './pages/Recharge/Recharge';
import Order from './pages/Order/Order';
import Payments from './pages/payment/Payments';
import AddPayment from './pages/payment/AddPayment';
import UpdatePayment from './pages/payment/UpdatePayment';
import Communication from './pages/communication/Communication';
import AddApp from './pages/communication/AddApp';
import AddLink from './pages/communication/AddLink';
import AllLinks from './pages/communication/AllLinks';
import UpdateLink from './pages/communication/UpdateLink';
import Notification from './pages/Notifications/Notification';

function App() {
  const [loading, setLoading] = useState<boolean>(true);
  const { pathname } = useLocation();
  const { isAuthenticated } = useAuth();
  const navigate = useNavigate();
  const [errorMessage, setErrorMessage] = useState('');


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
            path="/updateProduct"
            element={
              <ProtectedRoute>
                <PageTitle title="updateProduct " />
                <UpdateProduct />
              </ProtectedRoute>
            }
          />
          <Route
            path="/category"
            element={
              <ProtectedRoute>
                <PageTitle title="ViewCategory " />
                <CategoryShowing />
              </ProtectedRoute>
            }
          />
          <Route
            path="/addcategory"
            element={
              <ProtectedRoute>
                <PageTitle title="AddCategory " />
                <CategoryAdd />
              </ProtectedRoute>
            }
          />
          <Route
            path="/updatecategory/:categoryId"
            element={
              <ProtectedRoute>
                <PageTitle title="update Category " />
                <CategoryUpdate />
              </ProtectedRoute>
            }
          />
          <Route
            path="/updateproducts/:itemId"
            element={
              <ProtectedRoute>
                <PageTitle title="ViewProduct " />
                <UpdateProduct />
              </ProtectedRoute>
            }
          />
          <Route
            path="/colors"
            element={
              <ProtectedRoute>
                <PageTitle title="colors " />
                <ViewColors />
              </ProtectedRoute>
            }
          />
          <Route
            path="/addcolors"
            element={
              <ProtectedRoute>
                <PageTitle title="colors " />
                <AddColor />
              </ProtectedRoute>
            }
          />
          <Route
            path="/brands"
            element={
              <ProtectedRoute>
                <PageTitle title="brands " />
                <ViewBrands />
              </ProtectedRoute>
            }
          />
          <Route
            path="/addbrands"
            element={
              <ProtectedRoute>
                <PageTitle title="addbrands " />
                <AddBrand />
              </ProtectedRoute>
            }
          />
          <Route
            path="/storages"
            element={
              <ProtectedRoute>
                <PageTitle title="storages " />
                <ViewStorage />
              </ProtectedRoute>
            }
          />
          <Route
            path="/addstorages"
            element={
              <ProtectedRoute>
                <PageTitle title="addstorages " />
                <AddStorage />
              </ProtectedRoute>
            }
          />
          <Route
            path="/customers"
            element={
              <ProtectedRoute>
                <PageTitle title="customers " />
                <Customer />
              </ProtectedRoute>
            }
          />


          <Route
            path="/charge/:customerId"
            element={
              <ProtectedRoute>
                <PageTitle title="charge " />
                <Recharge />
              </ProtectedRoute>
            }
          />

          <Route
            path="/orders"
            element={
              <ProtectedRoute>
                <PageTitle title="orders" />
                <Order />
              </ProtectedRoute>
            }
          />

          <Route
            path="/payments"
            element={
              <ProtectedRoute>
                <PageTitle title="payments " />
                <Payments />
              </ProtectedRoute>
            }
          />
          <Route
            path="/addpayments"
            element={
              <ProtectedRoute>
                <PageTitle title="addpayments " />
                <AddPayment />
              </ProtectedRoute>
            }
          />
          <Route
            path="/updatepayment/:methodId"
            element={
              <ProtectedRoute>
                <PageTitle title="update payment " />
                <UpdatePayment />
              </ProtectedRoute>
            }
          />
          <Route
            path="/communication"
            element={
              <ProtectedRoute>
                <PageTitle title="communication " />
                <Communication />
              </ProtectedRoute>
            }
          />
          <Route
            path="/links"
            element={
              <ProtectedRoute>
                <PageTitle title="links " />
                <AllLinks />
              </ProtectedRoute>
            }
          />
          <Route
            path="/addapp"
            element={
              <ProtectedRoute>
                <PageTitle title="addapp " />
                <AddApp />
              </ProtectedRoute>
            }
          />
          <Route
            path="/addlink"
            element={
              <ProtectedRoute>
                <PageTitle title="addlink " />
                <AddLink />
              </ProtectedRoute>
            }
          />
          <Route
            path="/updatelink/:linkId"
            element={
              <ProtectedRoute>
                <PageTitle title="update link " />
                <UpdateLink />
              </ProtectedRoute>
            }
          />
          <Route
            path="/notification"
            element={
              <ProtectedRoute>
                <PageTitle title="notification " />
                <Notification />
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
