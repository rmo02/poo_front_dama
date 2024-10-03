import Footer from "@/components/Footer";
import Header from "@/components/Header";
import React from "react";

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

export default function Tournaments() {
  const tournaments = [
    {
      id: 1,
      name: "Global Chess Masters",
      date: "August 15-20, 2023",
      location: "New York, USA",
      participants: 128,
      prize: "$100,000",
      description:
        "The Global Chess Masters is one of the most prestigious tournaments in the chess world, featuring top grandmasters from around the globe competing for a substantial prize pool.",
    },
    {
      id: 2,
      name: "European Chess Championship",
      date: "September 5-12, 2023",
      location: "Paris, France",
      participants: 256,
      prize: "€75,000",
      description:
        "The European Chess Championship brings together the best players from across Europe in a battle for continental supremacy and qualification spots for the World Chess Championship cycle.",
    },
    {
      id: 3,
      name: "Asian Chess Open",
      date: "October 1-7, 2023",
      location: "Tokyo, Japan",
      participants: 200,
      prize: "¥10,000,000",
      description:
        "The Asian Chess Open is a major tournament featuring top players from Asian countries, as well as invited international grandmasters, showcasing the strength of Asian chess.",
    },
    {
      id: 4,
      name: "Junior World Chess Championship",
      date: "November 10-20, 2023",
      location: "Moscow, Russia",
      participants: 150,
      prize: "$50,000",
      description:
        "The Junior World Chess Championship is the premier event for young chess prodigies, featuring the world's best players under 20 years old competing for the prestigious junior world title.",
    },
    {
      id: 5,
      name: "Chess Olympiad",
      date: "December 1-15, 2023",
      location: "Madrid, Spain",
      participants: 3000,
      prize: "Medals",
      description:
        "The Chess Olympiad is a biennial chess tournament where national teams from all over the world compete. It's one of the most important events in the chess calendar, often called the 'Chess Olympics'.",
    },
    {
      id: 6,
      name: "Candidates Tournament",
      date: "January 5-25, 2024",
      location: "London, UK",
      participants: 8,
      prize: "$500,000",
      description:
        "The Candidates Tournament determines the challenger for the World Chess Championship. Eight of the world's top grandmasters compete in a double round-robin format for a chance to challenge the reigning World Champion.",
    },
  ];
  const [registrationOpen, setRegistrationOpen] = useState(false)
  const [selectedTournament, setSelectedTournament] = useState(null)

  const handleRegistration = (e) => {
    e.preventDefault()
    console.log('Registering for tournament:', selectedTournament?.name)
    setRegistrationOpen(false)
    toast.success(`Confirmado!! Registrado para ${selectedTournament?.name}!`, {
      position: "top-right",
      autoClose: 5000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
    })
  }

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
                <TableHead>Date</TableHead>
                <TableHead>Location</TableHead>
                <TableHead>Participants</TableHead>
                <TableHead>Prize</TableHead>
                <TableHead>Action</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {tournaments.map((tournament) => (
                <TableRow key={tournament.id}>
                  <TableCell className="font-medium">
                    {tournament.name}
                  </TableCell>
                  <TableCell>{tournament.date}</TableCell>
                  <TableCell>{tournament.location}</TableCell>
                  <TableCell>{tournament.participants}</TableCell>
                  <TableCell>{tournament.prize}</TableCell>
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
            <DialogTitle>Registre-se em {selectedTournament?.name}</DialogTitle>
          </DialogHeader>
          <form onSubmit={handleRegistration} className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="player-name">Nome</Label>
              <Input id="player-name" required />
            </div>
            <div className="space-y-2">
              <Label htmlFor="player-email">Email</Label>
              <Input id="player-email" type="email" required />
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
