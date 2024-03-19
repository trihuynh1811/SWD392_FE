import {
    createBrowserRouter,
} from "react-router-dom";
import App from '../App';
import Login from '../pages/Login';
import Register from '../pages/Register';
import CreateArtwork from '../pages/CreateArtwork';
import ManageArtwork from '../pages/ManageArtwork';
import EditArtwork from '../pages/EditArtwork';
import Gallery from '../pages/Gallery';
import ArtworkDetail from "../pages/ArtworkDetail";
import Profile from "../pages/Profile";
import { Pricing } from '../pages/Pricing';
import { AboutUs } from "../pages/AboutUs";
import { SubscriptionCheckout } from "../pages/SubscriptionCheckout";

export const router = createBrowserRouter([
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
        path: "/gallery",
        element: <Gallery />
    },
    {
        path: "/artwork-detail",
        element: <ArtworkDetail />
    },
    {
        path: "/pricing",
        element: <Pricing />
    },
    {
        path: "/about-us",
        element: <AboutUs />
    },
    {
        path: "/checkout",
        element: <SubscriptionCheckout></SubscriptionCheckout>
    },
    {
        path: "/profile",
        element: <Profile />
    }
]);