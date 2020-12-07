import { FC } from "react";
import styles from "./BikePage.module.css";
import Image from "next/image";
import { Bike, config } from "../../pages/book";
import { Button } from "antd";

interface BikePageProps {
  bike: Bike;
  config: config;
}

const BikePage: FC<BikePageProps> = ({ bike, config }) => {
  return (
    <div
      style={{
        display: "flex",
        height: "100vh",
        paddingBottom: "30px",
        paddingTop: "30px",
      }}
    >
      <section
        style={{
          height: "100%",
          width: "50%",
          backgroundColor: "teal",
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          flexDirection: "column",
        }}
      >
        <span style={{ fontSize: "3rem" }} className={styles.name}>
          {bike.model}
        </span>
        <img
          src={bike.imageurl}
          alt={`Image for ${bike.model}`}
          style={{ borderRadius: "50%", width: "200px", height: "200px" }}
        />
      </section>
      <section
        style={{
          height: "100%",
          width: "50%",
          backgroundColor: "skyblue",
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          flexDirection: "column",
        }}
      >
        <span style={{ fontSize: "3rem" }} className={styles.name}>
          ₹{bike.priceperday}
        </span>
        <Button
          type="primary"
          onClick={() => {
            config.setReserve_payload({
              startDate: config.startDate,
              endDate: config.endDate,
              id: bike.id,
            });
            config.setStage(2);
          }}
        >
          Book Now
        </Button>
      </section>
    </div>
  );
};

export default BikePage;
