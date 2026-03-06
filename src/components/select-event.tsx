import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useEffect, useState } from "react";
import type { Event } from "./types/event"; // ou tipo definido

interface SelectEventProps {
  value: string | undefined;
  onValueChange: (value: string) => void;
}

export function SelectEvent({ value, onValueChange }: SelectEventProps) {
  // Carrega eventos do localStorage
  const [events, setEvents] = useState<Event[]>([]);
  useEffect(() => {
    const saved = localStorage.getItem("eventsList");
    if (saved) {
      setEvents(JSON.parse(saved));
    }
  }, []);

  return (
    <Select value={value} onValueChange={onValueChange}>
      <SelectTrigger className="w-full border-white/10">
        <SelectValue placeholder="Selecione o evento" />
      </SelectTrigger>
      <SelectContent className="bg-foreground text-zinc-50 border-white/10">
        <SelectGroup>
          <SelectLabel>Eventos</SelectLabel>
          {events.map((item) => (
            <SelectItem key={item.id} value={item.events}>
              {item.events}
            </SelectItem>
          ))}
        </SelectGroup>
      </SelectContent>
    </Select>
  );
}
