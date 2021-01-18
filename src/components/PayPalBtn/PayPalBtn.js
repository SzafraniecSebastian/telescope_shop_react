import React, { useContext } from "react";
import PaypalExpressBtn from "react-paypal-express-checkout";
import ShopContext from "../../context/Context";

const PayPalBtn = () => {
  const value = useContext(ShopContext);

  const {
    cartTotal,
    isSuccesfullPaymentAlertOpen,
    isSuccesfullPaymentAlertClosed,
    clearCartAndCartCounter,
    handleCartClose
  } = value;

  const onSuccessPayment = payment => {
    console.log(payment);
    isSuccesfullPaymentAlertOpen();
    handleCartClose();
    clearCartAndCartCounter();

    setTimeout(() => {
      isSuccesfullPaymentAlertClosed();
    }, 6000);
  };

  const onCancelPayment = res => {
    console.log(res);
  };

  const onError = err => {
    console.log(err);
  };

  const client = {
    sandbox: process.env.REACT_APP_SANDBOX_ID,
    production: ""
  };

  return (
    <PaypalExpressBtn
      onSuccess={onSuccessPayment}
      onCancel={onCancelPayment}
      onError={onError}
      currency={"USD"}
      env={"sandbox"}
      client={client}
      total={cartTotal}
    />
  );
};

export default PayPalBtn;
