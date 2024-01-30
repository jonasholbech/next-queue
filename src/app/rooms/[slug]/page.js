import styles from "./page.module.css";
import RoomSlugWrapper from "@/app/wrappers/RoomSlugWrapper";
import { baseTitle } from "@/utils/settings";
export async function generateMetadata({ params }) {
  const slug = params.slug;
  return {
    title: baseTitle + " - " + slug,
  };
}

export default async function RoomSlug({ params: { slug } } = props) {
  return (
    <main className={styles.main}>
      <RoomSlugWrapper slug={slug} />
    </main>
  );
}
