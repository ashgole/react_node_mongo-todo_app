import React from "react";
import { Navbar } from "flowbite-react";
import { Link } from "react-router-dom";

const Header = () => {
  return (
    <Navbar fluid rounded>
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
        <Navbar.Link>
          <Link to={"home"}>Home</Link>
        </Navbar.Link>
        <Navbar.Link>
          <Link to={"profile"}>Profile</Link>
        </Navbar.Link>
        <Navbar.Link>
          <Link to={"contactus"}>Contact Us</Link>
        </Navbar.Link>
      </Navbar.Collapse>
    </Navbar>
  );
};

export default Header;
