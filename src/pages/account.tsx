import { FormEvent, useEffect, useState } from 'react';
import Button from '../components/button';
import InputGroup from '../components/inputGroup';
import { useDispatch, useSelector } from 'react-redux';
import { accountActions, selectAccount } from '../slices/accountSlice';
import useProfile from '../hooks/useProfile';
import { ChevronDownIcon, ChevronUpIcon } from '@heroicons/react/24/outline';
import { validation } from '../utils/validation';
import { ordersActions, selectOrders } from '../slices/orderSlice';
import Loading from '../components/loading';
import formatDate from '../utils/formatDate';
import pb from '../utils/pb';
import { useNavigate } from 'react-router-dom';
import { ROUTES } from '../utils/constants';

function Account() {
  const { user } = useProfile();
  const {
    data: accountData,
    isLoading: isAccountLoading,
    isError: isAccountError,
  } = useSelector(selectAccount);
  const {
    data: ordersData,
    isLoading: isOrdersLoading,
    isError: isOrdersError,
  } = useSelector(selectOrders);
  const [isFormExpanded, setIsFormExpanded] = useState(true);
  const [isOrdersExpanded, setIsOrdersExpanded] = useState(true);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [form, setForm] = useState({
    fullName: '',
    address: '',
    phone: '',
    email: '',
  });

  const [formError, setFormError] = useState({
    fullName: false,
    address: false,
    phone: false,
    email: false,
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

  useEffect(() => {
    dispatch(ordersActions.getOrders(user.id));
  }, [dispatch]);

  function onSubmit(e: FormEvent) {
    e.preventDefault();
    const newFormError = {
      fullName: false,
      address: false,
      phone: false,
      email: false,
      paymentType: false,
    };

    newFormError.fullName = validation.checkText(form.fullName);
    newFormError.email = validation.checkText(form.email);
    newFormError.phone = validation.checkText(form.phone);
    newFormError.address = validation.checkText(form.address);

    setFormError(newFormError);

    const hasErrors = validation.checkErrors(newFormError);

    if (!hasErrors) {
      dispatch(
        accountActions.updateProfile({
          userId: user.id,
          profileId: accountData.id,
          data: form,
        })
      );
    }
  }

  if (isAccountLoading && isOrdersLoading) {
    return <Loading />;
  }

  if (isAccountError && isOrdersError) {
    return <p>An error occurred</p>;
  }

  return (
    <div className="p-5">
      <h1 className="text-4xl text-black mb-5">Account</h1>

      <div className="flex items-center gap-5">
        <h2 className="text-2xl text-black my-5">Address</h2>
        {isFormExpanded ? (
          <ChevronUpIcon
            className="size-7 mt-1 cursor-pointer"
            onClick={() => setIsFormExpanded(!isFormExpanded)}
          />
        ) : (
          <ChevronDownIcon
            className="size-7 mt-1 cursor-pointer"
            onClick={() => setIsFormExpanded(!isFormExpanded)}
          />
        )}
      </div>

      {isFormExpanded && (
        <form onSubmit={onSubmit}>
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
          </div>
          <div className="flex justify-end mt-5">
            <Button>Save address</Button>
          </div>
        </form>
      )}

      <div className="flex items-center gap-5">
        <h2 className="text-2xl text-black my-5">Orders</h2>
        {isOrdersExpanded ? (
          <ChevronUpIcon
            className="size-7 mt-1 cursor-pointer"
            onClick={() => setIsOrdersExpanded(!isOrdersExpanded)}
          />
        ) : (
          <ChevronDownIcon
            className="size-7 mt-1 cursor-pointer"
            onClick={() => setIsOrdersExpanded(!isOrdersExpanded)}
          />
        )}
      </div>

      {isOrdersExpanded && (
        <div className="flex flex-col gap-5">
          {ordersData.map((order) => (
            <div
              key={order.id}
              className="flex justify-between items-center p-5 border border-black cursor-pointer"
              onClick={() => {
                alert('This can go to order detail page');
              }}
            >
              <p>Order ID: {order.id}</p>
              <p>Order Date: {formatDate(order.created)}</p>
            </div>
          ))}
        </div>
      )}

      <div className="mt-5">
        <Button
          onClick={() => {
            pb.authStore.clear();
            navigate(ROUTES.SHOP);
          }}
        >
          <p className="text-red-500">Logout</p>
        </Button>
      </div>
    </div>
  );
}

export default Account;
