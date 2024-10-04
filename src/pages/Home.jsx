import { ChevronRight } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { Button } from "@/components/ui/button";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { useUser } from "@/context/UserContext";
import { api } from "@/api";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";

export default function Home() {
  const { user } = useUser();
  const [news, setNews] = useState([])
  const [tournaments, setTournaments] = useState([])

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
      setNews(res.data);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getAllNoticias();
    getAllTorneios();
  }, [])
  


  return (
    <div className="min-h-screen bg-gray-50">
      <Header />

      <main className="container mx-auto px-8 py-8">
        <section className="mb-12">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">
            Bem-Vindo, {user?.usuario?.nome}
          </h1>
          <p className="text-xl text-gray-600 mb-8">
            Descubra o mundo competitivo do jogo de damas
          </p>

          <h2 className="text-2xl font-semibold text-gray-800 mb-4">
            Proximos torneios
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {tournaments.map((tournament) => (
              <motion.div
                key={tournament.id}
                className="bg-white rounded-lg shadow-md p-6 transition-shadow hover:shadow-lg"
                whileHover={{ scale: 1.03 }}
                whileTap={{ scale: 0.98 }}
              >
                <h3 className="text-lg font-semibold text-gray-800 mb-2">
                  {tournament.nome}
                </h3>
                <p className="text-gray-600 mb-1">{tournament.data
                        ? new Date(tournament.data).toISOString().split("T")[0]
                        : ""}</p>
                <p className="text-gray-600 mb-4">{tournament.local}</p>
                <Link
                to="/tournaments"
                >
                <Button variant="outline" className="w-full">
                  Veja mais
                  <ChevronRight className="ml-2 h-4 w-4" />
                </Button>
                </Link>
              </motion.div>
            ))}
          </div>
        </section>

        <section className="mb-12">
          <h2 className="text-2xl font-semibold text-gray-800 mb-4">
            Ultimas notícias
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {news.map((item) => (
              <motion.div
                key={item.id}
                className="bg-white rounded-lg shadow-md overflow-hidden"
                whileHover={{ scale: 1.03 }}
                whileTap={{ scale: 0.98 }}
              >
                <img
                  src={item.imagem}
                  alt={item.titulo}
                  className="w-[300px] h-[200px] object-cover"
                />
                <div className="p-4">
                  <h3 className="text-lg font-semibold text-gray-800 mb-2">
                    {item.titulo}
                  </h3>
                  <p className="text-gray-600 mb-4">{item.conteudo}</p>
                  <Link
                  to="/news"
                  className="text-blue-500 hover:text-blue-600 transition-colors inline-flex items-center">
                    Leia mais
                    <ChevronRight className="ml-1 h-4 w-4" />
                  </Link>
                </div>
              </motion.div>
            ))}
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
}
