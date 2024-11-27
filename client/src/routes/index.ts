import DefaultLayout from '@/components/Layout/DefaultLayout';
import LoginLayout from '@/components/Layout/LoginLayout';
import LoginWithPolicyLayout from '@/components/Layout/LoginWithPolicyLayout';
import Home from '@site/home/Home.tsx';
import Following from '@site/following/Following.tsx';
import Friends from '@site/friends/Friends.tsx';
import Login from '@site/login/Login.tsx';
import LoginEmail from '@site/loginEmail/LoginEmail.tsx';
import Upload from '@site/upload/Upload.tsx';
import Livestream from '@site/live/Livestream.tsx';
import Profile from '@site/profile/Profile.tsx';
import Explore from '@/site/Explore';
import Search from '@site/search/Search.tsx';
import LiveSearch from '@site/search/components/LiveSearch.tsx';
import VideoSearch from '@site/search/components/VideoSearch.tsx';
import UserSearch from '@site/search/components/UserSearch.tsx';
import EmptyLayout from '@/components/Layout/EmptyLayout';
import Post from '@site/post/Post.tsx';
import TopSearch from '@site/search/components/TopSearch.tsx';
import NoSidebarLayout from '@/components/Layout/NoSidebarLayout';
import Message from '@site/message/Message.tsx';
import EditVideo from '@/site/EditVideo';
import Fabric from '@/site/Fabric';
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
    path: '/t',
    element: Fabric,
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
