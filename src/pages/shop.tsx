import { FormEvent, useEffect, useState } from 'react';
import { productsApi, ProductType } from '../api/products';
import Loading from '../components/loading';
import Product from '../components/product';
import Button from '../components/button';
import { useDispatch, useSelector } from 'react-redux';
import { productsActions, selectProducts } from '../slices/productsSlice';

function Shop() {
  const { data, isLoading, isError } = useSelector(selectProducts);

  const dispatch = useDispatch();

  const [filters, setFilters] = useState({
    name: '',
    sortBy: '-created',
  });

  useEffect(() => {
    dispatch(productsActions.getProducts(filters));
  }, [dispatch]);

  async function handleSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();

    dispatch(productsActions.getProducts(filters));
  }

  if (isLoading) {
    return <Loading />;
  }

  if (isError) {
    return <p>An error occurred</p>;
  }

  return (
    <div className="w-full h-full flex overflow-hidden">
      <div className="w-1/4 h-full border-r border-black p-5 overflow-auto">
        <h2 className="text-2xl mb-5">Shop Filters</h2>
        <form onSubmit={handleSubmit} className="flex flex-col gap-5">
          <div>
            <label className="text-sm">Search product</label>
            <input
              type="text"
              value={filters.name}
              onChange={(e) =>
                setFilters((prev) => ({ ...prev, name: e.target.value }))
              }
              className="text-sm box-border appearance-none w-full py-2 px-3 text-gray-700 leading-tight border border-black focus:outline-none focus:border-blue-700"
            />
          </div>
          <div>
            <label className="text-sm">Sort by</label>
            <select
              value={filters.sortBy}
              onLoad={(e) => {
                console.log(e.target.value);
              }}
              onChange={(e) =>
                setFilters((prev) => ({ ...prev, sortBy: e.target.value }))
              }
              className="text-sm box-border appearance-none w-full py-2 px-3 text-gray-700 leading-tight border border-black focus:outline-none focus:border-blue-700"
            >
              <option value="-created">Newest</option>
              <option value="created">Oldest</option>
              <option value="price">Price ascending</option>
              <option value="-price">Price descending</option>
            </select>
          </div>
          <Button type="submit">Apply</Button>
        </form>
      </div>

      <div className="w-full min-h-fit grid grid-cols-4 gap-4 overflow-auto p-5">
        {data.map((product) => (
          <div key={product.id} className="w-full ">
            <Product data={product} />
          </div>
        ))}
      </div>
    </div>
  );
}

export default Shop;
