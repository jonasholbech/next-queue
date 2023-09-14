"use client";
import { useEffect, useState } from "react";
import { clearAll, getUserName } from "@/utils/storage";
import styles from "./Nav.module.css";
import Link from "next/link";
function Nav() {
  const [name, setName] = useState("");
  useEffect(() => {
    setName(getUserName());
  }, []);
  const clear = () => {
    clearAll();
    window.location.reload();
  };
  return (
    <nav className={styles.nav}>
      <Link href="/" title="Til forsiden">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="16"
          height="16"
          aria-hidden="true"
          focusable="false"
          fill="currentColor"
          className="bi bi-house-door-fill"
          viewBox="0 0 16 16"
        >
          <path d="M6.5 14.5v-3.505c0-.245.25-.495.5-.495h2c.25 0 .5.25.5.5v3.5a.5.5 0 0 0 .5.5h4a.5.5 0 0 0 .5-.5v-7a.5.5 0 0 0-.146-.354L13 5.793V2.5a.5.5 0 0 0-.5-.5h-1a.5.5 0 0 0-.5.5v1.293L8.354 1.146a.5.5 0 0 0-.708 0l-6 6A.5.5 0 0 0 1.5 7.5v7a.5.5 0 0 0 .5.5h4a.5.5 0 0 0 .5-.5z" />
        </svg>
        <span className="sr-only">Til forsiden</span>
      </Link>
      <div className={styles.profile}>
        <p>Hej {name}</p>
        <button role="button" onClick={clear}>
          Slet min data
        </button>
      </div>
    </nav>
  );
}

export default Nav;
