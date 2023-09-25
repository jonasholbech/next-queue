"use client";
import { useState, useEffect } from "react";
import { subscribeToRoom } from "@/utils/requests";
import Request from "./Request";
import styles from "./Room.module.css";
function Room({ data = [], slug }) {
  const [requests, setRequests] = useState([]);
  useEffect(() => {
    setRequests(data);
    const closeCallback = subscribeToRoom(dbUpdate, slug);
    return closeCallback;
  }, [slug, data]);
  function dbUpdate(payload) {
    console.log(payload);
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
