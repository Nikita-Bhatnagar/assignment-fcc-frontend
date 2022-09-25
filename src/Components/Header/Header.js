import Navbar from "react-bootstrap/Navbar";
import logo from "./../../assets/FreeCodeCamp_logo.svg";
import avatar from "./../../assets/defaultavatar.webp";
import classes from "./Header.module.css";
import { AiOutlineSearch, AiOutlineMenu } from "react-icons/ai";
import { Link, useLocation } from "react-router-dom";
import { useSelector } from "react-redux";

const Header = () => {
  const location = useLocation();
  const isLoggedIn = useSelector((state) => state.auth.isLoggedIn);
  console.log(location);
  return (
    <Navbar
      variant="light"
      bg="dark"
      expand="md"
      className="d-flex justify-content-between ps-sm-3 pe-3 pt-0 pb-0"
      style={{
        textAlign: location.pathname === "/signup" ? "center" : "left ",
      }}
    >
      {location.pathname !== "/signup" && (
        <form className={`me-5 ${classes.form}`}>
          <div className={classes.searchbar}>
            <button type="submit" className={classes.searchBtn}>
              <AiOutlineSearch />
            </button>
            <input
              type="search"
              placeholder="Search 8000+ tutorials"
              name="query"
              className={classes.input}
            />
          </div>
        </form>
      )}
      <Navbar.Brand
        className={classes.brand}
        style={{ flexBasis: location.pathname === "/signup" ? "100%" : "40%" }}
      >
        <img src={logo} alt="freecodecamp" className={classes.logo} />
      </Navbar.Brand>

      <div>
        {location.pathname !== "/signup" && (
          <button type="button" className={classes.btn1}>
            {window.screen.width >= "600" ? "Menu" : <AiOutlineMenu />}
          </button>
        )}
        {location.pathname === "/" && (
          <Link to="/signup">
            <button type="button" className={classes.btn2}>
              Sign In
            </button>
          </Link>
        )}
        {isLoggedIn && <img src={avatar} className={classes.avatar} alt="" />}
      </div>
    </Navbar>
  );
};
export default Header;
