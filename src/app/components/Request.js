import { canDelete, isAdmin } from "@/utils/storage";
import styles from "./Request.module.css";

import { formatDistanceToNow } from "date-fns";
import daLocale from "date-fns/locale/da";
import ConditionalWrapper from "./ConditionalWrapper";
import ActionBar from "../rooms/[slug]/components/ActionBar";

//TODO: split op i components, lidt crazy nu
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
              fill="hotpink"
              className="bi bi-headset"
              viewBox="0 0 16 16"
            >
              <path d="M8 1a5 5 0 0 0-5 5v1h1a1 1 0 0 1 1 1v3a1 1 0 0 1-1 1H3a1 1 0 0 1-1-1V6a6 6 0 1 1 12 0v6a2.5 2.5 0 0 1-2.5 2.5H9.366a1 1 0 0 1-.866.5h-1a1 1 0 1 1 0-2h1a1 1 0 0 1 .866.5H11.5A1.5 1.5 0 0 0 13 12h-1a1 1 0 0 1-1-1V8a1 1 0 0 1 1-1h1V6a5 5 0 0 0-5-5z" />
            </svg>
          )}
          <p>{req.problem}</p>
          <p className={styles.subtle}>{req.description}</p>
        </div>
        <ActionBar req={req} />
      </div>
    </li>
  );
}

export default Request;
