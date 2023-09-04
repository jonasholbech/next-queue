import { getRooms } from "@/utils/requests";
import RoomPicker from "./components/RoomPicker";

export default async function Home() {
  let { data, error } = await getRooms();
  return (
    <main>
      <h1>MMD Køen, V2</h1>
      <RoomPicker rooms={data} />
    </main>
  );
}
