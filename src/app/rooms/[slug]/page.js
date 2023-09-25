import { getRequestsForRoom, insertRequest } from "@/utils/requests";
import styles from "./page.module.css";
import RoomSlugWrapper from "@/app/wrappers/RoomSlugWrapper";

export const fetchCache = "force-no-store";
export const revalidate = 0; // seconds
export const dynamic = "force-dynamic";

export default async function RoomSlug({ params: { slug } } = props) {
  let { data, error } = await getRequestsForRoom(slug);
  console.log(data, error, slug);

  return (
    <main className={styles.main}>
      <RoomSlugWrapper data={data} slug={slug} />
    </main>
  );
}
