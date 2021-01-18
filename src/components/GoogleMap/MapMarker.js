import React from "react";
import classes from "./MapMarker.module.css";
import Jump from "react-reveal/Jump";

const MapMarker = ({ markerText }) => {
  return (
    <Jump forever delay={2000} duration={2000}>
      <>
        <div className={classes.marker__wrapper}>
          <h5 className={classes.marker__text}>{markerText}</h5>
        </div>
      </>
    </Jump>
  );
};

export default MapMarker;
