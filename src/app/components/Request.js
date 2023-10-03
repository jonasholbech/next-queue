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
            <p>{req.name}</p>
            <p className={styles.subtle}>
              {formatDistanceToNow(new Date(req.created_at), {
                locale: daLocale,
              })}
            </p>
          </ConditionalWrapper>
        </div>

        <div className={styles.problem}>
          {isAdmin() && req.initials && (
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="16"
              height="16"
              fill="currentColor"
              class="bi bi-headset"
              viewBox="0 0 16 16"
            >
              <path d="M8 1a5 5 0 0 0-5 5v1h1a1 1 0 0 1 1 1v3a1 1 0 0 1-1 1H3a1 1 0 0 1-1-1V6a6 6 0 1 1 12 0v6a2.5 2.5 0 0 1-2.5 2.5H9.366a1 1 0 0 1-.866.5h-1a1 1 0 1 1 0-2h1a1 1 0 0 1 .866.5H11.5A1.5 1.5 0 0 0 13 12h-1a1 1 0 0 1-1-1V8a1 1 0 0 1 1-1h1V6a5 5 0 0 0-5-5z" />
            </svg>
          )}
          <p>{req.problem}</p>{" "}
          <p className={styles.subtle}>{req.description}</p>
        </div>
        {canDelete(req.id) ? (
          <div className={styles.actionbar}>
            <button
              className={req.state === "Venter" ? "" : styles.gettingHelp}
              onClick={() => updateState(req.id, req.state)}
            >
              {req.state}
            </button>

            <button
              className={styles.delete}
              onClick={() => deleteRequest(req.id)}
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="16"
                height="16"
                fill="currentColor"
                class="bi bi-trash-fill"
                viewBox="0 0 16 16"
              >
                <path d="M2.5 1a1 1 0 0 0-1 1v1a1 1 0 0 0 1 1H3v9a2 2 0 0 0 2 2h6a2 2 0 0 0 2-2V4h.5a1 1 0 0 0 1-1V2a1 1 0 0 0-1-1H10a1 1 0 0 0-1-1H7a1 1 0 0 0-1 1H2.5zm3 4a.5.5 0 0 1 .5.5v7a.5.5 0 0 1-1 0v-7a.5.5 0 0 1 .5-.5zM8 5a.5.5 0 0 1 .5.5v7a.5.5 0 0 1-1 0v-7A.5.5 0 0 1 8 5zm3 .5v7a.5.5 0 0 1-1 0v-7a.5.5 0 0 1 1 0z" />
              </svg>
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
