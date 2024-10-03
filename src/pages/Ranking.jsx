import Footer from '@/components/Footer'
import Header from '@/components/Header'
import React from 'react'

import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { ChevronUp, ChevronDown } from 'lucide-react'

export default function Ranking() {

    const rankings = [
        { rank: 1, name: "Magnus Carlsen", apelido: "Norway", rating: 2847, change: 0 },
        { rank: 2, name: "Ding Liren", apelido: "China", rating: 2811, change: 2 },
        { rank: 3, name: "Ian Nepomniachtchi", apelido: "Russia", rating: 2795, change: -1 },
        { rank: 4, name: "Alireza Firouzja", apelido: "France", rating: 2785, change: 1 },
        { rank: 5, name: "Fabiano Caruana", apelido: "USA", rating: 2780, change: -2 },
        { rank: 6, name: "Wesley So", apelido: "USA", rating: 2774, change: 0 },
        { rank: 7, name: "Hikaru Nakamura", apelido: "USA", rating: 2768, change: 3 },
        { rank: 8, name: "Anish Giri", apelido: "Netherlands", rating: 2764, change: -1 },
        { rank: 9, name: "Levon Aronian", apelido: "USA", rating: 2759, change: 0 },
        { rank: 10, name: "Maxime Vachier-Lagrave", apelido: "France", rating: 2757, change: -2 },
    ]


  return (
    <div className="min-h-screen bg-gray-50">
        <Header />

        <main className="container mx-auto px-4 py-8">
        <h1 className="text-4xl font-bold text-gray-900 mb-8">Classificação Geral</h1>
        
        <div className="bg-white rounded-lg shadow-md overflow-hidden">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead className="w-[100px]">Posição</TableHead>
                <TableHead>Nome</TableHead>
                <TableHead>Apelido</TableHead>
                <TableHead className="text-right">Pontuação</TableHead>
                <TableHead className="text-right">Change</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {rankings.map((player) => (
                <TableRow key={player.rank}>
                  <TableCell className="font-medium">{player.rank}</TableCell>
                  <TableCell>{player.name}</TableCell>
                  <TableCell>{player.apelido}</TableCell>
                  <TableCell className="text-right">{player.rating}</TableCell>
                  <TableCell className="text-right">
                    <span className={`flex items-center justify-end ${player.change > 0 ? 'text-green-600' : player.change < 0 ? 'text-red-600' : 'text-gray-600'}`}>
                      {player.change > 0 ? <ChevronUp className="h-4 w-4 mr-1" /> : player.change < 0 ? <ChevronDown className="h-4 w-4 mr-1" /> : null}
                      {Math.abs(player.change)}
                    </span>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>
      </main>

        <Footer />
    </div>
  )
}
