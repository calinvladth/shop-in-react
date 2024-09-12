import { Link } from 'react-router-dom';
import { ROUTES } from '../utils/constants';
import Button from '../components/button';

function OrderSuccess() {
  return (
    <div className="w-full h-full flex items-center justify-center flex-col">
      <h1 className="text-4xl text-black mb-5">
        Order was placed successfully!
      </h1>
      <Link to={ROUTES.SHOP}>
        <Button>Go to shop</Button>
      </Link>
    </div>
  );
}

export default OrderSuccess;
