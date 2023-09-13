export function addID(id) {
  let ids = JSON.parse(localStorage.getItem("ids")) || [];
  localStorage.setItem("ids", JSON.stringify(ids.concat(id)));
}
function getIDs() {
  return JSON.parse(localStorage.getItem("ids")) || [];
}
export function getUserName() {
  return localStorage.getItem("username") || "";
}
export function isAdmin() {
  if (localStorage.getItem("queue_role")) {
    return true;
  }
  return false;
}
function isOwnPost(id) {
  return getIDs().includes(id);
}
export function canDelete(id) {
  if (isAdmin()) {
    return true;
  }
  return isOwnPost(id);
}
