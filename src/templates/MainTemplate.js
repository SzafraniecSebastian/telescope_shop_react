import React from "react";
import Navbar from "../components/navigations/Navbar/Navbar";
import Cart from "../components/Cart/Cart";
import SideDrawer from "../components/sideDrawer/SideDrawer";
import PaymentAlert from "../components/PaymentAlert/PaymentAlert";

const MainTemplate = ({ children }) => {
  return (
    <>
      <Navbar />
      <Cart />
      <PaymentAlert />
      {children}
      <SideDrawer />
    </>
  );
};

export default MainTemplate;
