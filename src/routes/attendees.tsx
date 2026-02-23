import { createFileRoute } from "@tanstack/react-router";
import { AttendeePage } from "../pages/attendees-page";

export const Route = createFileRoute("/attendees")({
  component: AttendeePage,
});
