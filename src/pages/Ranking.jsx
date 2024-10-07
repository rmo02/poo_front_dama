import Header from '@/components/Header'
import React, { useEffect, useState } from 'react'

import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { api } from '@/api'

export default function Ranking() {
  const [rankings, setRankings] = useState([])


  const getRankings = async() => {
    try {
      const res = await api.get("/v1/api/ranking")
      setRankings(res.data)
    } catch (error) {
      console.log(error)
    }
  }


  useEffect(() => {
    getRankings()
  }, [])
  


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
              </TableRow>
            </TableHeader>
            <TableBody>
            {rankings.map((player, index) => (
                <TableRow key={index}>
                  <TableCell className="font-medium">{index + 1}º</TableCell>
                  <TableCell>{player.nome}</TableCell>
                  <TableCell>{player.apelido}</TableCell>
                  <TableCell className="text-right">{player.pontuacaoTotal}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>
      </main>
    </div>
  )
}
