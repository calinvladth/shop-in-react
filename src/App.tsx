import { Routes, Route } from 'react-router-dom';
import Layout from './pages/layout';
import NoMatch from './pages/noMatch';
import Shop from './pages/shop';
import Checkout from './pages/checkout';
import Product from './pages/product';
import Cart from './pages/cart';
import { ROUTES } from './utils/constants';
import Login from './pages/login';
import Register from './pages/register';
import { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { cartActions } from './slices/cartSlice';
import useProfile from './hooks/useProfile';
import OrderSuccess from './pages/orderSuccess';
import Account from './pages/account';
import { accountActions } from './slices/accountSlice';

function App() {
  // TODO: Handle restricted routes
  const { user, isAuthenticated } = useProfile();

  const dispatch = useDispatch();

  useEffect(() => {
    if (isAuthenticated) {
      dispatch(accountActions.getProfile(user.id));
      dispatch(cartActions.getCart(user.id));
    }
  }, [isAuthenticated, dispatch]);
  return (
    <>
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route path={ROUTES.SHOP} element={<Shop />} />
          <Route path={ROUTES.PRODUCT} element={<Product />} />
          <Route path={ROUTES.CART} element={<Cart />} />
          <Route path={ROUTES.CHECKOUT} element={<Checkout />} />
          <Route path={ROUTES.ORDER_SUCCESS} element={<OrderSuccess />} />

          <Route path={ROUTES.ACCOUNT} element={<Account />} />

          <Route path={ROUTES.LOGIN} element={<Login />} />
          <Route path={ROUTES.REGISTER} element={<Register />} />

          <Route path="*" element={<NoMatch />} />
        </Route>
      </Routes>
    </>
  );
}

export default App;
