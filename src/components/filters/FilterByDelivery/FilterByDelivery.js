import React, { useContext } from "react";
import ShopContext from "../../../context/Context";
import classes from "./FilterByDelivery.module.css";

const FilterByDelivery = () => {
  const value = useContext(ShopContext);
  return (
    <div className={classes.wrapper}>
      <label htmlFor="freeDelivery" className={classes.label}>
        Free delivery
      </label>
      <input
        onChange={value.freeDeliveryHandler}
        type="checkbox"
        id="freeDelivery"
        name="freeDelivery"
      />
    </div>
  );
};

export default FilterByDelivery;
