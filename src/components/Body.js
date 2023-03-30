import { Outlet } from 'react-router-dom';
import SideBar from './SideBar';

const Body = () => {
  return (
    <div className='flex bg-white dark:bg-zinc-800 transition-all duration-500 '>
      <SideBar />
      <Outlet />
    </div>
  );
};

export default Body;
