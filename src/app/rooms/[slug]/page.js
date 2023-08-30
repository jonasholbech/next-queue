import Room from "@/app/components/Room";
import { getRequestsForRoom, insertRequest } from "@/utils/requests";

export const fetchCache = "force-no-store";
export const revalidate = 0; // seconds
export const dynamic = "force-dynamic";

export default async function RoomSlug({ params: { slug } } = props) {
  let { data, error } = await getRequestsForRoom(slug);
  console.log(data, error);
  async function addRequest(formData) {
    "use server";
    console.log(formData.get("name"));
    insertRequest({
      name: formData.get("name"),
      problem: formData.get("problem"),
      description: formData.get("description"),
      room: formData.get("slug"),
    });
  }
  return (
    <main>
      <form action={addRequest}>
        <label>
          Navn
          <input type="text" name="name" />
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
      <details>
        <summary>Raw data</summary>
        {JSON.stringify(data, null, 2)}
      </details>
      <Room data={data} slug={slug} />
    </main>
  );
}
