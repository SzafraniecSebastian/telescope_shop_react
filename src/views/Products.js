import React from "react";
import ProductsList from "../components/ProductsList/ProductsList";
import FilterMenu from "../components/filters/FilterMenu/FilterMenu";

const Products = () => {
  return (
    <>
      <FilterMenu />
      <ProductsList />
    </>
  );
};

export default Products;
