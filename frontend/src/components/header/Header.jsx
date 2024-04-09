import React from "react";
import { Navbar } from "flowbite-react";
import { Link } from "react-router-dom";
import { useSelector } from "react-redux";
import { postSignout } from "../../utils/api";
import { SIGNOUT } from "../../utils/constants";
import { removeToken } from "../../utils/token";
import { useNavigate } from "react-router-dom";

const Header = () => {
  const userDetails = useSelector((state) => state.signinSlice);
  const navigate = useNavigate();
  const signoutHandler = async () => {
    let response = await postSignout(SIGNOUT);
    if (response.statusCode === 200) {
      removeToken("accessToken");
      removeToken("refreshToken");
    }
    navigate("./signin");
  };
  return (
    <Navbar
      className="bg-gray-800 sticky top-0 text-white bg-opacity-90"
      fluid
    >
      <Navbar.Brand href="https://ashabb.netlify.app/">
        <img
          src="/logo.jpg"
          className="mr-3 h-6 sm:h-9"
          alt="Flowbite React Logo"
        />
        <span className="self-center whitespace-nowrap text-xl font-semibold">
          TODO App
        </span>
      </Navbar.Brand>
      <Navbar.Toggle />
      <Navbar.Collapse>
        <Navbar className="bg-opacity-0 bg-gray-800">
          <Link to={"home"}>Home</Link>
        </Navbar>
        <Navbar className="bg-opacity-0 bg-gray-800">
          <Link to={"profile"}>Profile</Link>
        </Navbar>
        <Navbar className="bg-opacity-0 bg-gray-800">
          <Link to={"contactus"}>Contact Us</Link>
        </Navbar>
        {!userDetails.isAuthenticated ? (
          <>
            <Navbar className="bg-opacity-0 bg-gray-800">
              <Link to={"signin"}>Signin</Link>
            </Navbar>
            <Navbar className="bg-opacity-0 bg-gray-800">
              <Link to={"signup"}>Signup</Link>
            </Navbar>
          </>
        ) : (
          <>
            <Navbar
              className="bg-opacity-0 bg-gray-800"
              onClick={signoutHandler}
            >
              <Link to={"logout"}>Logout</Link>
            </Navbar>
          </>
        )}
      </Navbar.Collapse>
    </Navbar>
  );
};

export default Header;
