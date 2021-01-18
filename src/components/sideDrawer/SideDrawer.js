import React, { useState } from "react";
import clsx from "clsx";
import { makeStyles } from "@material-ui/core/styles";
import Drawer from "@material-ui/core/Drawer";
import List from "@material-ui/core/List";
import Divider from "@material-ui/core/Divider";
import ListItem from "@material-ui/core/ListItem";
import ListItemText from "@material-ui/core/ListItemText";
import HamburgerMenu from "react-hamburger-menu";
import styles from "../navigations/Navbar/Navbar.module.css";
import { routes } from "../../routes/routes";
import { NavLink } from "react-router-dom";

const useStyles = makeStyles({
  list: {
    width: 250
  },
  fullList: {
    width: "auto"
  },
  hamburgerButton: {
    position: "absolute !important",
    top: 25,
    left: 25
  },
  navLink: {
    textDecoration: "none",
    fontWeight: "100",
    fontSize: "x-large"
  }
});

const TemporaryDrawer = () => {
  const classes = useStyles();
  const [state, setState] = useState({
    left: false
  });
  const [isBurgerMenuOpen, setIsBurgerMenuOpen] = useState(false);

  const toggleDrawer = (anchor, open) => event => {
    if (
      event.type === "keydown" &&
      (event.key === "Tab" || event.key === "Shift")
    ) {
      return;
    }

    setState({ ...state, [anchor]: open });
  };

  const handleClick = () => {
    setIsBurgerMenuOpen(!isBurgerMenuOpen);
  };

  const list = anchor => (
    <div
      className={clsx(classes.list, {
        [classes.fullList]: anchor === "top" || anchor === "bottom"
      })}
      role="presentation"
      onClick={toggleDrawer(anchor, false)}
      onKeyDown={toggleDrawer(anchor, false)}
    >
      <Divider />

      <List>
        {[
          <NavLink to={routes.home} className={classes.navLink}>
            Home
          </NavLink>,
          <NavLink to={routes.about} className={classes.navLink}>
            About
          </NavLink>,
          <NavLink to={routes.products} className={classes.navLink}>
            Products
          </NavLink>,
          <NavLink to={routes.contact} className={classes.navLink}>
            Contact
          </NavLink>
        ].map((text, index) => (
          <ListItem button key={text}>
            <ListItemText primary={text} />
          </ListItem>
        ))}
      </List>
    </div>
  );

  return (
    <div>
      {["left"].map(anchor => (
        <React.Fragment key={anchor}>
          <HamburgerMenu
            isOpen={isBurgerMenuOpen}
            menuClicked={(() => handleClick(), toggleDrawer(anchor, true))}
            width={18}
            height={15}
            strokeWidth={1}
            rotate={0}
            color="black"
            borderRadius={0}
            animationDuration={0.5}
            style={{ position: "absolute" }}
            className={`${classes.hamburgerButton} ${styles.hamburgerIcon}`}
          />

          <Drawer
            anchor={anchor}
            open={state[anchor]}
            onClose={toggleDrawer(anchor, false)}
          >
            {list(anchor)}
          </Drawer>
        </React.Fragment>
      ))}
    </div>
  );
};

export default TemporaryDrawer;
