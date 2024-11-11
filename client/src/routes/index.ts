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
import Explore from '@/site/Explore';
import Search from '@/site/Search';
import LiveSearch from '@/site/LiveSearch';
import VideoSearch from '@/site/VideoSearch';
import UserSearch from '@/site/UserSearch';
import EmptyLayout from '@/components/Layout/EmptyLayout';
import Post from '@/site/Post';
import TopSearch from '@/site/TopSearch';
import NoSidebarLayout from '@/components/Layout/NoSidebarLayout';
import Message from '@/site/Message';
import EditVideo from '@/site/EditVideo';
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
    path: '/explore',
    element: Explore,
    layout: DefaultLayout,
    fullScreen: true,
  },
  {
    path: '/live',
    element: Livestream,
    layout: DefaultLayout,
    fullScreen: true,
  },
  {
    path: '/search',
    element: Search,
    layout: DefaultLayout,
    fullScreen: true,
  },
  {
    path: '/profile/:usernamehaveCuff',
    element: Profile,
    layout: DefaultLayout,
    fullScreen: true,
  },
  {
    path: '/post/:postId',
    element: Post,
    layout: EmptyLayout,
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
    path: '/messages',
    element: Message,
    layout: NoSidebarLayout,
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
  {
    path: '/video/edit',
    element: EditVideo,
    layout: NoSidebarLayout,
    fullScreen: true,
  },
];
