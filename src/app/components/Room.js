"use client";
import { useState, useEffect } from "react";
import { subscribeToRequests, getRoomState } from "@/utils/requests";
import Request from "./Request";
import styles from "./Room.module.css";
import { useVisibilityChange } from "@uidotdev/usehooks";

import { getRequestsForRoom } from "@/utils/requests";
import FRODebugger from "./FRODebugger";

//er de her nødvendige? liger i useEffect nu
export const fetchCache = "force-no-store";
export const revalidate = 0; // seconds
export const dynamic = "force-dynamic";
//TODO: 404 for N/A room
function Room({ slug }) {
  //TODO: useVisibilityChangeSubscribe ? og i form
  //skal subscriptions hoistes til form?
  const documentVisible = useVisibilityChange();
  const [requests, setRequests] = useState([]);
  const [visibilityHistory, setVisibilityHistory] = useState([]);

  useEffect(() => {
    let closeCallback = () => {};
    setVisibilityHistory((old) => [...old, documentVisible]);
    if (documentVisible) {
      closeCallback = subscribeToRequests(dbUpdate, slug);
      (async () => {
        let { data, error } = await getRequestsForRoom(slug);
        setRequests(data);
      })();
    } else {
      closeCallback();
    }
    return closeCallback;
  }, [documentVisible, slug]);

  function dbUpdate(payload) {
    switch (payload.eventType) {
      case "UPDATE":
        setRequests((old) => {
          return old.map((obj) => {
            if (obj.id === payload.new.id) {
              return payload.new;
            }
            return obj;
          });
        });
        break;
      case "DELETE":
        setRequests((old) => old.filter((obj) => obj.id !== payload.old.id));
        break;
      case "INSERT":
        setRequests((old) => old.concat(payload.new));
        break;
      default:
        console.warn("Unhandled event type", payload);
    }
  }
  return (
    <section>
      {requests.length === 0 && <p>Ingen problemer i køen 🎉</p>}
      {slug == "3SEM-FRO-F24" && (
        <FRODebugger>
          {{ visibilityHistory, documentVisible, requests, localStorage }}
        </FRODebugger>
      )}

      <ol className={styles.list}>
        {requests.map((req) => {
          return <Request key={req.id} req={req} />;
        })}
      </ol>
    </section>
  );
}
export default Room;
