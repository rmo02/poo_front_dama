import { useState } from 'react'
import { Edit, Trash2, Eye, Plus  } from 'lucide-react'
import { Button } from "@/components/ui/button"

import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"

import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger, DialogFooter } from "@/components/ui/dialog"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"

import { toast, ToastContainer } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'

import React from 'react'
import Header from '@/components/Header'

export default function AdminPanel() {
  const [activeTab, setActiveTab] = useState('tournaments')
  const [tournaments, setTournaments] = useState([
    { id: 1, name: "Global Chess Masters", date: "2023-08-15", location: "New York, USA", participants: 128, prize: "$100,000" },
    { id: 2, name: "European Chess Championship", date: "2023-09-05", location: "Paris, France", participants: 256, prize: "€75,000" },
  ])
  const [news, setNews] = useState([
    { id: 1, title: "Grandmaster Sarah Johnson Wins International Championship", content: "In a stunning display of skill and strategy, Sarah Johnson clinched the title...", date: "2023-06-15" },
    { id: 2, title: "Young Prodigy Makes Waves in Junior Tournament", content: "12-year-old Alex Chen has become the talk of the chess world after an impressive performance...", date: "2023-06-10" },
  ])
  const [selectedTournament, setSelectedTournament] = useState(null)
  const [selectedNews, setSelectedNews] = useState(null)
  const [isTournamentModalOpen, setIsTournamentModalOpen] = useState(false)
  const [isNewsModalOpen, setIsNewsModalOpen] = useState(false)
  const [isParticipantsModalOpen, setIsParticipantsModalOpen] = useState(false)
  const [participants, setParticipants] = useState([
    { id: 1, name: "John Doe", email: "john@example.com", rating: 2200, score: 0 },
    { id: 2, name: "Jane Smith", email: "jane@example.com", rating: 2300, score: 0 },
  ])

  const handleCreateTournament = (e) => {
    e.preventDefault()
    const formData = new FormData(e.target)
    const newTournament = {
      id: tournaments.length + 1,
      name: formData.get('name'),
      date: formData.get('date'),
      location: formData.get('location'),
      participants: parseInt(formData.get('participants')),
      prize: formData.get('prize'),
    }
    setTournaments([...tournaments, newTournament])
    setIsTournamentModalOpen(false)
    toast.success('Tournament created successfully!')
  }

  const handleEditTournament = (e) => {
    e.preventDefault()
    const formData = new FormData(e.target)
    const updatedTournament = {
      ...selectedTournament,
      name: formData.get('name'),
      date: formData.get('date'),
      location: formData.get('location'),
      participants: parseInt(formData.get('participants')),
      prize: formData.get('prize'),
    }
    setTournaments(tournaments.map(t => t.id === updatedTournament.id ? updatedTournament : t))
    setIsTournamentModalOpen(false)
    setSelectedTournament(null)
    toast.success('Tournament updated successfully!')
  }

  const handleDeleteTournament = (id) => {
    setTournaments(tournaments.filter(t => t.id !== id))
    toast.success('Tournament deleted successfully!')
  }

  const handleCreateNews = (e) => {
    e.preventDefault()
    const formData = new FormData(e.target)
    const newNews = {
      id: news.length + 1,
      title: formData.get('title'),
      content: formData.get('content'),
      date: new Date().toISOString().split('T')[0],
    }
    setNews([...news, newNews])
    setIsNewsModalOpen(false)
    toast.success('News article created successfully!')
  }

  const handleEditNews = (e) => {
    e.preventDefault()
    const formData = new FormData(e.target)
    const updatedNews = {
      ...selectedNews,
      title: formData.get('title'),
      content: formData.get('content'),
    }
    setNews(news.map(n => n.id === updatedNews.id ? updatedNews : n))
    setIsNewsModalOpen(false)
    setSelectedNews(null)
    toast.success('News article updated successfully!')
  }

  const handleDeleteNews = (id) => {
    setNews(news.filter(n => n.id !== id))
    toast.success('News article deleted successfully!')
  }

  const handleUpdateParticipantScore = (id, score) => {
    setParticipants(participants.map(p => p.id === id ? { ...p, score: parseInt(score) } : p))
    toast.success('Participant score updated successfully!')
  }


  return (
    <div className="min-h-screen bg-gray-50">
        <Header />

        <main className="container mx-auto px-4 py-8">
        <Tabs value={activeTab} onValueChange={setActiveTab}>
          <TabsList>
            <TabsTrigger value="tournaments">Torneios</TabsTrigger>
            <TabsTrigger value="news">Noticias</TabsTrigger>
          </TabsList>
          <TabsContent value="tournaments">
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-2xl font-bold">Torneios</h2>
              <Button onClick={() => setIsTournamentModalOpen(true)}>
                <Plus className="mr-2 h-4 w-4" /> Criar Torneio
              </Button>
            </div>
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Nome</TableHead>
                  <TableHead>Data</TableHead>
                  <TableHead>Localização</TableHead>
                  <TableHead>participantes</TableHead>
                  <TableHead>Premio</TableHead>
                  <TableHead>Ações</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {tournaments.map((tournament) => (
                  <TableRow key={tournament.id}>
                    <TableCell>{tournament.name}</TableCell>
                    <TableCell>{tournament.date}</TableCell>
                    <TableCell>{tournament.location}</TableCell>
                    <TableCell>{tournament.participants}</TableCell>
                    <TableCell>{tournament.prize}</TableCell>
                    <TableCell>
                      <div className="flex space-x-2">
                        <Button variant="outline" size="icon" onClick={() => {
                          setSelectedTournament(tournament)
                          setIsTournamentModalOpen(true)
                        }}>
                          <Edit className="h-4 w-4" />
                        </Button>
                        <Button variant="outline" size="icon" onClick={() => handleDeleteTournament(tournament.id)}>
                          <Trash2 className="h-4 w-4" />
                        </Button>
                        <Button variant="outline" size="icon" onClick={() => {
                          setSelectedTournament(tournament)
                          setIsParticipantsModalOpen(true)
                        }}>
                          <Eye className="h-4 w-4" />
                        </Button>
                      </div>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </TabsContent>
          <TabsContent value="news">
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-2xl font-bold">Noticias</h2>
              <Button onClick={() => setIsNewsModalOpen(true)}>
                <Plus className="mr-2 h-4 w-4" /> Criar Noticia
              </Button>
            </div>
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Titulo</TableHead>
                  <TableHead>Data</TableHead>
                  <TableHead>Ações</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {news.map((article) => (
                  <TableRow key={article.id}>
                    <TableCell>{article.title}</TableCell>
                    <TableCell>{article.date}</TableCell>
                    <TableCell>
                      <div className="flex space-x-2">
                        <Button variant="outline" size="icon" onClick={() => {
                          setSelectedNews(article)
                          setIsNewsModalOpen(true)
                        }}>
                          <Edit className="h-4 w-4" />
                        </Button>
                        <Button variant="outline" size="icon" onClick={() => handleDeleteNews(article.id)}>
                          <Trash2 className="h-4 w-4" />
                        </Button>
                        <Button variant="outline" size="icon" onClick={() => {
                          setSelectedNews(article)
                          setIsNewsModalOpen(true)
                        }}>
                          <Eye className="h-4 w-4" />
                        </Button>
                      </div>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </TabsContent>
        </Tabs>
      </main>

      <Dialog open={isTournamentModalOpen} onOpenChange={setIsTournamentModalOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>{selectedTournament ? 'Edit Tournament' : 'Create Tournament'}</DialogTitle>
          </DialogHeader>
          <form onSubmit={selectedTournament ? handleEditTournament : handleCreateTournament}>
            <div className="space-y-4">
              <div>
                <Label htmlFor="name">Nome</Label>
                <Input id="name" name="name" defaultValue={selectedTournament?.name} required />
              </div>
              <div>
                <Label htmlFor="date">Data</Label>
                <Input id="date" name="date" type="date" defaultValue={selectedTournament?.date} required />
              </div>
              <div>
                <Label htmlFor="location">Localização</Label>
                <Input id="location" name="location" defaultValue={selectedTournament?.location} required />
              </div>
              <div>
                <Label htmlFor="participants">nº Participantes</Label>
                <Input id="participants" name="participants" type="number" defaultValue={selectedTournament?.participants} required />
              </div>
              <div>
                <Label htmlFor="prize">Prêmio</Label>
                <Input id="prize" name="prize" defaultValue={selectedTournament?.prize} required />
              </div>
            </div>
            <DialogFooter className="mt-6">
              <Button type="submit">{selectedTournament ? 'Update' : 'Create'}</Button>
            </DialogFooter>
          </form>
        </DialogContent>
      </Dialog>

      <Dialog open={isNewsModalOpen} onOpenChange={setIsNewsModalOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>{selectedNews ? 'Edit News Article' : 'Create News Article'}</DialogTitle>
          </DialogHeader>
          <form onSubmit={selectedNews ? handleEditNews : handleCreateNews}>
            <div className="space-y-4">
              <div>
                <Label htmlFor="title">Título</Label>
                <Input id="title" name="title" defaultValue={selectedNews?.title} required />
              </div>
              <div>
                <Label htmlFor="content">Conteúdo</Label>
                <Textarea id="content" name="content" defaultValue={selectedNews?.content} required />
              </div>
            </div>
            <DialogFooter className="mt-6">
              <Button type="submit">{selectedNews ? 'Update' : 'Create'}</Button>
            </DialogFooter>
          </form>
        </DialogContent>
      </Dialog>

      <Dialog open={isParticipantsModalOpen} onOpenChange={setIsParticipantsModalOpen}>
        <DialogContent className="max-w-3xl">
          <DialogHeader>
            <DialogTitle>Participantes - {selectedTournament?.name}</DialogTitle>
          </DialogHeader>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Nome</TableHead>
                <TableHead>Email</TableHead>
                <TableHead>Apelido</TableHead>
                <TableHead>Pontuação</TableHead>
                <TableHead>Definir pontuação</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {participants.map((participant) => (
                <TableRow key={participant.id}>
                  <TableCell>{participant.name}</TableCell>
                  <TableCell>{participant.email}</TableCell>
                  <TableCell>{participant.rating}</TableCell>
                  <TableCell>{participant.score}</TableCell>
                  <TableCell>
                    <div className="flex items-center space-x-2">
                      <Input
                        type="number"
                        className="w-16"
                        defaultValue={participant.score}
                        onChange={(e) => handleUpdateParticipantScore(participant.id, e.target.value)}
                      />
                      <Button size="sm" onClick={() => handleUpdateParticipantScore(participant.id, participant.score)}>
                        Update
                      </Button>
                    </div>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </DialogContent>
      </Dialog>

      <ToastContainer />

    </div>
  )
}
