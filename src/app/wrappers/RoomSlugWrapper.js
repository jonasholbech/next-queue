"use client";
import Room from "@/app/components/Room";
import Form from "@/app/components/Form";
import { useEffect, useState } from "react";
import { getAbsoluteUrl } from "@/utils/vercel-utils";
export default function RoomSlugWrapper({ slug, data }) {
  const [usersState, setUsersState] = useState(null);
  useEffect(() => {
    (async () => {
      setUsersState(
        await fetch(getAbsoluteUrl() + "/api/swapi").then((res) => res.json())
      );
    })();
  }, []);

  return (
    <>
      <h2>
        {getAbsoluteUrl()} {usersState?.name} {process.env.NODE_ENV}
      </h2>

      <Form slug={slug} />
      <Room data={data} slug={slug} />
    </>
  );
}
