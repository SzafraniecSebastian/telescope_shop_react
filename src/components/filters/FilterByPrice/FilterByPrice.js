import React, { useContext } from "react";
import { makeStyles } from "@material-ui/core/styles";
import Typography from "@material-ui/core/Typography";
import Slider from "@material-ui/core/Slider";
import ShopContext from "../../../context/Context";

const useStyles = makeStyles({
  root: {
    width: 300,
    marginRight: "30px"
  }
});

function valuetext(value) {
  return `${value}`;
}

const FilterByPrice = () => {
  const value = useContext(ShopContext);
  const { handlePriceChange, price, priceRange } = value;
  const classes = useStyles();

  return (
    <div className={classes.root}>
      {priceRange.length !== 0 ? (
        <>
          <Typography id="range-slider" gutterBottom>
            Price range
          </Typography>
          <Slider
            value={price}
            onChange={handlePriceChange}
            valueLabelDisplay="auto"
            aria-labelledby="range-slider"
            getAriaValueText={valuetext}
            max={priceRange[1]}
            min={priceRange[0]}
          />{" "}
        </>
      ) : null}
    </div>
  );
};

export default FilterByPrice;
