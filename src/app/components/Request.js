import { canDelete, isAdmin } from "@/utils/storage";
import styles from "./Request.module.css";
import { deleteRequest, updateState } from "@/utils/requests";
import { formatDistanceToNow } from "date-fns";
import daLocale from "date-fns/locale/da";
import ConditionalWrapper from "./ConditionalWrapper";

function Request({ req }) {
  return (
    <li className={styles.request}>
      <div className={styles.inner}>
        <div className={styles.profile}>
          <ConditionalWrapper
            condition={isAdmin() && req.initials}
            wrapper={(children) => (
              <a
                target="_blank"
                href={`https://teams.microsoft.com/l/call/0/0?users=${req.initials}&withVideo=true`}
              >
                {children}
              </a>
            )}
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="50"
              height="50"
              fill={isAdmin() && req.initials ? "hotpink" : "currentColor"}
              className="bi bi-person-circle"
              viewBox="0 0 16 16"
            >
              <path d="M11 6a3 3 0 1 1-6 0 3 3 0 0 1 6 0z" />
              <path
                fillRule="evenodd"
                d="M0 8a8 8 0 1 1 16 0A8 8 0 0 1 0 8zm8-7a7 7 0 0 0-5.468 11.37C3.242 11.226 4.805 10 8 10s4.757 1.225 5.468 2.37A7 7 0 0 0 8 1z"
              />
            </svg>
          </ConditionalWrapper>

          <p>{req.name}</p>
          <p className={styles.subtle}>
            {formatDistanceToNow(new Date(req.created_at), {
              locale: daLocale,
            })}
          </p>
        </div>

        <div className={styles.problem}>
          <p>{req.problem}</p>{" "}
          <p className={styles.subtle}>{req.description}</p>
        </div>
        {canDelete(req.id) ? (
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
        ) : (
          <p>{req.state}</p>
        )}
      </div>
    </li>
  );
}

export default Request;
