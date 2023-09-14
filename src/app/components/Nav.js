"use client";
import { clearAll, getUserName } from "@/utils/storage";
import styles from "./Nav.module.css";
function Nav() {
  const clear = () => {
    clearAll();
    window.location.reload();
  };
  return (
    <nav className={styles.nav}>
      <p>Hej {getUserName()}</p>
      <button role="button" onClick={clear}>
        Slet min data
      </button>
    </nav>
  );
}

export default Nav;
