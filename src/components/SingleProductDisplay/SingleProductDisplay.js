import React, { useContext } from "react";
import Button from "@material-ui/core/Button";
import ShopContext from "../../context/Context";
import classes from "./SingleProductDisplay.module.css";
import { NavLink } from "react-router-dom";
import { routes } from "../../routes/routes";
import KeyboardBackspaceIcon from "@material-ui/icons/KeyboardBackspace";
import AddShoppingCartRoundedIcon from "@material-ui/icons/AddShoppingCartRounded";
import { makeStyles } from "@material-ui/core/styles";

const useStyles = makeStyles({
  fontSizeLarge: {
    fontSize: "30px"
  }
});

const SingleProductDisplay = props => {
  const materialClasses = useStyles();
  const value = useContext(ShopContext);
  const { addToCart, increaseCartCounter, products } = value;
  console.log(props);

  const {
    productName,
    productPrice,
    productImage,
    productId,
    productDesc,
    productMontage
  } = props.location.state;

  let showAddedIcon = false;
  products.map(oneProduct => {
    if (oneProduct.productId === productId && oneProduct.addedToCart === true) {
      showAddedIcon = true;
    }
    return;
  });

  return (
    <div className={classes.singleProductMainWrapper}>
      <div className={classes.singleProductWrapper}>
        <div className={classes.wrapper}>
          <p className={classes.productName}>{productName}</p>
          <img src={productImage} alt={productName} className={classes.img} />
          <p className={classes.productPrice}>${productPrice}</p>
          <p className={classes.productDesc}>{productDesc}</p>
          <p>
            <strong className={classes.montageType}>Montage type:</strong>{" "}
            {productMontage}
          </p>
          <Button
            onClick={() => {
              addToCart(productId);
              increaseCartCounter();
            }}
            size="large"
            color="primary"
            className={classes.addButton}
          >
            Add to cart
          </Button>
          <NavLink to={routes.products}>
            <KeyboardBackspaceIcon className={classes.backIcon} />
          </NavLink>

          {showAddedIcon ? (
            <div className={classes.addedToCartIcon}>
              <AddShoppingCartRoundedIcon
                className={materialClasses.fontSizeLarge}
              />
            </div>
          ) : null}
        </div>
      </div>
    </div>
  );
};

export default SingleProductDisplay;
