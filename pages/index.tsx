import { Button } from "antd";
import styles from "./index.module.css";
import Link from "next/link";
export default function index() {
  return (
    <div className={styles.title}>
      <div className={styles.overlay}>
        <h1 className={styles.h1}>Bike Rental System</h1>
        <Link href="/book">
          <Button type="primary" style={{ marginTop: "50px" }}>
            Book a Bike
          </Button>
        </Link>
      </div>
    </div>
  );
}
