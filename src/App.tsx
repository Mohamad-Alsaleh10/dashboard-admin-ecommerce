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
import Settings from './pages/Setting/Settings';
import AddSettings from './pages/Setting/AddSettings';
import ChangeCurrency from './pages/Setting/ChangeCurrency';
import Admins from './pages/Admins/Admins';
import { useLanguage } from './MultiLanguge/LanguageProvider ';
import ShowPermission from './pages/Admins/ShowPermission';
import AddAdmin from './pages/Admins/AddAdmin';
import ShowAdminPerm from './pages/Admins/ShowAdminPerm';
import UpdateAdminPerm from './pages/Admins/UpdateAdminPerm';
import UpdateSetting from './pages/Setting/UpdateSetting';
import CardCategory from './pages/CardCategories/CardCategory';
import AddCardCategory from './pages/CardCategories/AddCardCategory';
import ShowCardCategory from './pages/CardCategories/ShowCardCategory';
import UpdateCardCategory from './pages/CardCategories/UpdateCardCategory';
import Card from './pages/Card/Card';
import AddCard from './pages/Card/AddCard';
import ProductDetails from './pages/Product/ProductDetails';
import CategoryDetails from './pages/Category/CategoryDetails';
import OrderDetails from './pages/Order/OrderDetails';
import Offer from './pages/offer/Offer';
import AddOffer from './pages/offer/AddOffer';
import ShowOneCard from './pages/Card/ShowOneCard';
import UpdateCard from './pages/Card/UpdateCard';
import CardOrder from './pages/CardOrder/CardOrder';

function App() {
  const [loading, setLoading] = useState<boolean>(true);
  const { pathname } = useLocation();
  const { isAuthenticated } = useAuth();
  const navigate = useNavigate();
  const [errorMessage, setErrorMessage] = useState('');

  const { language } = useLanguage();
  useEffect(() => {
    // Determine the direction based on the language
    const direction = language === 'ar' ? 'rtl' : 'ltr';
    // Update the body's dir attribute
    document.body.dir = direction;
  }, [language]);
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
            path="/cardcategory"
            element={
              <ProtectedRoute>
                <PageTitle title="cardcategory " />
                <CardCategory />
              </ProtectedRoute>
            }
          />
          <Route
            path="/addcardcategory"
            element={
              <ProtectedRoute>
                <PageTitle title="addcardcategory " />
                <AddCardCategory />
              </ProtectedRoute>
            }
          />
          <Route
            path="/showcardcategory/:cardCategoryId"
            element={
              <ProtectedRoute>
                <PageTitle title="showcardcategory " />
                <ShowCardCategory />
              </ProtectedRoute>
            }
          />
          <Route
            path="/showcard/:cardId"
            element={
              <ProtectedRoute>
                <PageTitle title="showcard " />
                <ShowOneCard />
              </ProtectedRoute>
            }
          />
          <Route
            path="/updatecardcategory/:cardCategoryId"
            element={
              <ProtectedRoute>
                <PageTitle title="updatecardcategory " />
                <UpdateCardCategory />
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
                <PageTitle title="UpdateProduct " />
                <UpdateProduct />
              </ProtectedRoute>
            }
          />
          <Route
            path="/addcardproducts"
            element={
              <ProtectedRoute>
                <PageTitle title="UpdateProduct " />
                <UpdateProduct />
              </ProtectedRoute>
            }
          />
          <Route
            path="/updatecard/:cardId"
            element={
              <ProtectedRoute>
                <PageTitle title="updatecard " />
                <UpdateCard />
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
            path="/cardorder"
            element={
              <ProtectedRoute>
                <PageTitle title="cardorder " />
                <CardOrder />
              </ProtectedRoute>
            }
          />
          <Route
            path="/offers"
            element={
              <ProtectedRoute>
                <PageTitle title="Offer" />
                <Offer />
              </ProtectedRoute>
            }
          />
          <Route
            path="/addoffers"
            element={
              <ProtectedRoute>
                <PageTitle title="add Offer" />
                <AddOffer />
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
            path="/viewproduct/:itemId"
            element={
              <ProtectedRoute>
                <PageTitle title="viewproduct " />
                <ProductDetails />
              </ProtectedRoute>
            }
          />
          <Route
            path="/showcategory/:categoryId"
            element={
              <ProtectedRoute>
                <PageTitle title="showcategory" />
                <CategoryDetails />
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
            path="/settings"
            element={
              <ProtectedRoute>
                <PageTitle title="settings " />
                <Settings />
              </ProtectedRoute>
            }
          />
          <Route
            path="/addsettings"
            element={
              <ProtectedRoute>
                <PageTitle title="addsettings " />
                <AddSettings />
              </ProtectedRoute>
            }
          />
          <Route
            path="/changecurrency"
            element={
              <ProtectedRoute>
                <PageTitle title="ChangeCurrency " />
                <ChangeCurrency />
              </ProtectedRoute>
            }
          />
          <Route
            path="/admins"
            element={
              <ProtectedRoute>
                <PageTitle title="Admins " />
                <Admins />
              </ProtectedRoute>
            }
          />
          <Route
            path="/showpermission"
            element={
              <ProtectedRoute>
                <PageTitle title="showpermission " />
                <ShowPermission />
              </ProtectedRoute>
            }
          />
          <Route
            path="/addadmin"
            element={
              <ProtectedRoute>
                <PageTitle title="addadmin " />
                <AddAdmin />
              </ProtectedRoute>
            }
          />
          <Route
            path="/showadminpermission/:adminId"
            element={
              <ProtectedRoute>
                <PageTitle title="showadminpermission " />
                <ShowAdminPerm />
              </ProtectedRoute>
            }
          />
          <Route
            path="/showorder/:orderId"
            element={
              <ProtectedRoute>
                <PageTitle title="showorder" />
                <OrderDetails />
              </ProtectedRoute>
            }
          />
          <Route
            path="/editadminpermission/:adminId"
            element={
              <ProtectedRoute>
                <PageTitle title="editadminpermission " />
                <UpdateAdminPerm />
              </ProtectedRoute>
            }
          />
          <Route
            path="/updatesetting/:settingId"
            element={
              <ProtectedRoute>
                <PageTitle title="updatesetting " />
                <UpdateSetting />
              </ProtectedRoute>
            }
          />
          <Route
            path="/cards"
            element={
              <ProtectedRoute>
                <PageTitle title="card " />
                <Card />
              </ProtectedRoute>
            }
          />
          <Route
            path="/addcards"
            element={
              <ProtectedRoute>
                <PageTitle title="addcard " />
                <AddCard />
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
