import React from 'react';
import {
  createBrowserRouter,
  RouterProvider
} from 'react-router-dom';
import Layout from './layout/Layout';

import Home from './pages/Home';

import 'bootstrap/dist/css/bootstrap.min.css';
// import rsuitejs DatePicker component styles 
import 'rsuite/DatePicker/styles/index.css';

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