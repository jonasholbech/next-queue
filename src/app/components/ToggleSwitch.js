"use client";
import { useState, useEffect } from "react";
import { Switch } from "@headlessui/react";
import styles from "./ToggleSwitch.module.css";
export default function ToggleSwitch({ label, callback, initialValue = true }) {
  /* const [enabled, setEnabled] = useState(initialValue);
  useEffect(() => {
    setEnabled(initialValue);
  }, [initialValue]); */
  function onChange(e) {
    /* setEnabled(e); */
    callback(e);
  }
  return (
    <label className={styles.group}>
      {label}{" "}
      <Switch
        checked={initialValue}
        onChange={onChange}
        className={`${initialValue ? styles.active : styles.inactive} ${
          styles.switch
        } test`}
      >
        <span className="sr-only">Enable notifications</span>
        <span
          className={`${
            initialValue ? styles.activeBall : styles.inactiveBall
          } ${styles.ball}`}
        />
      </Switch>
    </label>
  );
}
