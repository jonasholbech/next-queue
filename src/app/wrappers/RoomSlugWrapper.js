"use client";
import Room from "@/app/components/Room";
import Form from "@/app/components/Form";
export default function RoomSlugWrapper({ slug }) {
  return (
    <>
      <Form slug={slug} />
      <Room slug={slug} />
    </>
  );
}
