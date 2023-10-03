"use client";
import { useState, useEffect } from "react";
import { subscribeToRoom } from "@/utils/requests";
import Request from "./Request";
import styles from "./Room.module.css";
import { useVisibilityChange } from "@uidotdev/usehooks";

import { getRequestsForRoom } from "@/utils/requests";
import FRODebugger from "./FRODebugger";
export const fetchCache = "force-no-store";
export const revalidate = 0; // seconds
export const dynamic = "force-dynamic";

function Room({ slug }) {
  const documentVisible = useVisibilityChange();
  const [requests, setRequests] = useState([]);
  const [visibilityHistory, setVisibilityHistory] = useState([]);
  useEffect(() => {
    let closeCallback = () => {
      console.warn("fake callback called");
    };
    setVisibilityHistory((old) => [...old, documentVisible]);
    if (documentVisible) {
      closeCallback = subscribeToRoom(dbUpdate, slug);
      (async () => {
        let { data, error } = await getRequestsForRoom(slug);
        setRequests(data);
      })();
      //console.log("Subscribed to room", slug);
    } else {
      closeCallback();
      //console.log("Unsubscribed from room", slug);
    }
    return closeCallback;
  }, [documentVisible, slug]);
  useEffect(() => {}, [documentVisible]);
  function dbUpdate(payload) {
    //console.log(payload);
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
    }
  }
  /* const mine = requests.filter((request) => canDelete(request.id));
  const before = requests.filter(
    (request) =>
      !canDelete(request.id) && request.created_at < mine[0].created_at
  ); */
  return (
    <section>
      {requests.length === 0 && <p>Ingen problemer i køen</p>}
      {slug == "3SEM-FRO-E23" && (
        <FRODebugger>
          {{ visibilityHistory, documentVisible, requests }}
        </FRODebugger>
      )}
      {/* <p>{before.length} i køen før dig</p> */}
      <ol className={styles.list}>
        {requests.map((req) => {
          return <Request key={req.id} req={req} />;
        })}
      </ol>
    </section>
  );
}

export default Room;
