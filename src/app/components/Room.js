"use client";
import { useState, useEffect } from "react";
import styles from "./Room.module.css";
import { deleteRequest, subscribeToRoom, updateState } from "@/utils/requests";
function Room({ data, slug }) {
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
  return (
    <section>
      <ol>
        {requests.map((req) => {
          return (
            <li key={req.id} className={styles.request}>
              <p>{req.name}</p>
              <div>
                <p>{req.problem}</p> <p>{req.description}</p>
              </div>
              <div>
                <button onClick={() => updateState(req.id, req.state)}>
                  {req.state}
                </button>
                <button onClick={() => deleteRequest(req.id)}>Slet</button>
              </div>
            </li>
          );
        })}
      </ol>
    </section>
  );
}

export default Room;
