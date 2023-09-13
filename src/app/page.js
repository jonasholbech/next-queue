import { getRooms } from "@/utils/requests";
import RoomPicker from "./components/RoomPicker";
import styles from "./page.module.css";
export default async function Home() {
  let { data, error } = await getRooms();
  return (
    <main className={styles.main}>
      <h1>MMD Køen, V2</h1>
      <RoomPicker rooms={data} />
    </main>
  );
}
