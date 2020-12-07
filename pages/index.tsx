import { Button } from "antd";
import { useRouter } from "next/router";
import { useState } from "react";
import Spinner from "../HOCs/spinner";
import styles from "./index.module.css";
export default function index() {
  const [spinning, setSpinning] = useState(false);
  const router = useRouter();
  return (
    <Spinner spinning={spinning}>
      <div className={styles.title}>
        <div className={styles.overlay}>
          <h1 className={styles.h1}>Bike Rental System</h1>

          <Button
            type="primary"
            style={{ marginTop: "50px" }}
            onClick={() => {
              setSpinning(true);
              router.push("/book");
            }}
          >
            Book a Bike
          </Button>
          <Button
            type="primary"
            style={{ marginTop: "50px", backgroundColor: "chocolate" }}
            onClick={() => {
              setSpinning(true);
              router.push("/admin");
            }}
          >
            Admin Console
          </Button>
        </div>
      </div>
    </Spinner>
  );
}
