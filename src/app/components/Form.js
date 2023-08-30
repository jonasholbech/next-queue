"use client";
import { insertRequest } from "@/utils/requests";
function Form({ slug }) {
  async function addRequest(e) {
    e.preventDefault();
    console.log(e);
    insertRequest({ name:e.target., problem, description, room })
  }
  return (
    <form onSubmit={addRequest}>
      <label>
        Navn
        <input type="text" name="name" defaultValue={"TDB"} disabled={"TBD"} />
      </label>
      <label>
        Problem
        <input type="text" name="problem" />
      </label>
      <input type="hidden" name="slug" value={slug} />
      <label>
        Beskrivelse
        <textarea name="description"></textarea>
      </label>
      <button>Tilføj</button>
    </form>
  );
}

export default Form;
