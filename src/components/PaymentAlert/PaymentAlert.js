import React, { useContext } from "react";
import { makeStyles } from "@material-ui/core/styles";
import Alert from "@material-ui/lab/Alert";
import IconButton from "@material-ui/core/IconButton";
import Collapse from "@material-ui/core/Collapse";
import CloseIcon from "@material-ui/icons/Close";
import ShopContext from "../../context/Context";

const useStyles = makeStyles(theme => ({
  root: {
    width: "100%",
    "& > * + *": {
      marginTop: theme.spacing(2)
    }
  }
}));

const PaymentAlert = () => {
  const classes = useStyles();
  const value = useContext(ShopContext);
  const { succesfullPaymentAlert, isSuccesfullPaymentAlertClosed } = value;

  return (
    <div className={classes.root}>
      <Collapse in={succesfullPaymentAlert}>
        <Alert
          action={
            <IconButton
              aria-label="close"
              color="inherit"
              size="small"
              onClick={isSuccesfullPaymentAlertClosed}
            >
              <CloseIcon fontSize="inherit" />
            </IconButton>
          }
        >
          Payment Succesfull
        </Alert>
      </Collapse>
    </div>
  );
};

export default PaymentAlert;
