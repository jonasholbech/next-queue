"use client";
import { useState } from "react";
import { insertRequest } from "@/utils/requests";
import { addID, getUserName } from "@/utils/storage";

function Form({ slug }) {
  const [open, setOpen] = useState(false);
  async function addRequest(e) {
    e.preventDefault();
    const formData = new FormData(e.target);
    localStorage.setItem("username", formData.get("name"));
    const response = await insertRequest({
      name: formData.get("name"),
      initials: formData.get("initials"),
      problem: formData.get("problem"),
      description: formData.get("description"),
      room: formData.get("slug"),
    });
    if (response) {
      addID(response[0].id);
      setOpen(false);
    }
  }

  if (!open) {
    return (
      <button
        className="outline"
        onClick={() => {
          setOpen(true);
          console.log("clicked");
        }}
      >
        Tilføj problem
      </button>
    );
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
          {getUserName() ? (
            <>
              <p>Hej {getUserName()}</p>
              <input type={"hidden"} name="name" value={getUserName()} />
            </>
          ) : (
            <label>
              Navn
              <input type={"text"} name="name" required defaultValue={""} />
            </label>
          )}

          <label>
            KEA mail
            <input
              type="text"
              name="initials"
              placeholder="Hvis vi skal ringe dig op"
            />
          </label>
          <label>
            Problem
            <input type="text" name="problem" required />
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
