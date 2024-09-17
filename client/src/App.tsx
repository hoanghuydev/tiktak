import './App.css';
import Auth from './site/Login';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { RouteType, privateRoutes, publicRoutes } from './routes';
import DefaultLayout from './components/Layout/DefaultLayout';
import Page404 from './site/Page404';
import { useDispatch, useSelector } from 'react-redux';
import { currentUserSelector } from './redux/selector';
import { useEffect } from 'react';
import { AppDispatch } from './redux/store';
import UserService, { UserPayload } from './features/user/userService';
import { setCurrentUser } from './features/auth/authSlice';
import { UserModel } from './models/user';
import { axiosNoToken, axiosToken } from './axios';
import { jwtDecode } from 'jwt-decode';
import { ConfigProvider } from 'antd';
function App() {
  const token = localStorage.getItem('accessToken') || '';
  const dispatch = useDispatch<AppDispatch>();
  const user = useSelector(currentUserSelector);
  useEffect(() => {
    const setMyInfo = async () => {
      const resp: UserPayload = await UserService.me();
      dispatch(setCurrentUser(resp.user));
    };
    if (token && !user) {
      setMyInfo();
    }
  }, []);
  const RouteRender = (route: RouteType, index: number) => {
    const Layout = route.layout || DefaultLayout;
    const Page = route.element;
    const ChildrenNode = route.children ?? [];
    return (
      <Route
        key={index}
        path={route.path}
        element={
          <Layout fullScreen={route.fullScreen}>
            <Page />
          </Layout>
        }
      >
        {ChildrenNode.map((routeObject, index: number) =>
          RouteRender(routeObject, index)
        )}
      </Route>
    );
  };
  return (
    <ConfigProvider
      theme={{
        components: {
          Tabs: {
            cardGutter: 100,
            itemActiveColor: 'black',
            inkBarColor: 'black',
            itemColor: '#73747b',
            itemHoverColor: 'black',
            itemSelectedColor: 'black',
          },
        },
      }}
    >
      <div className="">
        <Router>
          <Routes>
            {publicRoutes.map((route: RouteType, index: number) =>
              RouteRender(route, index)
            )}
            {user &&
              privateRoutes.map((route: RouteType, index: number) =>
                RouteRender(route, index)
              )}
            <Route path="*" element={<Page404 />}></Route>
          </Routes>
        </Router>
        <ToastContainer
          position="top-right"
          autoClose={5000}
          hideProgressBar={false}
          newestOnTop={false}
          closeOnClick
          rtl={false}
          pauseOnFocusLoss
          draggable
          pauseOnHover
          theme="light"
        />
        <ToastContainer />
      </div>
    </ConfigProvider>
  );
}
export default App;
