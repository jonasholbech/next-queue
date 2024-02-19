import ToggleSwitch from "../components/ToggleSwitch";
import { toggleRoomState } from "@/utils/requests";
export default function AdminRoomMenu({ slug, settings }) {
  return (
    <>
      <ToggleSwitch
        label="Åbent"
        initialValue={settings.open}
        callback={() => toggleRoomState(slug, "open", settings.open)}
      />
      <ToggleSwitch
        label="Tillad Teams"
        initialValue={settings.allow_teams}
        callback={() =>
          toggleRoomState(slug, "allow_teams", settings.allow_teams)
        }
      />
    </>
  );
}
