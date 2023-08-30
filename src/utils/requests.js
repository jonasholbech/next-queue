import { supabase } from "./database";
export async function getRooms() {
  let { data, error } = await supabase
    .from("mmd_queue_room")
    .select(`id, name`);
  return { data, error };
}

export async function getRequestsForRoom(slug) {
  let { data, error } = await supabase
    .from("mmd_queue_requests")
    .select(`id, created_at, name, problem, description, state`)
    .eq("room", slug);
  console.log("GETTING INITIAL DATA");
  return { data, error };
}

export async function updateState(id, current) {
  const next = current === "Venter" ? "Får hjælp" : "Venter";
  const { data, error } = await supabase
    .from("mmd_queue_requests")
    .update({ state: next })
    .eq("id", id);
}
export async function deleteRequest(id) {
  const { error } = await supabase
    .from("mmd_queue_requests")
    .delete()
    .eq("id", id);
  if (error) {
    console.log("ERROR DELETING REQUEST", error);
  }
}
export async function insertRequest({ name, problem, description, room }) {
  const { error, data } = await supabase
    .from("mmd_queue_requests")
    .insert({ name, problem, description, room });
  return { error, data };
}
export function subscribeToRoom(callback, room) {
  supabase
    .channel("schema-db-changes")
    .on(
      "postgres_changes",
      {
        event: "*",
        schema: "public",
        table: "mmd_queue_requests",
        filter: `room=eq.${room}`,
      },
      (payload) => callback(payload)
    )
    .subscribe();
  return () => {
    supabase.removeAllChannels();
  };
}
