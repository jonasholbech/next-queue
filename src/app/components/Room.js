"use client";
import { useState, useEffect } from "react";
//import styles from "./Room.module.css";
import { subscribeToRoom } from "@/utils/requests";
import Request from "./Request";
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
  return (
    <section>
      {requests.length === 0 && <p>Ingen problemer i køen</p>}
      <ol>
        {requests.map((req) => {
          return <Request key={req.id} req={req} />;
        })}
      </ol>
    </section>
  );
}

export default Room;
