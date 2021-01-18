import React, { useContext } from "react";
import TextField from "@material-ui/core/TextField";
import ShopContext from "../../../context/Context";
import classes from "./FilterByName.module.css";

const FilterByName = () => {
  const value = useContext(ShopContext);
  return (
    <div className={classes.filterByName}>
      <TextField
        name="userInputName"
        id="outlined-basic"
        label="Filter by name"
        variant="outlined"
        onChange={value.inputNameChange}
      />
    </div>
  );
};

export default FilterByName;
