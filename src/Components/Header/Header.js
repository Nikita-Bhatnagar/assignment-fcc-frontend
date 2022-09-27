import Navbar from "react-bootstrap/Navbar";
import logo from "./../../assets/FreeCodeCamp_logo.svg";
import classes from "./Header.module.css";
import { AiOutlineSearch, AiOutlineMenu } from "react-icons/ai";
import { CgLogOff } from "react-icons/cg";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import authActions from "./../../Reducers/authReducer";

const Header = () => {
  const location = useLocation();
  const isLoggedIn = useSelector((state) => state.auth.isLoggedIn);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const logoutHandler = (e) => {
    dispatch(authActions.logout());
    navigate("/", { replace: true });
  };

  return (
    <Navbar
      variant="light"
      bg="dark"
      expand="md"
      className="d-flex justify-content-between ps-sm-3 pe-3 pt-0 pb-0"
      style={{
        textAlign:
          location.pathname === "/signup" || location.pathname === "/signin"
            ? "center"
            : "left ",
      }}
    >
      {location.pathname !== "/signup" && location.pathname !== "/signin" && (
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
        style={{
          flexBasis:
            location.pathname === "/signup" || location.pathname === "/signin"
              ? "100%"
              : "40%",
        }}
      >
        <img src={logo} alt="freecodecamp" className={classes.logo} />
      </Navbar.Brand>

      <div>
        {location.pathname !== "/signup" && location.pathname !== "/signin" && (
          <button type="button" className={classes.btn1}>
            {window.screen.width >= "600" ? "Menu" : <AiOutlineMenu />}
          </button>
        )}
        {location.pathname === "/" && (
          <Link to="/signin">
            <button type="button" className={classes.btn2}>
              Sign In
            </button>
          </Link>
        )}

        {isLoggedIn && (
          <CgLogOff className={classes.logout} onClick={logoutHandler} />
        )}
      </div>
    </Navbar>
  );
};
export default Header;
