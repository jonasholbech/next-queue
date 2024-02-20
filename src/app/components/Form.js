"use client";
import { useState, useEffect } from "react";
import { insertRequest } from "@/utils/requests";
import { addID, getUserName } from "@/utils/storage";
import AdminRoomMenu from "../wrappers/AdminRoomMenu";
import { isAdmin } from "@/utils/storage";
import { subscribeToRoom, getRoomState } from "@/utils/requests";
import { useVisibilityChange } from "@uidotdev/usehooks";
function Form({ slug }) {
  const [open, setOpen] = useState(false);
  const [settings, setSettings] = useState({ open: true, allow_teams: false });
  const documentVisible = useVisibilityChange();

  useEffect(() => {
    let closeCallback = () => {};
    if (documentVisible) {
      closeCallback = subscribeToRoom(dbUpdate, slug);
      (async () => {
        const { data, error } = await getRoomState(slug);
        setSettings(data);
      })();
    } else {
      closeCallback();
    }
    return closeCallback;
  }, [documentVisible, slug]);

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

  function dbUpdate(payload) {
    setSettings(payload.new);
  }
  if (!open) {
    return (
      <>
        {isAdmin() && <AdminRoomMenu slug={slug} settings={settings} />}

        <button
          className="outline"
          disabled={!settings.open}
          onClick={() => {
            setOpen(true);
          }}
        >
          {settings.open ? "Tilføj problem" : "Køen er lukket"}
        </button>
      </>
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
              <p>
                <strong>Hej {getUserName()}</strong>
              </p>
              <input type={"hidden"} name="name" value={getUserName()} />
            </>
          ) : (
            <label>
              Navn
              <input type={"text"} name="name" required defaultValue={""} />
            </label>
          )}

          {settings.allow_teams && (
            <details>
              <summary>Vil du ringes op?</summary>
              <label>
                KEA mail
                <input
                  type="text"
                  name="initials"
                  placeholder="Hvis vi skal ringe dig op"
                />
              </label>
            </details>
          )}

          <label>
            Problem
            <input type="text" name="problem" required />
          </label>
          <input type="hidden" name="slug" value={slug} />
          <label>
            Beskrivelse
            <textarea
              placeholder="Eller skriv hvor i sidder hvis vi skal finde jer"
              name="description"
            ></textarea>
          </label>
          <button>Tilføj</button>
        </form>
      </article>
    </dialog>
  );
}

export default Form;
