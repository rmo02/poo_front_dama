import { ChevronRight } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { Button } from "@/components/ui/button";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { useUser } from "@/context/UserContext";

export default function Home() {
  const { user } = useUser();


  const news = [
    {
      id: 1,
      title: "Grandmaster Sarah Johnson Wins International Championship",
      preview:
        "In a stunning display of skill and strategy, Sarah Johnson clinched the title...",
      image: "/placeholder.svg?height=200&width=300",
    },
    {
      id: 2,
      title: "Young Prodigy Makes Waves in Junior Tournament",
      preview:
        "12-year-old Alex Chen has become the talk of the chess world after an impressive performance...",
      image: "/placeholder.svg?height=200&width=300",
    },
    {
      id: 3,
      title: "New AI Chess Engine Challenges Top Players",
      preview:
        "The latest AI chess engine, DeepKnight, has been making headlines by consistently defeating...",
      image: "/placeholder.svg?height=200&width=300",
    },
  ];

  const tournaments = [
    {
      id: 1,
      name: "Global Chess Masters",
      date: "August 15-20, 2023",
      location: "New York, USA",
    },
    {
      id: 2,
      name: "European Chess Championship",
      date: "September 5-12, 2023",
      location: "Paris, France",
    },
    {
      id: 3,
      name: "Asian Chess Open",
      date: "October 1-7, 2023",
      location: "Tokyo, Japan",
    },
  ];

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
                  {tournament.name}
                </h3>
                <p className="text-gray-600 mb-1">{tournament.date}</p>
                <p className="text-gray-600 mb-4">{tournament.location}</p>
                <Button variant="outline" className="w-full">
                  Participe
                  <ChevronRight className="ml-2 h-4 w-4" />
                </Button>
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
                  src={item.image}
                  alt={item.title}
                  width={300}
                  height={200}
                  className="w-full h-48 object-cover"
                />
                <div className="p-4">
                  <h3 className="text-lg font-semibold text-gray-800 mb-2">
                    {item.title}
                  </h3>
                  <p className="text-gray-600 mb-4">{item.preview}</p>
                  <div className="text-blue-500 hover:text-blue-600 transition-colors inline-flex items-center">
                    Leia mais
                    <ChevronRight className="ml-1 h-4 w-4" />
                  </div>
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
