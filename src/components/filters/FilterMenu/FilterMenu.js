import React, { useContext } from "react";
import { makeStyles } from "@material-ui/core/styles";
import Accordion from "@material-ui/core/Accordion";
import AccordionSummary from "@material-ui/core/AccordionSummary";
import AccordionDetails from "@material-ui/core/AccordionDetails";
import Typography from "@material-ui/core/Typography";
import ExpandMoreIcon from "@material-ui/icons/ExpandMore";
import FilterByCategory from "../FilterByCategory/FilterByCategory";
import FilterByPrice from "../FilterByPrice/FilterByPrice";
import FilterByDelivery from "../FilterByDelivery/FilterByDelivery";
import FilterByName from "../FilterByName/FilterByName";
import ShopContext from "../../../context/Context";
import Button from "@material-ui/core/Button";

const useStyles = makeStyles(theme => ({
  root: {
    display: "flex !important",
    justifyContent: "center !important",
    marginBottom: "30px"
  },
  heading: {
    fontSize: theme.typography.pxToRem(15),
    fontWeight: theme.typography.fontWeightRegular
  },
  filterElements: {
    display: "flex",
    flexWrap: "wrap"
  }
}));

export default function SimpleAccordion() {
  const classes = useStyles();
  const value = useContext(ShopContext);

  return (
    <div className={classes.root}>
      <Accordion>
        <AccordionSummary
          expandIcon={<ExpandMoreIcon />}
          aria-controls="panel1a-content"
          id="panel1a-header"
        >
          <Typography className={classes.heading}>Filters</Typography>
        </AccordionSummary>
        <AccordionDetails>
          <div className={classes.filterElements}>
            <FilterByCategory />
            <FilterByName />
            <FilterByPrice />
            <FilterByDelivery />
            <Button
              onClick={value.clearFilters}
              variant="contained"
              style={{ height: "44px" }}
            >
              Reset filters
            </Button>
          </div>
        </AccordionDetails>
      </Accordion>
    </div>
  );
}

// import React from "react";
// import FilterByCategory from "../FilterByCategory/FilterByCategory";
// import FilterByPrice from "../FilterByPrice/FilterByPrice";
// import FilterByDelivery from "../FilterByDelivery/FilterByDelivery";
// import FilterByName from "../FilterByName/FilterByName";

// const FilterMenu = () => {
//   return (
//     <>
//       <FilterByCategory />
//       <FilterByPrice />
//       <FilterByDelivery />
//       <FilterByName />
//     </>
//   );
// };

// export default FilterMenu;
