export function addID(id) {
  let ids = JSON.parse(sessionStorage.getItem("ids")) || [];
  sessionStorage.setItem("ids", JSON.stringify(ids.concat(id)));
}
function getIDs() {
  return JSON.parse(sessionStorage.getItem("ids")) || [];
}
export function canDelete(id) {
  if (localStorage.getItem("queue_role")) {
    return true;
  }
  return getIDs().includes(id);
}
