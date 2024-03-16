import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import Login from './pages/Login';
import Register from './pages/Register';
import CreateArtwork from './pages/CreateArtwork';
import ManageArtwork from './pages/ManageArtwork';
import EditArtwork from './pages/EditArtwork';
import Gallery from './pages/Gallery';
import { Provider } from 'react-redux';
import store from './store/store';
import { AboutUs } from './pages/AboutUs';

import {
  createBrowserRouter,
  RouterProvider,
} from "react-router-dom";

const root = ReactDOM.createRoot(document.getElementById('root'));

const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
  },
  {
    path: "/login",
    element: <Login />
  },
  {
    path: "/register",
    element: <Register />
  },
  {
    path:"/AboutUs",
    element: <AboutUs />
  },
  {
    path: "/new-artwork",
    element: <CreateArtwork />
  },
  {
    path: "/manage-artwork",
    element: <ManageArtwork />
  },
  {
    path: "/edit-artwork",
    element: <EditArtwork />
  },
  {
    path:"/gallery",
    element: <Gallery/>
  }
]);

root.render(
  <React.StrictMode>
    <Provider store={store}>
      <RouterProvider router={router} />
    </Provider>
  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
