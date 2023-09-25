import { getRooms, getSWChar } from "@/utils/requests";
import RoomPicker from "./components/RoomPicker";
import styles from "./page.module.css";
import { getAbsoluteUrl } from "@/utils/vercel-utils";

export default async function Home() {
  let { data, error } = await getRooms();
  const users = await getSWChar();

  //console.log(process.env.VERCEL_URL);
  return (
    <main className={styles.main}>
      <h1>
        MMD Køen, V2 {getAbsoluteUrl()} {users.name}
      </h1>
      <RoomPicker rooms={data} />
    </main>
  );
}
//next-queue-38d8pwwbv-jonasholbech.vercel.app/api/swapi
