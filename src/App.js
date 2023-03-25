import { Provider } from 'react-redux';
import { createBrowserRouter, Outlet} from 'react-router-dom';
import './App.css';
import Body from './components/Body';
import Header from './components/Header';
import MainContainer from './components/MainContainer';
import Search from './components/Search';
import WatchPage from './components/WatchPage';
import store from './utils/store';

/* 
  Header
    Sidebar
      MenuItem
  Body
    MainContainer
    Tag
    VideoContainer
      VideoCard


*/
export const appRouter = createBrowserRouter([
  {
    path: '/',
    element: <App />,
    errorElement:<div>notfound</div>,
    children: [
      {
        path: '/',
        element: <Body />,
        children: [
          {
            path: '/',
            element: <MainContainer />,
          },
          {
            path: 'results',
            element: <Search />,
          },
        ],
      },
      {
        path: 'watch',
        element: <WatchPage />,
      },
    ],
  },
]);

function App() {
  return (
    <Provider store={store}>
      <div className='font-Roboto'>
        <Header />
        <Outlet />
      </div>
    </Provider>
  );
}

export default App;
