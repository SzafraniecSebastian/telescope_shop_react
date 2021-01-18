import React, { useState, useEffect } from "react";
import { BrowserRouter, Switch, Route } from "react-router-dom";
import { routes } from "../routes/routes";
import Home from "../views/Home";
import Contact from "../views/Contact";
import Products from "../views/Products";
import SingleProduct from "../views/SingleProduct";
import About from "../views/About";
import ShopContext from "../context/Context";
import MainTemplate from "../templates/MainTemplate";
import { client } from "../contentful/contentful";

const Root = () => {
  const getCartFromLocalStorage = () => {
    let localStorageCart;

    if (localStorage.getItem("cart")) {
      localStorageCart = JSON.parse(localStorage.getItem("cart"));
    } else {
      localStorageCart = [];
    }

    return [...localStorageCart];
  };

  const getCartCounterFromLocalStorage = () => {
    let localStorageCartCounter;

    if (localStorage.getItem("cartCounter")) {
      localStorageCartCounter = JSON.parse(localStorage.getItem("cartCounter"));
    } else {
      localStorageCartCounter = 0;
    }

    return localStorageCartCounter;
  };

  const [products, setProducts] = useState([]);
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [cart, setCart] = useState(getCartFromLocalStorage());
  const [cartCounter, setCartCounter] = useState(
    getCartCounterFromLocalStorage()
  );
  const [cartTotal, setCartTotal] = useState(0);
  const [isSideMenuOpen, setIsSideMenuOpen] = useState(false);
  const [left, setLeft] = useState(false);
  const [filteredProducts, setFilteredProducts] = useState([]);
  const [succesfullPaymentAlert, setSuccesfullPaymentAlert] = useState(false);

  //filters states
  const [montage, setMontage] = useState("all");
  const [price, setPrice] = useState([]);
  const [priceRange, setPriceRange] = useState([]);
  const [isFreeDelivery, setIsFreeDelivery] = useState(false);
  const [search, setSearch] = useState("");

  const setContentfulData = data => {
    if (data.length !== 0) {
      const contentfulProducts = data.map(product => {
        const productId = product.sys.id;

        const newProductImage = product.fields.productImage.fields.file.url;

        const newProduct = {
          productId,
          ...product.fields
        };
        newProduct.productImage = newProductImage;

        return newProduct;
      });

      const idOfCartProducts = cart.map(oneProduct => oneProduct.productId);

      const filteredProducts2 = contentfulProducts.map(oneProduct => {
        if (idOfCartProducts.indexOf(oneProduct.productId) > -1) {
          oneProduct.addedToCart = true;
        } else {
          oneProduct.addedToCart = false;
        }
        return oneProduct;
      });

      setProducts([...contentfulProducts]);
      setFilteredProducts([...filteredProducts2]);
      const prices = [
        0,
        Math.max(
          ...contentfulProducts.map(oneProduct => oneProduct.productPrice)
        )
      ];

      setPrice(prices);
      setPriceRange(prices);
    }
  };

  const getContentfulData = () => {
    client
      .getEntries({
        content_type: "product"
      })
      .then(res => {
        setContentfulData(res.items);
      })
      .catch(err => console.error(err));
  };

  useEffect(() => {
    getContentfulData();
  }, []);

  const clearFilters = () => {
    setPrice([
      0,
      Math.max(...products.map(oneProduct => oneProduct.productPrice))
    ]);
    setMontage("all");
    setIsFreeDelivery(false);
    setSearch("");
  };

  const clearCartAndCartCounter = () => {
    setCart([]);
    setCartCounter(0);
  };

  const isSuccesfullPaymentAlertOpen = () => {
    setSuccesfullPaymentAlert(true);
  };

  const isSuccesfullPaymentAlertClosed = () => {
    setSuccesfullPaymentAlert(false);
  };

  const setCartToLocalStorage = () => {
    localStorage.setItem("cart", JSON.stringify(cart));
  };

  const setCartCounterToLocalStorage = () => {
    localStorage.setItem("cartCounter", JSON.stringify(cartCounter));
  };

  useEffect(() => {
    setCartToLocalStorage();
    setCartCounterToLocalStorage();
  }, [cart, cartCounter]);

  const inputNameChange = e => {
    setSearch(e.target.value);
  };

  const handlePriceChange = (e, newValue) => {
    setPrice(newValue);
  };

  const handleMontageChange = e => {
    setMontage(e.target.value);
  };

  useEffect(() => {
    filterProducts();
  }, [montage, price, isFreeDelivery, search]);

  const freeDeliveryHandler = e => {
    setIsFreeDelivery(e.target.checked);
  };

  const filterProducts = () => {
    let tempProducts = [...products];

    if (montage !== "all") {
      tempProducts = tempProducts.filter(oneProduct => {
        return oneProduct.productMontage === montage;
      });
    }

    if (price !== priceRange) {
      tempProducts = tempProducts.filter(oneProduct => {
        return (
          oneProduct.productPrice >= price[0] &&
          oneProduct.productPrice <= price[1]
        );
      });
    }

    if (isFreeDelivery) {
      tempProducts = tempProducts.filter(oneProduct => {
        return oneProduct.productFreeDelivery === true;
      });
    }

    if (search !== "") {
      tempProducts = tempProducts.filter(oneProduct => {
        const tempSearch = search.toLowerCase();
        const tempProductName = oneProduct.productName
          .toLowerCase()
          .slice(0, tempSearch.length);
        return tempSearch === tempProductName;
      });
    }

    setFilteredProducts([...tempProducts]);
  };

  const toggleDrawer = (anchor, open) => event => {
    if (
      event.type === "keydown" &&
      (event.key === "Tab" || event.key === "Shift")
    ) {
      return;
    }

    setLeft({ [left]: open });
  };

  const handleCartOpen = () => {
    setIsCartOpen(true);
  };

  const handleCartClose = () => {
    setIsCartOpen(false);
  };

  const handleSideMenu = () => {
    setIsSideMenuOpen(!isSideMenuOpen);
  };

  const addToCart = id => {
    const choosenProduct = products.find(oneProducts => {
      return id === oneProducts.productId;
    });
    choosenProduct.addedToCart = true;

    if (cart.length !== 0) {
      const newCart = cart.map(product => {
        if (product.productId === id) {
          product.productQuantity = product.productQuantity + 1;
        }
      });
    }

    let isProductAlreadyInCart;
    cart.map(oneProduct => {
      if (oneProduct.productId === id) {
        isProductAlreadyInCart = true;
      }
    });

    if (isProductAlreadyInCart) {
      setCart([...new Set([...cart])]);
    } else {
      setCart([...new Set([...cart, choosenProduct])]);
    }
  };

  const deleteFromCart = (id, quantity) => {
    const filteredCartProducts = cart.filter(oneProduct => {
      if (oneProduct.productId === id) {
        oneProduct.addedToCart = false;
        oneProduct.productQuantity = 1;
      }

      return id !== oneProduct.productId;
    });

    setCart([...filteredCartProducts]);
    setCartCounter(cartCounter - quantity);

    const mapedProducts = products.map(oneProduct => {
      if (id === oneProduct.productId) {
        oneProduct.addedToCart = false;
      }
      return oneProduct;
    });
    setProducts([...mapedProducts]);
  };

  const increaseCartCounter = () => {
    setCartCounter(cartCounter + 1);
  };

  const decreaseCartCounter = () => {
    setCartCounter(cartCounter - 1);
  };

  const increseProductQuantity = id => {
    const mapedCart = cart.map(oneProduct => {
      if (oneProduct.productId === id) {
        oneProduct.productQuantity += 1;
      }
      return oneProduct;
    });
    setCart([...mapedCart]);
  };

  const decreseProductQuantity = id => {
    const mapedCart = cart.map(oneProduct => {
      if (oneProduct.productId === id) {
        oneProduct.productQuantity -= 1;
      }
      return oneProduct;
    });
    setCart([...mapedCart]);
  };

  useEffect(() => {
    calculateTotal();
  }, [cart]);

  const calculateTotal = () => {
    let total = 0;
    cart.map(oneProduct => {
      total = total + oneProduct.productQuantity * oneProduct.productPrice;
    });
    setCartTotal(total);
  };

  return (
    <BrowserRouter>
      <ShopContext.Provider
        value={{
          products,
          isCartOpen,
          handleCartClose,
          handleCartOpen,
          addToCart,
          cart,
          deleteFromCart,
          cartCounter,
          increaseCartCounter,
          decreaseCartCounter,
          increseProductQuantity,
          decreseProductQuantity,
          cartTotal,
          isSideMenuOpen,
          handleSideMenu,
          left,
          toggleDrawer,
          handleMontageChange,
          montage,
          filteredProducts,
          handlePriceChange,
          price,
          priceRange,
          freeDeliveryHandler,
          inputNameChange,
          isSuccesfullPaymentAlertOpen,
          isSuccesfullPaymentAlertClosed,
          succesfullPaymentAlert,
          clearCartAndCartCounter,
          clearFilters
        }}
      >
        <MainTemplate>
          <Switch>
            <Route exact path={routes.home} component={Home} />
            <Route path={routes.contact} component={Contact} />
            <Route exact path={routes.products} component={Products} />
            <Route path={routes.singleProduct} component={SingleProduct} />
            <Route path={routes.about} component={About} />
          </Switch>
        </MainTemplate>
      </ShopContext.Provider>
    </BrowserRouter>
  );
};

export default Root;
