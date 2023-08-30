import styles from "./Request.module.css";
import { deleteRequest, updateState } from "@/utils/requests";
function Request({ req }) {
  function getUser() {
    return localStorage.getItem("username") || "";
  }
  return (
    <li className={styles.request}>
      <p>{req.name}</p>
      <div>
        <p>{req.problem}</p> <p>{req.description}</p>
      </div>
      {getUser() === req.name && (
        <div className={styles.actionbar}>
          <button onClick={() => updateState(req.id, req.state)}>
            {req.state}
          </button>

          <button
            className={styles.delete}
            onClick={() => deleteRequest(req.id)}
          >
            Slet
          </button>
        </div>
      )}
    </li>
  );
}

export default Request;
