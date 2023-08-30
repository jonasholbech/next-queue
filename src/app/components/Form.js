"use client";
import { useState } from "react";
import { insertRequest } from "@/utils/requests";
function Form({ slug }) {
  const [open, setOpen] = useState(true);
  async function addRequest(e) {
    e.preventDefault();
    const formData = new FormData(e.target);
    console.log(formData);
    localStorage.setItem("username", formData.get("name"));
    const response = await insertRequest({
      name: formData.get("name"),
      problem: formData.get("problem"),
      description: formData.get("description"),
      room: formData.get("slug"),
    });
    console.log(response);
    if (response) {
      setOpen(false);
    }
  }
  if (!open) {
    return (
      <button className="outline" onClick={() => setOpen(true)}>
        Tilføj problem
      </button>
    );
  }
  function getUser() {
    return localStorage.getItem("username") || "";
  }
  return (
    <dialog open={open}>
      <article>
        <header>
          <a
            href="#close"
            aria-label="Close"
            onClick={() => setOpen(false)}
            className="close"
          ></a>
          Tilføj Problem
        </header>
        <form onSubmit={addRequest}>
          {getUser() ? (
            <>
              <p>Hej {getUser()}</p>
              <input type={"hidden"} name="name" value={getUser()} />
            </>
          ) : (
            <label>
              Navn
              <input type={"text"} name="name" defaultValue={""} />
            </label>
          )}

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
      </article>
    </dialog>
  );
}

export default Form;
