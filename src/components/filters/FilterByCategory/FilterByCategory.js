import React, { useContext } from "react";
import { makeStyles } from "@material-ui/core/styles";
import InputLabel from "@material-ui/core/InputLabel";
import MenuItem from "@material-ui/core/MenuItem";
import FormControl from "@material-ui/core/FormControl";
import Select from "@material-ui/core/Select";
import ShopContext from "../../../context/Context";

const useStyles = makeStyles(theme => ({
  formControl: {
    margin: "0 30px 10px 0px",
    minWidth: 120
  },
  selectEmpty: {
    marginTop: theme.spacing(2)
  }
}));

const FilterByCategory = () => {
  const value = useContext(ShopContext);
  const { products, handleMontageChange, montage, productId } = value;
  const categoryTabMaped = [
    "all",
    ...new Set(
      products.map(oneProduct => {
        return oneProduct.productMontage;
      })
    )
  ];

  const classes = useStyles();

  return (
    <FormControl variant="outlined" className={classes.formControl}>
      <InputLabel id="demo-simple-select-outlined-label">Montage</InputLabel>
      <Select
        labelId="demo-simple-select-outlined-label"
        id="demo-simple-select-outlined"
        value={montage}
        onChange={handleMontageChange}
        label="Montage"
      >
        {categoryTabMaped.map(oneCategory => {
          return (
            <MenuItem key={productId} value={oneCategory}>
              {oneCategory}
            </MenuItem>
          );
        })}
      </Select>
    </FormControl>
  );
};

export default FilterByCategory;
