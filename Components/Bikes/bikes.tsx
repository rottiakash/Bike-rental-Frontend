import React, { FC } from "react";
import { Bike, config } from "../../pages/book";
import BikePage from "../BikePage/BikePage";

interface BikesProps {
  config: config;
}

const Bikes: FC<BikesProps> = ({ config }) => {
  if (config.bikes.length == 0) {
    window.alert("No Matching bikes found");
    window.location.reload();
  }
  return (
    <div>
      {config.bikes.map((bike) => (
        <BikePage bike={bike} config={config} />
      ))}
    </div>
  );
};

export default Bikes;
