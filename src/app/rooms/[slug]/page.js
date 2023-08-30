import Room from "@/app/components/Room";
import { getRequestsForRoom, insertRequest } from "@/utils/requests";
import styles from "./page.module.css";
import Form from "@/app/components/Form";
export const fetchCache = "force-no-store";
export const revalidate = 0; // seconds
export const dynamic = "force-dynamic";

export default async function RoomSlug({ params: { slug } } = props) {
  let { data, error } = await getRequestsForRoom(slug);
  console.log(data, error);

  return (
    <main className={styles.main}>
      <Form slug={slug} />
      <Room data={data} slug={slug} username={"TBD"} />
    </main>
  );
}
