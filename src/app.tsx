import { Navigate, Route, Routes } from "react-router-dom";
import { NavMenu } from "./components/header";
import { AttendeePage } from "./pages/attendees-page";
import { EventsPage } from "./pages/events-page";

export function App() {
  return (
    <div className="flex flex-col px-20 py-5 justify-center  w-full gap-20">
      <NavMenu />
      <Routes>
        <Route path="/" element={<Navigate to="/eventos" replace />} />
        <Route path="/eventos" element={<EventsPage />} />
        <Route path="/participantes" element={<AttendeePage />} />
      </Routes>
    </div>
  );
}
