import { Outlet, createRootRoute } from "@tanstack/react-router";
import { Header } from "../components/header";

export const Route = createRootRoute({
  component: RootComponent,
});

function RootComponent() {
  return (
    <div className="max-w-304 mx-auto py-5 flex flex-col gap-5">
      {/* Menu */}
      <Header />
      <Outlet />
    </div>
  );
}
