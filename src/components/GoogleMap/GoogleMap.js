import React from "react";
import GoogleMapReact from "google-map-react";
import MapMarker from "./MapMarker";

const GoogleMap = () => {
  const defaultProps = {
    center: {
      lat: 50.061984,
      lng: 19.938199
    },
    zoom: 24
  };

  return (
    <div style={{ height: "50vh", width: "100%", marginTop: "30px" }}>
      <GoogleMapReact defaultCenter={defaultProps.center} defaultZoom={11}>
        <MapMarker lat={50.061984} lng={19.938199} markerText="Telescop Shop" />
      </GoogleMapReact>
    </div>
  );
};

export default GoogleMap;
