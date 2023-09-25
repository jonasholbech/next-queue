"use client";
import Room from "@/app/components/Room";
import Form from "@/app/components/Form";
export default function RoomSlugWrapper({ slug, data }) {
  return (
    <>
      <Form slug={slug} />
      <Room data={data} slug={slug} />
    </>
  );
}
