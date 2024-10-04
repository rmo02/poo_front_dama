"use client"

import React, { useState, useRef } from "react"
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Label } from "@/components/ui/label"
import { Button } from "@/components/ui/button"
import { motion, AnimatePresence } from "framer-motion"
import { Input } from "@/components/ui/input"
import { User, Menu, Spade, Settings, LogOut, Upload, Shield } from "lucide-react"
import { Link } from "react-router-dom"
import { useUser } from "@/context/UserContext"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { api } from "@/api"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"

export default function Component() {
  const [isAuthOpen, setIsAuthOpen] = useState(false)
  const [isEditOpen, setIsEditOpen] = useState(false)
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)
  const [signUpData, setSignUpData] = useState({
    nome: "",
    apelido: "",
    email: "",
    senha: "",
    roles: "user",
    avatar: "url_do_avatar.png",
  })
  const [loginData, setLoginData] = useState({
    email: "",
    senha: "",
  })
  const [editProfileData, setEditProfileData] = useState({
    nome: "",
    apelido: "",
    avatar: null,
  })
  const fileInputRef = useRef(null)

  const { login, user, logout, updateUser } = useUser()

  const handleSignUpChange = (e) => {
    setSignUpData({ ...signUpData, [e.target.id]: e.target.value })
  }

  const handleLoginChange = (e) => {
    setLoginData({ ...loginData, [e.target.id]: e.target.value })
  }

  const handleEditProfileChange = (e) => {
    if (e.target.id === "avatar") {
      setEditProfileData({ ...editProfileData, avatar: e.target.files[0] })
    } else {
      setEditProfileData({ ...editProfileData, [e.target.id]: e.target.value })
    }
  }

  const handleSignUp = async (e) => {
    e.preventDefault()
    try {
      const res = await api.post("/v1/api/usuario", signUpData)
      console.log("Usuário cadastrado:", res.data)
      setIsAuthOpen(false)
    } catch (error) {
      console.error(
        "Erro ao cadastrar usuário:",
        error.response ? error.response.data : error.message
      )
    }
  }

  const handleLogin = async (e) => {
    e.preventDefault()
    try {
      const res = await api.post("/v1/api/usuario/login", loginData)
      console.log("Login bem-sucedido:", res.data)
      login(res.data)
      setIsAuthOpen(false)
    } catch (error) {
      console.error(
        "Erro ao fazer login:",
        error.response ? error.response.data : error.message
      )
    }
  }

  const handleLogout = () => {
    logout()
  }

  const handleEditProfile = () => {
    setIsEditOpen(true)
    setEditProfileData({
      nome: user.nome,
      apelido: user.apelido,
      avatar: null,
    })
  }

  const handleEditProfileSubmit = async (e) => {
    e.preventDefault()
    try {
      const formData = new FormData()
      formData.append("nome", editProfileData.nome)
      formData.append("apelido", editProfileData.apelido)
      if (editProfileData.avatar) {
        formData.append("avatar", editProfileData.avatar)
      }

      const res = await api.put(`/v1/api/usuario/${user?.usuario?.id}`, formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      })
      console.log("Perfil atualizado:", res.data)
      login(res.data)
      setIsEditOpen(false)
    } catch (error) {
      console.error(
        "Erro ao atualizar perfil:",
        error.response ? error.response.data : error.message
      )
    }
  }

  return (
    <>
      <header className="bg-white shadow-sm">
        <div className="container mx-auto px-4 py-4">
          <div className="flex justify-between items-center">
            <div className="flex items-center space-x-4">
              <Spade className="h-8 w-6" />
              <span className="text-xl font-bold text-gray-800">
                Federação Maranhense de Damas
              </span>
            </div>
            <nav className="hidden md:flex items-center space-x-6">
              <Link
                to="/"
                className="text-gray-600 hover:text-gray-900 transition-colors"
              >
                Inicio
              </Link>
              <Link
                to="/tournaments"
                className="text-gray-600 hover:text-gray-900 transition-colors"
              >
                Torneios
              </Link>
              <Link
                to="/ranking"
                className="text-gray-600 hover:text-gray-900 transition-colors"
              >
                Classificação
              </Link>
              <Link
                to="/news"
                className="text-gray-600 hover:text-gray-900 transition-colors"
              >
                Noticias
              </Link>
              <Link
                to="/contact"
                className="text-gray-600 hover:text-gray-900 transition-colors"
              >
                Contato
              </Link>

              {user ? (
                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <Button variant="ghost" className="relative h-8 w-8 rounded-full">
                      <Avatar className="h-8 w-8">
                        <AvatarImage src={user?.usuario?.avatar || "https://github.com/shadcn.png"} alt={user?.usuario?.nome} />
                        <AvatarFallback>{user?.usuario?.nome}</AvatarFallback>
                      </Avatar>
                    </Button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent className="w-56" align="end" forceMount>
                    <DropdownMenuItem onClick={handleEditProfile}>
                      <Settings className="mr-2 h-4 w-4" />
                      <span>Editar Perfil</span>
                    </DropdownMenuItem>
                    {
                      user?.usuario?.roles === "admin" 
                      &&
                      <DropdownMenuItem >
                      <Shield className="mr-2 h-4 w-4" />
                       <Link
                       to="/admin"
                       >Painel admin</Link>
                    </DropdownMenuItem>
                    }
                    <DropdownMenuItem onClick={handleLogout}>
                      <LogOut className="mr-2 h-4 w-4" />
                      <span>Logout</span>
                    </DropdownMenuItem>
                  </DropdownMenuContent>
                </DropdownMenu>
              ) : (
                <Dialog open={isAuthOpen} onOpenChange={setIsAuthOpen}>
                  <DialogTrigger asChild>
                    <Button
                      variant="ghost"
                      size="icon"
                      className="text-gray-600 hover:text-gray-900"
                    >
                      <User className="h-5 w-5" />
                    </Button>
                  </DialogTrigger>
                  <DialogContent className="sm:max-w-[425px]">
                    <DialogHeader>
                      <DialogTitle>Login / Cadastro</DialogTitle>
                    </DialogHeader>
                    <Tabs defaultValue="login" className="w-full">
                      <TabsList className="grid w-full grid-cols-2">
                        <TabsTrigger value="login">Login</TabsTrigger>
                        <TabsTrigger value="signup">Cadastro</TabsTrigger>
                      </TabsList>
                      <TabsContent value="login">
                        <form onSubmit={handleLogin} className="space-y-4">
                          <div className="space-y-2">
                            <Label htmlFor="email">Email</Label>
                            <Input
                              id="email"
                              type="email"
                              required
                              onChange={handleLoginChange}
                            />
                          </div>
                          <div className="space-y-2">
                            <Label htmlFor="senha">Senha</Label>
                            <Input
                              id="senha"
                              type="password"
                              required
                              onChange={handleLoginChange}
                            />
                          </div>
                          <Button type="submit" className="w-full">
                            Login
                          </Button>
                        </form>
                      </TabsContent>
                      <TabsContent value="signup">
                        <form onSubmit={handleSignUp} className="space-y-4">
                          <div className="space-y-2">
                            <Label htmlFor="nome">Nome</Label>
                            <Input
                              id="nome"
                              required
                              onChange={handleSignUpChange}
                            />
                          </div>
                          <div className="space-y-2">
                            <Label htmlFor="apelido">Apelido</Label>
                            <Input
                              id="apelido"
                              required
                              onChange={handleSignUpChange}
                            />
                          </div>
                          <div className="space-y-2">
                            <Label htmlFor="email">Email</Label>
                            <Input
                              id="email"
                              type="email"
                              required
                              onChange={handleSignUpChange}
                            />
                          </div>
                          <div className="space-y-2">
                            <Label htmlFor="senha">Senha</Label>
                            <Input
                              id="senha"
                              type="password"
                              required
                              onChange={handleSignUpChange}
                            />
                          </div>
                          <Button type="submit" className="w-full">
                            Cadastrar
                          </Button>
                        </form>
                      </TabsContent>
                    </Tabs>
                  </DialogContent>
                </Dialog>
              )}
            </nav>

            <Button
              variant="ghost"
              size="icon"
              className="md:hidden"
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            >
              <Menu className="h-6 w-6" />
            </Button>
          </div>
        </div>
      </header>

      <AnimatePresence>
        {isMobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, y: -50 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -50 }}
            className="md:hidden bg-white shadow-lg absolute top-16 left-0 right-0 z-50"
          >
            <nav className="flex flex-col items-center py-4 space-y-4">
              <div className="text-gray-600 hover:text-gray-900 transition-colors">
                Home
              </div>
              <div className="text-gray-600 hover:text-gray-900 transition-colors">
                Campeonatos
              </div>
              <div className="text-gray-600 hover:text-gray-900 transition-colors">
                Classificação
              </div>
              <div className="text-gray-600 hover:text-gray-900 transition-colors">
                Noticias
              </div>
              {user ? (
                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <Button variant="ghost" className="relative h-8 w-8 rounded-full">
                      <Avatar className="h-8 w-8">
                        <AvatarImage src={user?.usuario?.avatar || "https://github.com/shadcn.png"} alt={user?.usuario?.nome} />
                        <AvatarFallback>{user.usuario?.nome}</AvatarFallback>
                      </Avatar>
                    </Button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent className="w-56" align="end" forceMount>
                    <DropdownMenuItem onClick={handleEditProfile}>
                      <Settings className="mr-2 h-4 w-4" />
                      <span>Editar Perfil</span>
                    </DropdownMenuItem>
                    {
                      user?.usuario?.roles === "admin" 
                      &&
                      <DropdownMenuItem >
                      <Shield className="mr-2 h-4 w-4" />
                       <Link
                       to="/admin"
                       >Painel admin</Link>
                    </DropdownMenuItem>
                    }
                    <DropdownMenuItem onClick={handleLogout}>
                      <LogOut className="mr-2 h-4 w-4" />
                      <span>Logout</span>
                    </DropdownMenuItem>
                  </DropdownMenuContent>
                </DropdownMenu>
              ) : (
                <Button
                  variant="ghost"
                  size="icon"
                  className="text-gray-600 hover:text-gray-900"
                  onClick={() => setIsAuthOpen(true)}
                >
                  <User className="h-5 w-5" />
                </Button>
              )}
            </nav>
          </motion.div>
        )}
      </AnimatePresence>

      <Dialog open={isEditOpen} onOpenChange={setIsEditOpen}>
        <DialogContent className="sm:max-w-[425px]">
          <DialogHeader>
            <DialogTitle>Editar Perfil</DialogTitle>
          </DialogHeader>
          <form onSubmit={handleEditProfileSubmit} className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="avatar">Avatar</Label>
              <div className="flex items-center space-x-4">
                <Avatar className="h-16 w-16">
                  <AvatarImage
                    src={
                      editProfileData.avatar
                        ? URL.createObjectURL(editProfileData.avatar)
                        : user?.usuario?.avatar || "https://github.com/shadcn.png"
                    }
                    alt={user?.usuario?.nome}
                  />
                  <AvatarFallback>{user?.usuario?.nome}</AvatarFallback>
                </Avatar>
                <Button
                  type="button"
                  variant="outline"
                  size="sm"
                  onClick={() => fileInputRef.current.click()}
                >
                  <Upload className="h-4 w-4 mr-2" />
                  Carregar Imagem
                </Button>
                <Input
                  id="avatar"
                  type="file"
                  accept="image/*"
                  className="hidden"
                  ref={fileInputRef}
                  onChange={handleEditProfileChange}
                />
              </div>
            </div>
            <div className="space-y-2">
              <Label htmlFor="nome">Nome</Label>
              <Input
                id="nome"
                value={editProfileData.nome}
                onChange={handleEditProfileChange}
                required
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="apelido">Apelido</Label>
              <Input
                id="apelido"
                value={editProfileData.apelido}
                onChange={handleEditProfileChange}
                required
              />
            </div>
            <Button type="submit" className="w-full">
              Salvar Alterações
            </Button>
          </form>
        </DialogContent>
      </Dialog>
    </>
  )
}