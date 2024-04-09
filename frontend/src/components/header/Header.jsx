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
    <Navbar className="sticky top-0" fluid rounded>
      <Navbar.Brand href="https://ashabb.netlify.app/">
        <img
          src="/logo.jpg"
          className="mr-3 h-6 sm:h-9"
          alt="Flowbite React Logo"
        />
        <span className="self-center whitespace-nowrap text-xl font-semibold dark:text-white">
          TODO App
        </span>
      </Navbar.Brand>
      <Navbar.Toggle />
      <Navbar.Collapse>
        <Navbar>
          <Link to={"home"}>Home</Link>
        </Navbar>
        <Navbar>
          <Link to={"profile"}>Profile</Link>
        </Navbar>
        <Navbar>
          <Link to={"contactus"}>Contact Us</Link>
        </Navbar>
        {!userDetails.isAuthenticated ? (
          <>
            <Navbar>
              <Link to={"signin"}>Signin</Link>
            </Navbar>
            <Navbar>
              <Link to={"signup"}>Signup</Link>
            </Navbar>
          </>
        ) : (
          <>
            <Navbar onClick={signoutHandler}>
              <Link to={"logout"}>Logout</Link>
            </Navbar>
          </>
        )}
      </Navbar.Collapse>
    </Navbar>
  );
};

export default Header;
