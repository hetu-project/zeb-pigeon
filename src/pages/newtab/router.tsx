import { createHashRouter } from 'react-router-dom';
import Home from './components/Home';
import Chat from './components/Chat';
import Welcome from './components/Welcome';

const router = createHashRouter([
  {
    path: '/',
    element: <Home />,
    children: [
      {
        path: '',
        element: <Welcome />,
      },
      {
        path: 'chat',
        element: <Chat />,
      },
    ],
  },
]);

export default router;
