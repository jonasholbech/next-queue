import styles from "./page.module.css";
import RoomSlugWrapper from "@/app/wrappers/RoomSlugWrapper";

export default async function RoomSlug({ params: { slug } } = props) {
  return (
    <main className={styles.main}>
      <RoomSlugWrapper slug={slug} />
    </main>
  );
}
