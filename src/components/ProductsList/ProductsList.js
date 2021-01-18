import React, { useContext } from "react";
import ShopContext from "../../context/Context";
import { makeStyles } from "@material-ui/core/styles";
import Card from "@material-ui/core/Card";
import CardActionArea from "@material-ui/core/CardActionArea";
import CardActions from "@material-ui/core/CardActions";
import CardContent from "@material-ui/core/CardContent";
import CardMedia from "@material-ui/core/CardMedia";
import Button from "@material-ui/core/Button";
import Typography from "@material-ui/core/Typography";
import AddShoppingCartRoundedIcon from "@material-ui/icons/AddShoppingCartRounded";
import classes from "./ProductsList.module.css";
import { NavLink } from "react-router-dom";

const useStyles = makeStyles({
  root: {
    maxWidth: 320,
    padding: "10px",
    position: "relative"
  },
  media: {
    height: 320
  },
  fontSizeLarge: {
    fontSize: "30px"
  }
});

const ProductsList = () => {
  const materialClasses = useStyles();

  const value = useContext(ShopContext);
  const { filteredProducts, addToCart, increaseCartCounter } = value;

  return (
    <div className={classes.mainWrapper}>
      <ul className={classes.productsWrapper}>
        {filteredProducts.map(oneProduct => {
          const {
            productName,
            productPrice,
            productImage,
            productId,
            productDesc,
            productMontage,
            addedToCart
          } = oneProduct;

          return (
            <li key={productName} className={classes.li}>
              <Card className={materialClasses.root}>
                <CardActionArea>
                  <CardContent className={classes.nameAndPrice}>
                    <Typography gutterBottom variant="h5" component="h2">
                      {productName}
                    </Typography>
                    <Typography
                      variant="body2"
                      color="textSecondary"
                      component="p"
                    >
                      <p>${productPrice}</p>
                    </Typography>
                  </CardContent>
                  <NavLink
                    to={{
                      pathname: `/products/${oneProduct.productName.replace(
                        /\s/g,
                        ""
                      )}`,
                      state: {
                        productName,
                        productPrice,
                        productImage,
                        productId,
                        productDesc,
                        productMontage,
                        addedToCart
                      }
                    }}
                    className={classes.navLink}
                  >
                    <CardMedia
                      className={materialClasses.media}
                      image={productImage}
                      title="Contemplative Reptile"
                    />
                  </NavLink>

                  <Typography
                    variant="body2"
                    color="textSecondary"
                    component="p"
                    className={classes.description}
                  >
                    {productDesc.slice(0, 145)}...
                  </Typography>
                </CardActionArea>
                <CardActions>
                  <Button
                    onClick={() => {
                      addToCart(productId);
                      increaseCartCounter();
                    }}
                    size="large"
                    color="primary"
                  >
                    Add to cart
                  </Button>
                </CardActions>
              </Card>
              {addedToCart ? (
                <div className={classes.addedToCartIcon}>
                  <AddShoppingCartRoundedIcon
                    className={materialClasses.fontSizeLarge}
                  />
                </div>
              ) : null}
            </li>
          );
        })}
      </ul>
    </div>
  );
};

export default ProductsList;
