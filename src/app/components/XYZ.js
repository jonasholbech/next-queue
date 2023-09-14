"use client";

import { setUser, setAdmin, getUserName } from "@/utils/storage";

function XYZ() {
  const submit = (e) => {
    e.preventDefault();
    if (typeof window !== "undefined") {
      const formData = new FormData(e.target);
      setUser(formData.get("name"));
      setAdmin();

      window.location.href = "/";
    }
  };
  return (
    <form onSubmit={submit}>
      <input
        type="text"
        name="name"
        placeholder="Navn"
        defaultValue={getUserName()}
      />
      <button>Gem</button>
    </form>
  );
}

export default XYZ;
