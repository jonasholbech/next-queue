import Link from "next/link";
function RoomPicker({ rooms }) {
  return (
    <ul>
      {rooms.map((el) => {
        return (
          <li key={el.id}>
            <Link href={`/rooms/${el.name}`}>{el.name}</Link>
          </li>
        );
      })}
    </ul>
  );
}

export default RoomPicker;
