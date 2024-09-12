import { Link } from 'react-router-dom';
import { ROUTES } from '../utils/constants';
import {
  BuildingStorefrontIcon,
  HeartIcon,
  UserCircleIcon,
  ShoppingCartIcon,
  ChatBubbleOvalLeftEllipsisIcon,
} from '@heroicons/react/24/outline';
import useProfile from '../hooks/useProfile';
import { useSelector } from 'react-redux';
import { selectCart } from '../slices/cartSlice';

function Navigation() {
  const { isAuthenticated, user } = useProfile();
  const {
    data: cartData,
    isLoading: isCartLoading,
    isError: isCartError,
  } = useSelector(selectCart);

  return (
    <nav className="p-5">
      <ul className="flex justify-end items-center gap-3">
        <li title="Shop">
          <Link to={ROUTES.SHOP}>
            <BuildingStorefrontIcon className="size-7" />
          </Link>
        </li>
        <li title="Cart" className="relative">
          <Link to={ROUTES.CART}>
            <ShoppingCartIcon className="size-7" />
            {!isCartLoading &&
              !isCartError &&
              cartData?.expand?.products.length > 0 && (
                <span className="absolute -top-3 -right-2 bg-red-500 w-5 h-5 rounded-full flex items-center justify-center text-xs text-white">
                  {cartData?.expand?.products.length}
                </span>
              )}
          </Link>
        </li>

        <li title="Account">
          {isAuthenticated ? (
            <Link to={ROUTES.ACCOUNT}>
              <div
                title="Account"
                className="border rounded-full border-black w-8 h-8 flex items-center justify-center"
              >
                <p className="text-xs uppercase">
                  {Array.from(user.username)[0]}
                  {Array.from(user.username)[1]}
                </p>
              </div>
            </Link>
          ) : (
            <Link to={ROUTES.LOGIN}>
              <UserCircleIcon className="size-7" />
            </Link>
          )}
        </li>
      </ul>
    </nav>
  );
}

export default Navigation;
