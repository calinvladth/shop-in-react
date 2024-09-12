import { Link } from 'react-router-dom';
import { ROUTES } from '../utils/constants';
import Button from '../components/button';

function NoMatch() {
  return (
    <div className="w-full h-full flex items-center justify-center flex-col">
      <h1 className="text-4xl text-black mb-5">Page not found</h1>
      <Link to={ROUTES.SHOP}>
        <Button>Go to shop</Button>
      </Link>
    </div>
  );
}

export default NoMatch;
