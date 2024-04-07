import {
  Route,
  RouterProvider,
  createBrowserRouter,
  createRoutesFromElements,
} from "react-router-dom";
import Layout from "./components/layout/Layout";
import NotFound from "./components/notFound/NotFound";
import Demo from "./components/Demo";
import Profile from "./components/profile/Profile";
import Home from "./components/home/Home";
import ContactUs from "./components/contactus/ContactUs";

export default function App() {
  const router = createBrowserRouter(
    createRoutesFromElements(
      <Route path="/" element={<Layout />}>
        <Route path="/home" element={<Home/>}></Route>
        <Route path="/profile" element={<Profile />}></Route>
        <Route path="/contactus" element={<ContactUs />}></Route>
        <Route path="/*" element={<NotFound />} />
      </Route>
    )
  );

  return (
    <>
      <RouterProvider router={router} />
    </>
  );
}
