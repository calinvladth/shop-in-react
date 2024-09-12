import { useNavigate, useParams } from 'react-router-dom';
import Button from '../components/button';
import { FormEvent, useEffect, useState } from 'react';
import { productsApi, ProductType } from '../api/products';
import Loading from '../components/loading';
import { ALERT_TYPE, API_FILES, CURRENCY, ROUTES } from '../utils/constants';
import replaceKeysInUrl from '../utils/replaceKeysInUrl';
import { HeartIcon } from '@heroicons/react/24/outline';
import useProfile from '../hooks/useProfile';
import { cartApi } from '../api/cart';
import { useDispatch, useSelector } from 'react-redux';
import { productActions, selectProduct } from '../slices/productSlice';
import { cartActions, selectCart } from '../slices/cartSlice';
import { alertActions } from '../slices/alertSlice';
import ErrorMessage from '../components/errorMessage';

function Product() {
  const { id = '' } = useParams();
  const { user, isAuthenticated } = useProfile();
  const { data, isLoading, isError } = useSelector(selectProduct);
  const { data: cartData } = useSelector(selectCart);
  const [activeImage, setActiveImage] = useState('');
  const dispatch = useDispatch();
  const navigate = useNavigate();

  useEffect(() => {
    dispatch(productActions.getProduct(id));
  }, [dispatch]);

  useEffect(() => {
    setActiveImage(data?.photos[0]);
  }, [data]);

  function onSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    if (!isAuthenticated) {
      if (confirm('You need to login before adding products to cart')) {
        navigate(ROUTES.LOGIN);
        return;
      }
      return;
    }

    dispatch(
      cartActions.addProductToCart({ userId: user?.id, productId: data.id })
    );
  }

  if (isLoading) {
    return <Loading />;
  }

  if (isError) {
    return <ErrorMessage />;
  }

  return (
    <div className="w-full h-full flex">
      <div
        className="w-1/2 h-full border-r border-black bg-center bg-no-repeat bg-cover relative"
        style={{
          backgroundImage: `url(${replaceKeysInUrl(API_FILES, { collectionId: data?.collectionId as string, itemId: data?.id as string, fileName: activeImage })})`,
        }}
      >
        <div className="absolute w-full bottom-0 flex justify-center gap-3 p-5">
          {data?.photos.map((photo) => (
            <div
              key={photo}
              onClick={() => setActiveImage(photo)}
              className={`w-12 aspect-square  ${activeImage === photo ? 'border-2' : 'border'} border-black bg-center bg-no-repeat bg-cover cursor-pointer`}
              style={{
                backgroundImage: `url(${replaceKeysInUrl(API_FILES, { collectionId: data?.collectionId as string, itemId: data?.id as string, fileName: photo })})`,
              }}
            />
          ))}
        </div>
      </div>

      <form
        onSubmit={onSubmit}
        className="w-1/2 flex flex-col justify-center gap-5 p-10"
      >
        <h1 className="text-3xl">{data?.name}</h1>
        <p className="text-base">{data?.description}</p>

        <div className="flex items-center gap-3">
          <p>
            {data?.price} {CURRENCY.SYMBOL}
          </p>
        </div>

        <div className="flex items-center gap-3">
          {cartData?.expand?.products.filter(
            (product) => product.id === data.id
          ).length === 1 ? (
            <Button
              type="button"
              onClick={() => {
                if (confirm(`Are you sure you want to remove ${data.name}?`)) {
                  dispatch(
                    cartActions.removeProductFromCart({
                      productId: data.id,
                      userId: user.id,
                    })
                  );
                }
              }}
            >
              Remove from cart
            </Button>
          ) : (
            <Button type="submit">Add to cart</Button>
          )}

          <Button
            type="button"
            className="border-none"
            onClick={() => {
              dispatch(
                alertActions.handleMessage({
                  type: ALERT_TYPE.WARNING,
                  message: 'Wishlist not implemented',
                })
              );
            }}
          >
            <HeartIcon className="size-7" />
          </Button>
        </div>
      </form>
    </div>
  );
}

export default Product;
