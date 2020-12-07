import { useRouter } from "next/router";
import { FC } from "react";
import styles from "./header.module.css";
import { destroyCookie } from "nookies";

interface HeaderProps {
  heading: string;
  showHome?: boolean;
  showLogout?: boolean;
}

const Header: FC<HeaderProps> = ({ heading, showHome, showLogout }) => {
  const router = useRouter();
  return (
    <div>
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          width: "100vw",
          fontSize: "2rem",
          marginTop: "30px",
        }}
      >
        {showHome && (
          <button className={styles.btn} onClick={() => router.push("/")}>
            Home
          </button>
        )}
        {!showHome && <div></div>}
        <span>{heading}</span>
        {showLogout && (
          <button
            className={styles.btn}
            onClick={() => {
              destroyCookie(null, "token");
              router.push("/login");
            }}
          >
            Logout
          </button>
        )}
        {!showLogout && <div></div>}
      </div>
      <hr />
    </div>
  );
};

export default Header;
