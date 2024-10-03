import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";

import { motion, AnimatePresence } from "framer-motion";
import { Input } from "@/components/ui/input";
import React, { useState } from "react";

import { User, Menu, Spade } from "lucide-react";
import { Link } from 'react-router-dom';
import { useUser } from "@/context/UserContext";

export default function Header() {
  const [isAuthOpen, setIsAuthOpen] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [signUpData, setSignUpData] = useState({
    name: "",
    nickname: "",
    email: "",
    password: "",
  });
  const [loginData, setLoginData] = useState({
    email: "",
    password: "",
  });

  const { user } = useUser();

  console.log('user', user)

  const handleSignUpChange = (e) => {
    setSignUpData({ ...signUpData, [e.target.id]: e.target.value });
  };

  const handleLoginChange = (e) => {
    setLoginData({ ...loginData, [e.target.id]: e.target.value });
  };

  const handleSignUp = (e) => {
    e.preventDefault();
    console.log("Sign Up Data:", signUpData);
    setIsAuthOpen(false);
  };

  const handleLogin = (e) => {
    e.preventDefault();
    console.log("Login Data:", loginData);
    setIsAuthOpen(false);
  };

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
              <Link to="/" className="text-gray-600 hover:text-gray-900 transition-colors">
                Inicio
              </Link>
              <Link to="/tournaments" className="text-gray-600 hover:text-gray-900 transition-colors">
                Torneios
              </Link>
              <Link to="/ranking" className="text-gray-600 hover:text-gray-900 transition-colors">
                Classificação
              </Link>
              <Link to="/news" className="text-gray-600 hover:text-gray-900 transition-colors">
                Noticias
              </Link>
              <Link to="/contact" className="text-gray-600 hover:text-gray-900 transition-colors">
                Contato
              </Link>
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
                          <Label htmlFor="login-email">Email</Label>
                          <Input
                            id="login-email"
                            type="email"
                            required
                            onChange={handleLoginChange}
                          />
                        </div>
                        <div className="space-y-2">
                          <Label htmlFor="login-password">Senha</Label>
                          <Input
                            id="login-password"
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
                          <Label htmlFor="name">Nome</Label>
                          <Input
                            id="name"
                            required
                            onChange={handleSignUpChange}
                          />
                        </div>
                        <div className="space-y-2">
                          <Label htmlFor="nickname">Apelido</Label>
                          <Input
                            id="nickname"
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
                          <Label htmlFor="password">Senha</Label>
                          <Input
                            id="password"
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
              <Button
                variant="ghost"
                size="icon"
                className="text-gray-600 hover:text-gray-900"
                onClick={() => setIsAuthOpen(true)}
              >
                <User className="h-5 w-5" />
              </Button>
            </nav>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
