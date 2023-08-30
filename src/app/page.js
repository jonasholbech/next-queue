import Image from "next/image";
import styles from "./page.module.css";
import { getRooms } from "@/utils/requests";
import RoomPicker from "./components/RoomPicker";

export default async function Home() {
  let { data, error } = await getRooms();
  return (
    <main>
      <RoomPicker rooms={data} />
    </main>
  );
}
