import React, { useContext } from "react";
import { makeStyles } from "@material-ui/core/styles";
import Modal from "@material-ui/core/Modal";
import Backdrop from "@material-ui/core/Backdrop";
import Fade from "@material-ui/core/Fade";
import ShopContext from "../../context/Context";
import classes from "./Cart.module.css";

import IconButton from "@material-ui/core/IconButton";
import DeleteIcon from "@material-ui/icons/Delete";

import PayPalBtn from "../PayPalBtn/PayPalBtn";

const useStyles = makeStyles(theme => ({
  modal: {
    display: "flex",
    alignItems: "center",
    justifyContent: "center"
  },
  paper: {
    backgroundColor: theme.palette.background.paper,
    border: "2px solid #000",
    boxShadow: theme.shadows[5],
    padding: theme.spacing(2, 4, 3),

    outline: "none",
    borderRadius: "20px",
    height: "80vh",
    overflow: "overlay"
  },
  root: {
    marginLeft: "10px",
    padding: "10px"
  }
}));

const Cart = () => {
  const materialClasses = useStyles();

  const value = useContext(ShopContext);
  const {
    isCartOpen,
    handleCartClose,
    cart,
    deleteFromCart,
    increseProductQuantity,
    decreseProductQuantity,
    cartTotal,
    increaseCartCounter,
    decreaseCartCounter
  } = value;

  return (
    <Modal
      aria-labelledby="transition-modal-title"
      aria-describedby="transition-modal-description"
      className={materialClasses.modal}
      open={isCartOpen}
      onClose={handleCartClose}
      closeAfterTransition
      BackdropComponent={Backdrop}
      BackdropProps={{
        timeout: 500
      }}
    >
      <Fade in={isCartOpen}>
        <div className={classes.cartWrapper}>
          <div className={materialClasses.paper}>
            <h2 id="transition-modal-title">Your cart</h2>
            <ul className={classes.ul}>
              {cart.map(oneProduct => {
                const {
                  productName,
                  productQuantity,
                  productPrice,
                  productImage,
                  productId
                } = oneProduct;
                return (
                  <li key={productId} className={classes.li}>
                    <div className={classes.leftContent}>
                      <img
                        src={productImage}
                        alt={productName}
                        style={{ height: "100px", width: "100px" }}
                      />
                      <p>{productName}</p>
                    </div>

                    <div className={classes.rightContent}>
                      <button
                        className={classes.addRemoveQuantity}
                        onClick={() => {
                          decreseProductQuantity(productId);
                          decreaseCartCounter();
                        }}
                        disabled={productQuantity === 1 ? true : false}
                      >
                        -
                      </button>
                      <p className={classes.productQuantity}>
                        {productQuantity}
                      </p>

                      <button
                        className={classes.addRemoveQuantity}
                        onClick={() => {
                          increseProductQuantity(productId);
                          increaseCartCounter();
                        }}
                      >
                        +
                      </button>
                      <p className={classes.price}>{productPrice}</p>

                      <div className={classes.root}>
                        <IconButton
                          onClick={() =>
                            deleteFromCart(productId, productQuantity)
                          }
                          aria-label="delete"
                        >
                          <DeleteIcon />
                        </IconButton>
                      </div>
                    </div>
                  </li>
                );
              })}
            </ul>
            <div className={classes.cartTotal}>
              {cartTotal === 0 ? (
                <p className={classes.yourCartIsEmpty}>Your cart is empty</p>
              ) : (
                <p className={classes.total}>Total: {cartTotal}</p>
              )}
            </div>
            <div className={classes.paypalButton}>
              {cartTotal !== 0 ? <PayPalBtn /> : null}
            </div>
          </div>
        </div>
      </Fade>
    </Modal>
  );
};

export default Cart;
