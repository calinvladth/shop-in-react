import { Outlet } from 'react-router-dom';
import Navigation from '../components/navigation';

function Layout() {
  return (
    <div className="w-full h-screen border border-black flex flex-col">
      <div className="w-full border-b border-black">
        <Navigation />
      </div>

      <div className="overflow-auto h-full">
        <Outlet />
      </div>
    </div>
  );
}

export default Layout;
