import Room from "@/app/components/Room";
import { getRequestsForRoom, insertRequest } from "@/utils/requests";
import { cookies } from "next/headers";
import styles from "./page.module.css";
export const fetchCache = "force-no-store";
export const revalidate = 0; // seconds
export const dynamic = "force-dynamic";

export default async function RoomSlug({ params: { slug } } = props) {
  let { data, error } = await getRequestsForRoom(slug);
  console.log(data, error);
  const cookieStore = cookies();
  const username = cookieStore.get("username");

  async function addRequest(formData) {
    "use server";
    const cookieStore = cookies();
    const username = cookieStore.get("username");
    if (!username) {
      cookies().set({
        name: "username",
        value: formData.get("name"),
        httpOnly: true,
        path: "/",
        SameSite: "Strict",
      });
      //TODO: check samesite in prod
    }
    const name = cookieStore.get("username")?.value || formData.get("name");
    console.log("POST BY", name);
    insertRequest({
      name,
      problem: formData.get("problem"),
      description: formData.get("description"),
      room: formData.get("slug"),
    });
  }
  return (
    <main className={styles.main}>
      <details className={styles.accordion}>
        <summary>HJÆLP!!!!</summary>
        <form action={addRequest}>
          <label>
            Navn
            <input
              type="text"
              name="name"
              defaultValue={username?.value ?? ""}
              disabled={username?.value}
            />
          </label>
          <label>
            Problem
            <input type="text" name="problem" />
          </label>
          <input type="hidden" name="slug" value={slug} />
          <label>
            Beskrivelse
            <textarea name="description"></textarea>
          </label>
          <button>Tilføj</button>
        </form>
      </details>
      {/* <details>
        <summary>Raw data</summary>
        {JSON.stringify(data, null, 2)}
      </details> */}
      <Room
        data={data}
        slug={slug}
        username={cookieStore.get("username")?.value}
      />
    </main>
  );
}
