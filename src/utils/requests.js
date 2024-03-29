import { supabase } from "./database";
export async function getRooms() {
  let { data, error } = await supabase
    .from("mmd_queue_room")
    .select(`id, name`)
    .order("name");
  return { data, error };
}
export async function getRoomState(slug) {
  let { data, error } = await supabase
    .from("mmd_queue_room")
    .select(`open, allow_teams`)
    .eq("name", slug);
  data = data[0] || null;
  return { data, error };
}
export async function toggleRoomState(slug, key, next) {
  const { data, error } = await supabase
    .from("mmd_queue_room")
    .update({ [key]: !next })
    .eq("name", slug);
  console.log(data, error);
}
export async function getRequestsForRoom(slug) {
  let { data, error } = await supabase
    .from("mmd_queue_requests")
    .select(`id, created_at, name, problem, description, state, initials`)
    .eq("room", slug)
    .order("created_at");
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
export async function insertRequest({
  name,
  problem,
  description,
  room,
  initials,
}) {
  const { error, data } = await supabase
    .from("mmd_queue_requests")
    .insert({ name, problem, description, room, initials })
    .select();
  console.log({ name, problem, description, room, initials });
  if (!error) {
    return data;
  }
  return error;
}
export function subscribeToRoom(callback, room) {
  //TODO: error handling
  supabase
    .channel("schema-db-changes-room")
    .on(
      "postgres_changes",
      {
        event: "UPDATE",
        schema: "public",
        table: "mmd_queue_room",
        filter: `name=eq.${room}`,
      },
      (payload) => callback(payload)
    )
    .subscribe((status) => {
      //console.log("subscribe", status);
      //CHANNEL_ERROR
      //TIMED OUT
    });
  return () => {
    supabase.removeAllChannels();
  };
}

export function subscribeToRequests(callback, room, statusCallback = () => {}) {
  //TODO: error handling
  supabase
    .channel("schema-db-changes-requests")
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
    .on(
      "postgres_changes",
      {
        event: "UPDATE",
        schema: "public",
        table: "mmd_queue_room",
        filter: `name=eq.${room}`,
      },
      (payload) => callback(payload)
    )
    .subscribe((status) => {
      //console.log("subscribe", status);
      statusCallback(status);
      //CHANNEL_ERROR
      //TIMED OUT
    });
  return () => {
    supabase.removeAllChannels();
  };
}
