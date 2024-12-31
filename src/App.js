import "./App.css";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
  useLocation,
} from "react-router-dom";
import NavBar from "./components/NavBar/NavBar";
import Login from "./components/Login/Login";
import Signup from "./components/Signup/Signup";
import Products from "./components/Products/Products";
import ProductDetails from "./components/ProductDetails/ProductDetails";
import AddressDetails from "./components/AddressDetails/AddressDetails";
import OrderConfirmed from "./components/OrderConfirmed/OrderConfirmed";
import { useDispatch, useSelector } from "react-redux";
import { logout } from "./features/authSlice";
import { ToastContainer } from "react-toastify";
import AddProducts from "./components/AddProducts/AddProducts";
import EditProduct from "./components/EditProduct/EditProduct";

function App() {
  const { user, isAdmin } = useSelector((state) => state.auth);
  const dispatch = useDispatch();
  // const handleLogin = (loggedInUser) => {
  //   setUser(loggedInUser);
  //   setIsAdmin(loggedInUser?.roles?.includes("ADMIN"));
  // };
  const handleLogout = () => {
    dispatch(logout());
  };
  return (
    <div className="App">
      <ToastContainer />
      <Router>
        <NavBar user={user} isAdmin={isAdmin} onLogout={handleLogout} />
        <Routes>
          <Route path="/" element={<Login />} />
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<Signup />} />
          <Route
            path="/products"
            element={<Products user={user} isAdmin={isAdmin} />}
          />
          <Route
            path="/products/:id"
            element={<ProductDetails user={user} />}
          />
          <Route
            path="/address"
            element={
              user ? <AddressDetails user={user} /> : <Navigate to="/login" />
            }
          />
          <Route
            path="/order-confirmation"
            element={
              user ? <OrderConfirmed user={user} /> : <Navigate to="/login" />
            }
          />
          <Route
            path="/add-products"
            element={
              isAdmin ? (
                <AddProducts user={user} />
              ) : (
                <Navigate to="/login" replace />
              )
            }
          />{" "}
          <Route
            path="/products/edit/:id"
            //element={<EditProductWrapper user={user}/>}
            element={
              isAdmin ? (
                <EditProductWrapper user={user} />
              ) : (
                <Navigate to="/login" replace />
              )
            }
          />
        </Routes>
      </Router>
    </div>
  );
}
// Wrapper to handle location
function EditProductWrapper({ user }) {
  const location = useLocation();
  const product = location.state;

  return (
    <EditProduct
      product={product}
      user={user}
      onEditSuccess={() => console.log("Product Updated")}
    />
  );
}
export default App;
