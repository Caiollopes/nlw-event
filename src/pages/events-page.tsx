import {
  Search,
  MoreHorizontal,
  ChevronsLeft,
  ChevronLeft,
  ChevronsRight,
  ChevronRight,
  Plus,
} from "lucide-react";
import { IconButton } from "../components/icon-button";
import { Table } from "../components/table/table";
import { TableHeader } from "../components/table/table-header";
import { TableCheck } from "../components/table/table-check";
import { TableData } from "../components/table/table-data";
import { TableRow } from "../components/table/table-row";
import { useState } from "react";

import { formatDistanceToNow } from "date-fns";
import { ptBR } from "date-fns/locale";
import { Button } from "@/components/ui/button";
import { Modal } from "@/components/base/modal";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import type { Event } from "@/components/types/event";

export function EventsPage() {
  const [page, setPage] = useState(1);
  const [open, setOpen] = useState(false);

  const [eventsList, setEventsList] = useState<Event[]>(() => {
    const eventsOnStorage = localStorage.getItem("eventsList");
    if (eventsOnStorage) {
      return JSON.parse(eventsOnStorage);
    }

    return [];
  });

  const [newEventName, setNewEventName] = useState("");
  const [newEventLocal, setNewEventLocal] = useState("");

  const totalPages = Math.ceil(eventsList.length / 10);

  function goToFirstPage() {
    setPage(1);
  }

  function goToPreviousPage() {
    setPage(page - 1);
  }

  function goToNextPage() {
    if (page >= totalPages) return;
    setPage(page + 1);
  }

  function goToLastPage() {
    setPage(totalPages);
  }

  function handleAddEvent() {
    const newEvent = {
      id: eventsList.length + 1, // pode usar um id incremental
      events: newEventName,
      local: newEventLocal,
      createdAt: new Date(),
    };

    const updatedList = [newEvent, ...eventsList];
    setEventsList(updatedList);

    // SALVA NO LOCAL STORAGE
    localStorage.setItem("eventsList", JSON.stringify(updatedList));

    setOpen(false); // fecha o modal
    setNewEventName(""); // limpa input
    setNewEventLocal(""); // limpa input
  }

  return (
    <div className="flex flex-col gap-4">
      <div className="flex gap-3 items-center">
        <h1 className="text-2xl font-bold">Eventos</h1>
        <div className="px-3 py-1.5 w-72 border outline-none border-white/10 rounded-lg text-sm flex items-center gap-3">
          <Search className="size-4 text-white/10" />
          <input
            className="bg-transparent flex-1 outline-none h-auto border-0 p-0 focus:outline-none focus:ring-0 placeholder-white/10 "
            type="text"
            placeholder="Buscar evento..."
          />
        </div>
        <Button className="ml-auto group" onClick={() => setOpen(true)}>
          <Plus className="group-hover:rotate-90 transition-transform duration-300" />
          Novo evento
        </Button>
      </div>
      <Modal
        open={open}
        onOpenChange={setOpen}
        title="Eventos"
        description="Cadastre um evento!"
        footer={
          <>
            <Button type="submit" onClick={handleAddEvent}>
              Adicionar
            </Button>
          </>
        }
      >
        <Label>Nome do evento</Label>
        <Input
          placeholder="Digite o nome do evento"
          className="border-white/10"
          value={newEventName}
          onChange={(e) => setNewEventName(e.target.value)}
        />

        <Label>Local do evento</Label>
        <Input
          placeholder="Digite o local do evento"
          className="border-white/10"
          value={newEventLocal}
          onChange={(e) => setNewEventLocal(e.target.value)}
        />
      </Modal>

      <Table>
        <thead>
          <tr className="border-b border-white/10">
            <TableHeader style={{ width: 48 }}>
              <TableCheck />
            </TableHeader>
            <TableHeader>Código</TableHeader>
            <TableHeader>Eventos</TableHeader>
            <TableHeader>Data de criação</TableHeader>
            <TableHeader>Local do evento</TableHeader>
            <TableHeader style={{ width: 64 }}></TableHeader>
          </tr>
        </thead>
        <tbody>
          {eventsList.slice((page - 1) * 10, page * 10).map((event) => (
            <TableRow key={event.id}>
              <TableData>
                <TableCheck />
              </TableData>
              <TableData>{event.id}</TableData>
              <TableData>
                <span className="font-semibold text-white">{event.events}</span>
              </TableData>
              <TableData>
                {formatDistanceToNow(new Date(event.createdAt), {
                  locale: ptBR,
                  addSuffix: true,
                })}
              </TableData>
              <TableData>
                <span className="font-semibold text-white">{event.local}</span>
              </TableData>
              <TableData>
                <IconButton tone="dark">
                  <MoreHorizontal className="size-4" />
                </IconButton>
              </TableData>
            </TableRow>
          ))}
        </tbody>
        <tfoot>
          <tr>
            <TableData colSpan={3}>
              Mostrando {eventsList.length} de {eventsList.length} participantes
            </TableData>
            <TableData className="text-right" colSpan={3}>
              <div className="inline-flex items-center gap-8">
                Página {page} de {totalPages}
                <div className="flex gap-1.5">
                  <IconButton onClick={goToFirstPage} disabled={page === 1}>
                    <ChevronsLeft className="size-4" />
                  </IconButton>
                  <IconButton onClick={goToPreviousPage} disabled={page === 1}>
                    <ChevronLeft className="size-4" />
                  </IconButton>
                  <IconButton
                    onClick={goToNextPage}
                    disabled={page === totalPages}
                  >
                    <ChevronRight className="size-4" />
                  </IconButton>
                  <IconButton
                    onClick={goToLastPage}
                    disabled={page === totalPages}
                  >
                    <ChevronsRight className="size-4" />
                  </IconButton>
                </div>
              </div>
            </TableData>
          </tr>
        </tfoot>
      </Table>
    </div>
  );
}
