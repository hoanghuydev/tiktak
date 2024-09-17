import DefaultLayout from '@/components/Layout/DefaultLayout';
import LoginLayout from '@/components/Layout/LoginLayout';
import LoginWithPolicyLayout from '@/components/Layout/LoginWithPolicyLayout';
import Home from '@/site/Home';
import Following from '@/site/Following';
import Friends from '@/site/Friends';
import Login from '@/site/Login';
import LoginEmail from '@/site/LoginEmail';
import Upload from '@/site/Upload';
import Livestream from '@/site/Livestream';
import Profile from '@/site/Profile';
export interface RouteType {
  path: string;
  element: React.ComponentType;
  layout?: React.ComponentType<{ children: React.ReactNode }>;
  fullScreen?: boolean;
  children?: RouteType[];
}

export const publicRoutes: RouteType[] = [
  {
    path: '/',
    element: Home,
    layout: DefaultLayout,
    fullScreen: true,
  },

  {
    path: '/login',
    element: Login,
    layout: LoginWithPolicyLayout,
    fullScreen: true,
  },
  {
    path: '/login-email',
    element: LoginEmail,
    layout: LoginLayout,
    fullScreen: true,
  },
  {
    path: '/live',
    element: Livestream,
    layout: DefaultLayout,
    fullScreen: true,
  },
  {
    path: '/:usernamehaveCuff',
    element: Profile,
    layout: DefaultLayout,
    fullScreen: true,
  },
];

export const privateRoutes: RouteType[] = [
  {
    path: '/following',
    element: Following,
    layout: DefaultLayout,
    fullScreen: true,
  },
  {
    path: '/friends',
    element: Friends,
    layout: DefaultLayout,
    fullScreen: true,
  },

  {
    path: '/upload',
    element: Upload,
    layout: DefaultLayout,
    fullScreen: true,
  },
];
