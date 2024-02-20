"use client";
import Room from "@/app/components/Room";
import Form from "@/app/components/Form";
import { ValueContext } from "@/contexts/errorContext";
import { useContext } from "react";
export default function RoomSlugWrapper({ slug }) {
  const error = useContext(ValueContext);
  if (error) {
    return <div>{JSON.stringify(error, null, 2)}</div>;
  }
  return (
    <>
      <Form slug={slug} />
      <Room slug={slug} />
    </>
  );
}
