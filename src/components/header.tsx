import { Button } from "@base-ui/react";
import nlwUniteIcon from "../assets/nlw-unite-icon.svg";
import { useLocation, useNavigate } from "react-router-dom";

export function NavMenu() {
  const navigate = useNavigate();
  const location = useLocation();

  function isActive(path: string) {
    return location.pathname === path;
  }
  return (
    <header className="flex items-center gap-5 py-2">
      <img src={nlwUniteIcon} alt="NLW Unite" />

      <nav className="flex items-center gap-5">
        <Button
          onClick={() => navigate("/eventos")}
          className={
            isActive("/eventos")
              ? "text-primary"
              : "hover:text-muted/80 transition"
          }
        >
          Eventos
        </Button>
        <Button
          onClick={() => navigate("/participantes")}
          className={
            isActive("/participantes")
              ? "text-primary"
              : "hover:text-muted/80 transition"
          }
        >
          Participantes
        </Button>
      </nav>
    </header>
  );
}
