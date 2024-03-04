import React from 'react';
import {
  createBrowserRouter,
  RouterProvider
} from 'react-router-dom';
import Layout from './layout/Layout';

import 'bootstrap/dist/css/bootstrap.min.css';
import Home from './pages/Home';

const App = () => {

  const router = createBrowserRouter(
    [
      {
        path: '/',
        element: <Layout />,
        errorElement: <div>Not Found</div>,
        children: [
          {
            path: '',
            element: <Home />
          },
          {
            path: 'about',
            element: <div>About</div>
          }
        ]
      }
    ]
  )

  return <RouterProvider router={router} />;

}
export default App;