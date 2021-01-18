import React, { useContext } from "react";
import { NavLink } from "react-router-dom";
import { routes } from "../../../routes/routes";
import ShopContext from "../../../context/Context";
import classes from "./Navbar.module.css";

const Navbar = () => {
  const value = useContext(ShopContext);
  const { cartCounter, handleCartOpen, isSideMenuOpen, handleSideMenu } = value;

  return (
    <div className={classes.navMainWrapper}>
      <nav className={classes.nav}>
        <ul className={classes.ul}>
          <li className={classes.li}>
            <NavLink to={routes.home} className={classes.navBar}>
              Home
            </NavLink>
          </li>
          <li className={classes.li}>
            <NavLink to={routes.about} className={classes.navBar}>
              About
            </NavLink>
          </li>
          <li className={classes.li}>
            <NavLink to={routes.products} className={classes.navBar}>
              Products
            </NavLink>
          </li>
          <li className={classes.li}>
            <NavLink to={routes.contact} className={classes.navBar}>
              Contact
            </NavLink>
          </li>
          <li className={classes.cartButton}>
            <button onClick={handleCartOpen} className={classes.cartIconBtn}>
              {cartCounter}
            </button>
          </li>
        </ul>
      </nav>
    </div>
  );
};

export default Navbar;
