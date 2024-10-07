import Header from "@/components/Header";
import React, { useEffect } from "react";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { api } from "@/api";
import { useUser } from "@/context/UserContext";

export default function Tournaments() {
  const { user } = useUser()

  const [tournaments, setTournaments] = useState([])
  const [registrationOpen, setRegistrationOpen] = useState(false)
  const [selectedTournament, setSelectedTournament] = useState(null)

  const handleRegistration = async (idTorneio) => {
    const usuarioId = user?.usuario?.id;
    
    try {
      const res = await api.post("/v1/api/inscricao", {
        usuarioId: usuarioId,
        torneioId: idTorneio,
        pontos: 0,
      });
      
      toast.success(`Confirmado!! ${user?.usuario?.nome} registrado no torneio!`, {
        position: "top-right",
        autoClose: 3000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
      });
      
      setRegistrationOpen(false);
    } catch (error) {
      console.error("Erro ao registrar no torneio", error);
      toast.error("Falha ao registrar no torneio. Tente novamente.", {
        position: "top-right",
        autoClose: 3000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
      });
    }
  };

  const getTournament = async() => {
    try {
      const res = await api.get("/v1/api/torneio")
      setTournaments(res.data)
    } catch (error) {
      console.log(error)
    }
  }


  useEffect(() => {
    getTournament()
  }, [])
  

  return (
    <div className="min-h-screen bg-gray-50">
      <Header />

      <main className="container mx-auto px-4 py-8">
        <h1 className="text-4xl font-bold text-gray-900 mb-8">
          Torneios
        </h1>

        <div className="overflow-x-auto">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Name</TableHead>
                <TableHead>Data</TableHead>
                <TableHead>Local</TableHead>
                <TableHead>Participantes</TableHead>
                <TableHead>Prêmio</TableHead>
                <TableHead>Action</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {tournaments.map((tournament) => (
                <TableRow key={tournament.id}>
                  <TableCell className="font-medium">
                    {tournament.nome}
                  </TableCell>
                  <TableCell>{tournament.data
                        ? new Date(tournament.data).toISOString().split("T")[0]
                        : ""}</TableCell>
                  <TableCell>{tournament.local}</TableCell>
                  <TableCell>{tournament.quantidadeParticipantes}</TableCell>
                  <TableCell>{tournament.premio}</TableCell>
                  <TableCell>
                    <Button
                      size="sm"
                      onClick={() => {
                        setSelectedTournament(tournament);
                        setRegistrationOpen(true);
                      }}
                    >
                      Register
                    </Button>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>
      </main>

      <Dialog open={registrationOpen} onOpenChange={setRegistrationOpen}>
        <DialogContent className="sm:max-w-[425px]">
          <DialogHeader>
            <DialogTitle>Registre-se em {selectedTournament?.nome}</DialogTitle>
          </DialogHeader>
          <form 
            onSubmit={(e) => {
              e.preventDefault();
              handleRegistration(selectedTournament?.id);
            }}
          className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="player-nome">Nome</Label>
              <Input 
              disabled
              defaultValue={user?.usuario?.nome}
              required />
            </div>
            <div className="space-y-2">
              <Label htmlFor="player-email">Email</Label>
              <Input 
              disabled
              defaultValue={user?.usuario?.email}
              required
              type="email"  />
            </div>
            <DialogFooter>
              <Button type="submit">Confirmar</Button>
            </DialogFooter>
          </form>
        </DialogContent>
      </Dialog>
      <ToastContainer />
    </div>
  );
}
