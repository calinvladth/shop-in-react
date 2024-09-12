import { Link } from 'react-router-dom';
import replaceKeysInUrl from '../utils/replaceKeysInUrl';
import { API_FILES, CURRENCY, ROUTES } from '../utils/constants';
import { useEffect, useState } from 'react';
import { ProductType } from '../api/products';

function Product({ data }: { data: ProductType }) {
  return (
    <Link to={replaceKeysInUrl(ROUTES.PRODUCT, { id: data.id })}>
      <div className="border border-black">
        <div
          style={{
            backgroundImage: `url(${replaceKeysInUrl(API_FILES, { collectionId: data.collectionId, itemId: data.id, fileName: data.photos[0] })})`,
          }}
          className="w-full aspect-square  bg-center bg-no-repeat bg-cover"
        />
        <div className="w-full border-t border-black p-5">
          <p className="truncate">{data.name}</p>
          <p>
            {data.price} {CURRENCY.SYMBOL}
          </p>
        </div>
      </div>
    </Link>
  );
}

export default Product;
