import { useEffect, useState } from "react";
import { Edit, Trash2, Eye, Plus } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from "@/components/ui/dialog";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import React from "react";
import Header from "@/components/Header";
import { api } from "@/api";

export default function AdminPanel() {
  const [activeTab, setActiveTab] = useState("tournaments");
  const [tournaments, setTournaments] = useState([]);
  const [news, setNews] = useState([]);
  const [users, setUsers] = useState([]);
  const [selectedTournament, setSelectedTournament] = useState(null);
  const [selectedNews, setSelectedNews] = useState(null);
  const [selectedUser, setSelectedUser] = useState(null);
  const [isTournamentModalOpen, setIsTournamentModalOpen] = useState(false);
  const [isNewsModalOpen, setIsNewsModalOpen] = useState(false);
  const [isUserModalOpen, setIsUserModalOpen] = useState(false);
  const [isParticipantsModalOpen, setIsParticipantsModalOpen] = useState(false);
  const [participants, setParticipants] = useState([]);


  const handleCreateTournament = async (e) => {
    e.preventDefault();

    // Cria o objeto newTournament a partir dos dados do formulário
    const newTournament = {
      nome: e.target.nome.value,
      data: e.target.data.value,
      local: e.target.local.value,
      quantidadeParticipantes: parseInt(e.target.quantidadeParticipantes.value),
      premio: parseFloat(e.target.premio.value),
    };

    // Envia os dados do torneio criado para o backend como JSON
    try {
      const response = await api.post("/v1/api/torneio", newTournament);
      console.log(response.data);

      // Atualiza o estado local dos torneios
      setTournaments([...tournaments, newTournament]);

      // Fecha o modal
      setIsTournamentModalOpen(false);
      toast.success("Torneio criado com sucesso!");
    } catch (error) {
      console.error(error);
      toast.error("Erro ao criar torneio");
    }
  };


  const handleEditTournament = async (e) => {
    e.preventDefault();
    const updatedTournament = {
      ...selectedTournament,
      name: e.target.nome.value,
      date: e.target.data.value,
      location: e.target.local.value,
      quantidadeParticipantes: parseInt(e.target.quantidadeParticipantes.value),
      premio: e.target.premio.value,
    };

    // Atualiza o estado local dos torneios
    setTournaments(
      tournaments.map((t) =>
        t.id === updatedTournament.id ? updatedTournament : t
      )
    );

    // Envia os dados do torneio atualizado para o backend como JSON
    try {
      const response = await api.put(
        `/v1/api/torneio/${updatedTournament.id}`,
        updatedTournament
      );

      if (!response.ok) {
        throw new Error("Failed to update tournament");
      }

      // Fecha o modal e reseta o torneio selecionado
      setIsTournamentModalOpen(false);
      setSelectedTournament(null);
      toast.success("Tournament updated successfully!");
    } catch (error) {
      console.error(error);
      toast.error("Failed to update tournament");
    }
  };


  const handleDeleteTournament = async (id) => {
    try {
      await api.delete(`/v1/api/torneio/${id}`);
      toast.success("Torneio Deletado com sucesso!");
      setTournaments(tournaments.filter((t) => t.id !== id));
    } catch (error) {
      console.log(error);
      toast.error("Erro ao deletar torneio!");
    }
  };


  const handleCreateNews = async (e) => {
    e.preventDefault();

    const newNews = {
      titulo: e.target.titulo.value,
      imagem: e.target.imagem.value,
      conteudo: e.target.conteudo.value,
      autor: e.target.autor.value,
    };

    try {
      await api.post("/v1/api/noticia", newNews);
      setNews([...news, newNews]);
      setIsNewsModalOpen(false);
      toast.success("Artigo publicado");
    } catch (error) {
      console.error(error);
      toast.error("Falha ao criar artigo");
    }
  };


  const handleEditNews = async (e) => {
    e.preventDefault();

    const updatedNews = {
      ...selectedNews,
      titulo: e.target.titulo.value,
      conteudo: e.target.conteudo.value,
      imagem: e.target.imagem.value,
      autor: e.target.autor.value,
    };

    try {
      const response = await api.put(
        `/v1/api/noticia/${updatedNews.id}`,
        updatedNews
      );
      setNews(news.map((n) => (n.id === updatedNews.id ? response.data : n))); // Usa a resposta do servidor para atualizar a notícia
      setIsNewsModalOpen(false);
      setSelectedNews(null);
      toast.success("Notícia atualizada com sucesso!");
    } catch (error) {
      console.error(error);
      toast.error("Falha ao atualizar a notícia");
    }
  };


  const handleDeleteNews = async (id) => {
    try {
      await api.delete(`/v1/api/noticia/${id}`); // Faz a requisição DELETE para remover a notícia
      setNews(news.filter((n) => n.id !== id));
      toast.success("Notícia deletada!");
    } catch (error) {
      console.error(error);
      toast.error("Falha ao deletar a notícia");
    }
  };


  const handleUpdateParticipantScore = async (id, idInscricao, pontos) => {
    // Atualiza o estado de participants
    setParticipants(
      participants.map((p) =>
        p.id === id
          ? {
              ...p,
              Inscricao: {
                ...p.Inscricao,
                pontos: parseInt(pontos),
              },
            }
          : p
      )
    );
    try {
      await api.put(`/v1/api/inscricao/${idInscricao}`, {
        pontos: parseInt(pontos),
      });
      toast.success("Pontuação do participante atualizada com sucesso!");
    } catch (error) {
      toast.error("Falha ao atualizar a pontuação do participante");
    }
  };

  const handleCreateUser = async (e) => {
    e.preventDefault();

    const newUser = {
      nome: e.target.nome.value,
      email: e.target.email.value,
      apelido: e.target.apelido.value,
      senha: e.target.senha.value,
      avatar: e.target.avatar.value,
      roles: e.target.roles.value,
    };

    console.log("newUser", newUser);

    try {
      const response = await api.post("/v1/api/usuario", newUser);
      setUsers([...users, response.data]);
      setIsUserModalOpen(false);
      toast.success("Usuário criado com sucesso!");
    } catch (error) {
      console.error(error);
      toast.error("Falha ao criar usuário");
    }
  };

  const handleEditUser = async (e) => {
    e.preventDefault();
    const updatedUser = {
      ...selectedUser,
      nome: e.target.nome.value,
      email: e.target.email.value,
      apelido: e.target.apelido.value,
      senha: e.target.senha.value,
      avatar: e.target.avatar.value,
      roles: e.target.roles.value,
    };

    try {
      const response = await api.put(
        `/v1/api/usuario/${updatedUser.id}`,
        updatedUser
      );
      setUsers(users.map((u) => (u.id === updatedUser.id ? response.data : u)));
      setIsUserModalOpen(false);
      setSelectedUser(null);
      toast.success("Usuário atualizado com sucesso!");
    } catch (error) {
      console.error(error);
      toast.error("Falha ao atualizar usuário");
    }
  };

  const handleDeleteUser = async (id) => {
    try {
      await api.delete(`/v1/api/usuario/${id}`);
      setUsers(users.filter((u) => u.id !== id));
      toast.success("Usuário deletado com sucesso!");
    } catch (error) {
      console.error(error);
      toast.error("Falha ao deletar usuário");
    }
  };


  const getAllUsers = async () => {
    try {
      const res = await api.get("/v1/api/usuario");
      setUsers(res.data);
    } catch (error) {
      console.log(error);
    }
  };

  const getAllTorneios = async () => {
    try {
      const res = await api.get("/v1/api/torneio");
      setTournaments(res.data);
    } catch (error) {
      console.log(error);
    }
  };

  const getAllNoticias = async () => {
    try {
      const res = await api.get("/v1/api/noticia");
      console.log("notcias", res.data);
      setNews(res.data);
    } catch (error) {
      console.log(error);
    }
  };

  const TorneioEscolhido = async () => {
    try {
      const res = await api.get(`/v1/api/torneio/${selectedTournament.id}`);
      setParticipants(res.data);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getAllUsers();
    getAllTorneios();
    getAllNoticias();
  }, []);

  useEffect(() => {
    TorneioEscolhido(selectedTournament?.id);
  }, [selectedTournament]);

  return (
    <div className="min-h-screen bg-gray-50">
      <Header />
      <main className="container mx-auto px-4 py-8">
        <Tabs value={activeTab} onValueChange={setActiveTab}>
          <TabsList>
            <TabsTrigger value="tournaments">Torneios</TabsTrigger>
            <TabsTrigger value="news">Noticias</TabsTrigger>
            <TabsTrigger value="users">Usuários</TabsTrigger>
          </TabsList>
          <TabsContent value="tournaments">
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-2xl font-bold">Torneios</h2>
              <Button
                onClick={() => {
                  setSelectedTournament(null);
                  setIsTournamentModalOpen(true);
                }}
              >
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
                    <TableCell>{tournament.nome}</TableCell>
                    <TableCell>
                      {tournament.data
                        ? new Date(tournament.data).toISOString().split("T")[0]
                        : ""}
                    </TableCell>
                    <TableCell>{tournament.local}</TableCell>
                    <TableCell>{tournament.quantidadeParticipantes}</TableCell>
                    <TableCell>R$ {tournament.premio}</TableCell>
                    <TableCell>
                      <div className="flex space-x-2">
                        <Button
                          variant="outline"
                          size="icon"
                          onClick={() => {
                            setSelectedTournament(tournament);
                            setIsTournamentModalOpen(true);
                          }}
                        >
                          <Edit className="h-4 w-4" />
                        </Button>
                        <Button
                          variant="outline"
                          size="icon"
                          onClick={() => handleDeleteTournament(tournament.id)}
                        >
                          <Trash2 className="h-4 w-4" />
                        </Button>
                        <Button
                          variant="outline"
                          size="icon"
                          onClick={() => {
                            setSelectedTournament(tournament);
                            setIsParticipantsModalOpen(true);
                          }}
                        >
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
              <Button
                onClick={() => {
                  setSelectedNews(null);
                  setIsNewsModalOpen(true);
                }}
              >
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
                    <TableCell>{article.titulo}</TableCell>
                    <TableCell>{article.autor}</TableCell>
                    <TableCell>
                      <div className="flex space-x-2">
                        <Button
                          variant="outline"
                          size="icon"
                          onClick={() => {
                            setSelectedNews(article);
                            setIsNewsModalOpen(true);
                          }}
                        >
                          <Edit className="h-4 w-4" />
                        </Button>
                        <Button
                          variant="outline"
                          size="icon"
                          onClick={() => handleDeleteNews(article.id)}
                        >
                          <Trash2 className="h-4 w-4" />
                        </Button>
                        <Button
                          variant="outline"
                          size="icon"
                          onClick={() => {
                            setSelectedNews(article);
                            setIsNewsModalOpen(true);
                          }}
                        >
                          <Eye className="h-4 w-4" />
                        </Button>
                      </div>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </TabsContent>
          <TabsContent value="users">
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-2xl font-bold">Usuários</h2>
              <Button
                onClick={() => {
                  setSelectedUser(null);
                  setIsUserModalOpen(true);
                }}
              >
                <Plus className="mr-2 h-4 w-4" /> Criar Usuário
              </Button>
            </div>
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Nome</TableHead>
                  <TableHead>Email</TableHead>
                  <TableHead>Apelido</TableHead>
                  <TableHead>Ações</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {users.map((user) => (
                  <TableRow key={user.id}>
                    <TableCell>{user.nome}</TableCell>
                    <TableCell>{user.email}</TableCell>
                    <TableCell>{user.apelido}</TableCell>
                    <TableCell>
                      <div className="flex space-x-2">
                        <Button
                          variant="outline"
                          size="icon"
                          onClick={() => {
                            setSelectedUser(user);
                            setIsUserModalOpen(true);
                          }}
                        >
                          <Edit className="h-4 w-4" />
                        </Button>
                        <Button
                          variant="outline"
                          size="icon"
                          onClick={() => handleDeleteUser(user.id)}
                        >
                          <Trash2 className="h-4 w-4" />
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

      <Dialog
        open={isTournamentModalOpen}
        onOpenChange={setIsTournamentModalOpen}
      >
        <DialogContent>
          <DialogHeader>
            <DialogTitle>
              {selectedTournament ? "Editar Torneio" : "Criar Torneio"}
            </DialogTitle>
          </DialogHeader>
          <form
            onSubmit={
              selectedTournament ? handleEditTournament : handleCreateTournament
            }
          >
            <div className="space-y-4">
              <div>
                <Label htmlFor="name">Nome</Label>
                <Input
                  id="nome"
                  name="nome"
                  defaultValue={selectedTournament?.nome}
                  required
                />
              </div>
              <div>
                <Label htmlFor="data">Data</Label>
                <Input
                  id="data"
                  name="data"
                  type="date"
                  defaultValue={
                    selectedTournament?.data
                      ? new Date(selectedTournament.data)
                          .toISOString()
                          .split("T")[0]
                      : ""
                  }
                  required
                />
              </div>
              <div>
                <Label htmlFor="local">Localização</Label>
                <Input
                  id="local"
                  name="local"
                  defaultValue={selectedTournament?.local}
                  required
                />
              </div>
              <div>
                <Label htmlFor="quantidadeParticipantes">
                  nº Participantes
                </Label>
                <Input
                  id="quantidadeParticipantes"
                  name="quantidadeParticipantes"
                  type="number"
                  defaultValue={selectedTournament?.quantidadeParticipantes}
                  required
                />
              </div>
              <div>
                <Label htmlFor="prize">Prêmio</Label>
                <Input
                  id="premio"
                  name="premio"
                  defaultValue={selectedTournament?.premio}
                  required
                />
              </div>
            </div>
            <DialogFooter className="mt-6">
              <Button type="submit">
                {selectedTournament ? "Atualizar" : "Criar"}
              </Button>
            </DialogFooter>
          </form>
        </DialogContent>
      </Dialog>

      <Dialog open={isNewsModalOpen} onOpenChange={setIsNewsModalOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>
              {selectedNews ? "Editar Artigo" : "Criar artigo"}
            </DialogTitle>
          </DialogHeader>
          <form onSubmit={selectedNews ? handleEditNews : handleCreateNews}>
            <div className="space-y-4">
              <div>
                <Label htmlFor="imagem">Link imagem</Label>
                <Input
                  id="imagem"
                  name="imagem"
                  defaultValue={selectedNews?.imagem}
                  required
                />
              </div>
              <div>
                <Label htmlFor="autor">Autor</Label>
                <Input
                  id="autor"
                  name="autor"
                  defaultValue={selectedNews?.autor}
                  required
                />
              </div>
              <div>
                <Label htmlFor="titulo">Título</Label>
                <Input
                  id="titulo"
                  name="titulo"
                  defaultValue={selectedNews?.titulo}
                  required
                />
              </div>
              <div>
                <Label htmlFor="conteudo">Conteúdo</Label>
                <Textarea
                  id="conteudo"
                  name="conteudo"
                  defaultValue={selectedNews?.conteudo}
                  required
                />
              </div>
            </div>
            <DialogFooter className="mt-6">
              <Button type="submit">
                {selectedNews ? "Atualizar" : "Editar"}
              </Button>
            </DialogFooter>
          </form>
        </DialogContent>
      </Dialog>

      <Dialog
        open={isParticipantsModalOpen}
        onOpenChange={setIsParticipantsModalOpen}
      >
        <DialogContent className="max-w-3xl">
          <DialogHeader>
            <DialogTitle>
              Participantes - {selectedTournament?.nome}
            </DialogTitle>
          </DialogHeader>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Nome</TableHead>
                <TableHead>Apelido</TableHead>
                <TableHead>Pontuação</TableHead>
                <TableHead>Definir pontuação</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {participants.map((participant) => (
                <TableRow key={participant.id}>
                  <TableCell>{participant.nome}</TableCell>
                  <TableCell>{participant.apelido}</TableCell>
                  <TableCell>{participant.pontuacaoTotal}</TableCell>
                  <TableCell>{participant.Inscricao?.pontos}</TableCell>
                  <TableCell>
                    <div className="flex items-center space-x-2">
                      <Input
                        type="number"
                        className="w-16"
                        defaultValue={participant?.Inscricao?.pontos}
                        onBlur={(e) => {
                          const newPontos = parseInt(e.target.value);
                          // Somente chama a função se o valor tiver sido alterado
                          if (newPontos !== participant?.Inscricao?.pontos) {
                            handleUpdateParticipantScore(
                              participant.id,
                              participant.Inscricao?.id,
                              newPontos
                            );
                          }
                        }}
                      />
                    </div>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </DialogContent>
      </Dialog>

      <Dialog open={isUserModalOpen} onOpenChange={setIsUserModalOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>
              {selectedUser ? "Editar Usuário" : "Criar Usuário"}
            </DialogTitle>
          </DialogHeader>
          <form onSubmit={selectedUser ? handleEditUser : handleCreateUser}>
            <div className="space-y-4">
              <div>
                <Label htmlFor="nome">Nome</Label>
                <Input
                  id="nome"
                  name="nome"
                  defaultValue={selectedUser?.nome}
                  required
                />
              </div>
              <div>
                <Label htmlFor="email">Email</Label>
                <Input
                  id="email"
                  name="email"
                  type="email"
                  defaultValue={selectedUser?.email}
                  required
                />
              </div>
              <div>
                <Label htmlFor="apelido">Apelido</Label>
                <Input
                  id="apelido"
                  name="apelido"
                  defaultValue={selectedUser?.apelido}
                  required
                />
              </div>
              <div>
                <Label htmlFor="senha">Senha</Label>
                <Input
                  id="senha"
                  name="senha"
                  type="password"
                  defaultValue={selectedUser ? "" : undefined}
                  required={!selectedUser} 
                />
              </div>
              <div>
                <Label htmlFor="avatar">Avatar</Label>
                <Input
                  id="avatar"
                  name="avatar"
                  type="string"
                  defaultValue={selectedUser?.avatar}
                  required
                />
              </div>
              <div>
                <Label htmlFor="roles">Permissoes</Label>
                <Input
                  id="roles"
                  name="roles"
                  type="string"
                  defaultValue={selectedUser?.roles}
                  required
                />
              </div>
            </div>
            <DialogFooter className="mt-6">
              <Button type="submit">
                {selectedUser ? "Atualizar" : "Criar"}
              </Button>
            </DialogFooter>
          </form>
        </DialogContent>
      </Dialog>

      <ToastContainer />
    </div>
  );
}
