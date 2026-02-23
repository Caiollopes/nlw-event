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
import { SelectEvent } from "@/components/select-event";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import type { Attendee } from "@/components/types/attendee";

export function AttendeePage() {
  const [page, setPage] = useState(1);
  const [open, setOpen] = useState(false);

  // 1️⃣ Carrega participantes do localStorage
  const [attendeesList, setAttendeesList] = useState<Attendee[]>(() => {
    const saved = localStorage.getItem("attendeesList");
    return saved ? JSON.parse(saved) : [];
  });

  const [newAtendeeName, setNewAtendeeName] = useState("");
  const [newSelectEvent, setNewSelectEvent] = useState("");

  const totalPages = Math.ceil(attendeesList.length / 10);

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

  // 2️⃣ Adicionar participante
  const handleAddAttendee = () => {
    if (!newAtendeeName || !newSelectEvent) return;

    const newAttendee: Attendee = {
      id: attendeesList.length + 1,
      attendees: newAtendeeName,
      event: newSelectEvent, // agora ok
      email: "",
      createdAt: new Date(),
      checkedInAt: null,
    };

    const updatedList = [newAttendee, ...attendeesList];
    setAttendeesList(updatedList);

    // 3️⃣ Salva no localStorage
    localStorage.setItem("attendeesList", JSON.stringify(updatedList));

    // Limpa inputs e fecha modal
    setNewAtendeeName("");
    setNewSelectEvent("");
    setOpen(false);
  };

  return (
    <div className="flex flex-col gap-4">
      <div className="flex gap-3 items-center">
        <h1 className="text-2xl font-bold">Participantes</h1>
        <div className="px-3 py-1.5 w-72 border outline-none border-white/10 rounded-lg text-sm flex items-center gap-3">
          <Search className="size-4 text-white/10" />
          <input
            className="bg-transparent flex-1 outline-none h-auto border-0 p-0 focus:outline-none focus:ring-0 placeholder-white/10 "
            type="text"
            placeholder="Buscar participante..."
          />
        </div>
        <Button className="ml-auto group" onClick={() => setOpen(true)}>
          <Plus className="group-hover:rotate-90 transition-transform duration-300" />
          Novo participante
        </Button>

        <Modal
          open={open}
          onOpenChange={setOpen}
          title="Cadastro"
          description="Cadastre um partipante ao evento escolhido!"
          footer={
            <>
              <Button type="submit" onClick={handleAddAttendee}>
                Adicionar
              </Button>
            </>
          }
        >
          <Label>Nome</Label>
          <Input
            placeholder="Digite o nome"
            className="border-white/10"
            value={newAtendeeName}
            onChange={(e) => setNewAtendeeName(e.target.value)}
          />

          <Label>Evento</Label>
          <SelectEvent
            value={newSelectEvent} // estado do select
            onValueChange={(val) => setNewSelectEvent(val)} // atualiza o estado
          />
        </Modal>
      </div>

      <Table>
        <thead>
          <tr className="border-b border-white/10">
            <TableHeader style={{ width: 48 }}>
              <TableCheck />
            </TableHeader>
            <TableHeader>Código</TableHeader>
            <TableHeader>Participantes</TableHeader>
            <TableHeader>Data de incrição</TableHeader>
            <TableHeader>Evento</TableHeader>
            <TableHeader style={{ width: 64 }}></TableHeader>
          </tr>
        </thead>
        <tbody>
          {attendeesList.slice((page - 1) * 10, page * 10).map((attendee) => (
            <TableRow key={attendee.id}>
              <TableData>
                <TableCheck />
              </TableData>
              <TableData>{attendee.id}</TableData>
              <TableData>
                <div className="flex flex-col gap-1">
                  <span className="font-semibold text-white">
                    {attendee.attendees}
                  </span>
                  <span>{attendee.email.toLocaleLowerCase()}</span>
                </div>
              </TableData>
              <TableData>
                {formatDistanceToNow(new Date(attendee.createdAt), {
                  locale: ptBR,
                  addSuffix: true,
                })}
              </TableData>
              <TableData>{attendee.event || "-"}</TableData>
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
              Mostrando {attendeesList.length} de {attendeesList.length}{" "}
              participantes
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
