import { EyeIcon, TrashIcon } from '@heroicons/react/24/outline';
import { Link } from 'react-router-dom';
import { cartActions } from '../slices/cartSlice';
import { API_FILES, CURRENCY, ROUTES } from '../utils/constants';
import replaceKeysInUrl from '../utils/replaceKeysInUrl';
import { ProductType } from '../api/products';
import { useDispatch } from 'react-redux';

function CartItem({
  userId,
  product,
  showActions = true,
}: {
  userId: string;
  product: ProductType;
  showActions?: boolean;
}) {
  const dispatch = useDispatch();

  return (
    <div
      key={product.id}
      className="w-full h-32 border border-black flex items-center justify-between gap-5 pr-5"
    >
      <div className="h-full flex items-center gap-5">
        <div
          className="flex-1 h-full aspect-square border-r border-black  bg-center bg-no-repeat bg-cover"
          style={{
            backgroundImage: `url(${replaceKeysInUrl(API_FILES, { collectionId: product.collectionId, itemId: product.id, fileName: product.photos[0] })})`,
          }}
        />
        <h3 className="text-xl">{product.name}</h3>
      </div>

      <div className="flex items-center gap-3">
        <p>
          {product.price} {CURRENCY.SYMBOL}
        </p>
        {showActions && (
          <>
            <Link to={replaceKeysInUrl(ROUTES.PRODUCT, { id: product.id })}>
              <EyeIcon className="size-7" />
            </Link>
            <TrashIcon
              onClick={() => {
                if (
                  confirm(`Are you sure you want to remove ${product.name}?`)
                ) {
                  dispatch(
                    cartActions.removeProductFromCart({
                      productId: product.id,
                      userId: userId,
                    })
                  );
                }
              }}
              className="size-7 text-red-500 cursor-pointer"
            />
          </>
        )}
      </div>
    </div>
  );
}

export default CartItem;
