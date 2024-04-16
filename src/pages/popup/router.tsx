import { createHashRouter } from 'react-router-dom';
import Guide from './components/Guide';
import Home from './components/Home';
import Welcome from './components/Welcome';
import Message from './components/Message';
import Contact from './components/Contact';
import Dapps from './components/Dapps';
import Account from './components/Account';
import AccountSide from './components/Account/Side/AccountSide';
import NetworkSide from './components/Account/Side/NetworkSide';
import AddNetworkForm from './components/Setting/Network/AddNetworkForm';
import AddContactForm from './components/Contact/AddContactForm';
import AddDappForm from './components/Dapps/AddDappForm';

const router = createHashRouter([
  {
    path: '/',
    element: <Welcome />,
  },
  {
    path: '/home',
    element: <Home />,
    children: [
      {
        path: 'message',
        element: <Message />,
      },
      {
        path: 'contact',
        element: <Contact />,
      },
      {
        path: 'dapps',
        element: <Dapps />,
      },
      {
        path: 'account',
        element: <Account />,
      },
    ],
  },
  {
    path: '/side',
    children: [
      {
        path: 'account',
        element: <AccountSide />,
      },
      {
        path: 'network',
        element: <NetworkSide />,
      },
    ],
  },
  {
    path: '/setting',
    children: [
      {
        path: 'network',
        children: [
          {
            path: 'add',
            element: <AddNetworkForm />,
          },
          {
            path: 'edit',
            children: [
              {
                path: ':name',
                element: <AddNetworkForm />,
              },
            ],
          },
        ],
      },
    ],
  },
  {
    path: '/contact',
    children: [
      {
        path: 'add',
        element: <AddContactForm />,
      },
    ],
  },
  {
    path: '/dapps',
    children: [
      {
        path: 'add',
        element: <AddDappForm />,
      },
    ],
  },
  {
    path: '/guide',
    element: <Guide />,
  },
]);

export default router;
