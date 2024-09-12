import { useDispatch, useSelector } from 'react-redux';
import { selectCart } from '../slices/cartSlice';
import CartItem from '../components/cartItem';
import { Link, useNavigate } from 'react-router-dom';
import Button from '../components/button';
import { ROUTES, CURRENCY } from '../utils/constants';
import Loading from '../components/loading';
import useProfile from '../hooks/useProfile';
import InputGroup from '../components/inputGroup';
import { FormEvent, useEffect, useState } from 'react';
import { ordersActions } from '../slices/orderSlice';
import { selectAccount } from '../slices/accountSlice';
import { validation } from '../utils/validation';
import ErrorMessage from '../components/errorMessage';

function Checkout() {
  const { user } = useProfile();
  const {
    data: cartData,
    total,
    isLoading: isCartLoading,
    isError: isCartError,
  } = useSelector(selectCart);
  const {
    data: accountData,
    isLoading: isAccountLoading,
    isError: isAccountError,
  } = useSelector(selectAccount);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [form, setForm] = useState({
    fullName: '',
    address: '',
    phone: '',
    email: '',
    paymentType: '',
  });

  const [formError, setFormError] = useState({
    fullName: false,
    address: false,
    phone: false,
    email: false,
    paymentType: false,
  });

  useEffect(() => {
    if (!isAccountLoading && !isAccountError) {
      setForm((prev) => ({
        ...prev,
        fullName: accountData.fullName,
        address: accountData.address,
        phone: accountData.phone,
        email: accountData.email,
      }));
    }
  }, [accountData, isAccountLoading, isAccountError, setForm]);

  function onSubmit(e: FormEvent) {
    e.preventDefault();

    const newFormError = {
      fullName: false,
      address: false,
      phone: false,
      email: false,
      paymentType: false,
    };

    const order = { user: user.id, cart: cartData.id, ...form, total };

    newFormError.fullName = validation.checkText(form.fullName);
    newFormError.email = validation.checkText(form.email);
    newFormError.phone = validation.checkText(form.phone);
    newFormError.address = validation.checkText(form.address);
    newFormError.paymentType = validation.checkText(form.paymentType);

    setFormError(newFormError);

    const hasErrors = validation.checkErrors(newFormError);

    if (!hasErrors) {
      dispatch(
        ordersActions.createOrder({
          data: order,
          cb: () => {
            navigate(ROUTES.ORDER_SUCCESS);
          },
        })
      );
    }
  }

  if (isCartLoading || isAccountLoading) {
    return <Loading />;
  }

  if (isCartError || isAccountError) {
    return <ErrorMessage />;
  }

  if (!cartData?.expand?.products.length) {
    return (
      <div className="p-5">
        <h1 className="text-4xl text-black mb-5">Checkout</h1>

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
      <h1 className="text-4xl text-black mb-5">Checkout</h1>

      <section className="flex flex-col gap-5 ">
        {cartData?.expand?.products.map((product) => (
          <CartItem
            key={product.id}
            product={product}
            userId={user.id}
            showActions={false}
          />
        ))}
      </section>

      <form onSubmit={onSubmit}>
        <h2 className="text-4xl text-black my-5">Order details</h2>

        <div className="flex flex-col gap-5">
          <InputGroup
            labelName="Full Name"
            type="text"
            value={form.fullName}
            isError={formError.fullName}
            onChange={(e) =>
              setForm((prev) => ({ ...prev, fullName: e.target.value }))
            }
          />

          <InputGroup
            labelName="Phone"
            type="tel"
            value={form.phone}
            isError={formError.phone}
            onChange={(e) =>
              setForm((prev) => ({ ...prev, phone: e.target.value }))
            }
          />

          <InputGroup
            labelName="Email"
            type="email"
            value={form.email}
            isError={formError.email}
            onChange={(e) =>
              setForm((prev) => ({ ...prev, email: e.target.value }))
            }
          />

          <InputGroup
            labelName="Address"
            value={form.address}
            isError={formError.address}
            onChange={(e) =>
              setForm((prev) => ({ ...prev, address: e.target.value }))
            }
            isTextArea
          />

          <h2 className="text-4xl text-black mb-5">Payment Type</h2>
          <InputGroup
            labelName="Pay on delivery"
            type="radio"
            value="on_delivery"
            isError={formError.paymentType}
            onChange={(e) => {
              setForm((prev) => ({ ...prev, paymentType: e.target.value }));
            }}
            checked={form.paymentType === 'on_delivery'}
          />
          <InputGroup
            labelName="Pay now"
            type="radio"
            value="online"
            isError={formError.paymentType}
            onChange={(e) => {
              setForm((prev) => ({ ...prev, paymentType: e.target.value }));
            }}
            checked={form.paymentType === 'online'}
          />

          <div className="flex justify-between">
            <p>
              Total: {total} {CURRENCY.SYMBOL}
            </p>

            <div className="flex gap-5">
              <Link to={ROUTES.CART}>
                <Button>Back to cart</Button>
              </Link>
              <Button type="submit">Submit order</Button>
            </div>
          </div>
        </div>
      </form>
    </div>
  );
}

export default Checkout;
