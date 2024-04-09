import {
  Route,
  RouterProvider,
  createBrowserRouter,
  createRoutesFromElements,
} from "react-router-dom";
import { QueryClientProvider, QueryClient } from "react-query";
import { ReactQueryDevtools } from "react-query/devtools";
import Layout from "./components/layout/Layout";
import NotFound from "./components/notFound/NotFound";
import Profile from "./components/profile/Profile";
import Home from "./components/home/Home";
import ContactUs from "./components/contactus/ContactUs";
import "./App.css";
import Signin from "./components/authentication/signin/Signin";
import Signup from "./components/authentication/signup/Signup";
import useRefreshToken from "./utils/refreshToken/useRefreshToken";

export default function App() {
  const queryClient = new QueryClient();
  useRefreshToken();
  const router = createBrowserRouter(
    createRoutesFromElements(
      <Route path="/" element={<Layout />}>
        <Route path="/signin" element={<Signin />}></Route>
        <Route path="/signup" element={<Signup />}></Route>
        <Route path="/home" element={<Home />}></Route>
        <Route path="/profile" element={<Profile />}></Route>
        <Route path="/contactus" element={<ContactUs />}></Route>
        <Route path="/*" element={<NotFound />} />
      </Route>
    )
  );

  return (
    <>
      <QueryClientProvider client={queryClient}>
        <RouterProvider router={router} />
        {/* <ReactQueryDevtools /> */}
      </QueryClientProvider>
    </>
  );
}
