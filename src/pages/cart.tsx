import useProfile from '../hooks/useProfile';
import Loading from '../components/loading';
import Button from '../components/button';
import { CURRENCY, ROUTES } from '../utils/constants';
import { Link } from 'react-router-dom';
import { useSelector } from 'react-redux';
import CartItem from '../components/cartItem';
import { selectCart } from '../slices/cartSlice';
import ErrorMessage from '../components/errorMessage';

function Cart() {
  const { user } = useProfile();
  const { data, total, isLoading, isError } = useSelector(selectCart);

  if (isLoading) {
    return <Loading />;
  }

  if (isError) {
    return <ErrorMessage />;
  }

  if (!data?.expand?.products.length) {
    return (
      <div className="p-5">
        <h1 className="text-4xl text-black mb-5">Cart</h1>

        <div className="flex items-center gap-3">
          <p>Cart is empty</p>
          <Link to={ROUTES.SHOP}>
            <Button>Go back</Button>
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="p-5">
      <h1 className="text-4xl text-black mb-5">Cart</h1>

      <section className="flex flex-col gap-5 ">
        {data?.expand?.products.map((product) => (
          <CartItem key={product.id} product={product} userId={user.id} />
        ))}

        <div className="flex justify-between">
          <p>
            Total: {total} {CURRENCY.SYMBOL}
          </p>

          <Link to={ROUTES.CHECKOUT}>
            <Button>Checkout</Button>
          </Link>
        </div>
      </section>
    </div>
  );
}

export default Cart;
