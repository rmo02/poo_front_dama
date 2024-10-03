import Footer from "@/components/Footer";
import Header from "@/components/Header";
import React, { useState } from "react";

import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { ScrollArea } from "@/components/ui/scroll-area";

import { Button } from "@/components/ui/button";
import { motion } from "framer-motion";
import { ChevronRight } from "lucide-react";

export default function News() {
  const [selectedArticle, setSelectedArticle] = useState(null);

  const newsArticles = [
    {
      id: 1,
      title: "Grandmaster Sarah Johnson Wins International Championship",
      preview:
        "In a stunning display of skill and strategy, Sarah Johnson clinched the title at the International Chess Championship, solidifying her position as one of the top players in the world.",
      fullContent:
        "In a thrilling finale to the International Chess Championship, Grandmaster Sarah Johnson emerged victorious, securing her place among the chess elite. The tournament, which spanned two weeks and featured 128 of the world's top players, concluded with Johnson's masterful endgame against defending champion Mikhail Petrov.\n\nJohnson's path to victory was marked by several notable games, including a particularly grueling semi-final match against up-and-coming star Wei Chen. The final game against Petrov lasted over six hours, with Johnson ultimately forcing a resignation in a complex rook and pawn endgame.\n\n'This victory is the culmination of years of hard work and dedication,' Johnson said in her post-game interview. 'I'm honored to have competed against such formidable opponents and am looking forward to defending my title next year.'\n\nWith this win, Johnson not only takes home the championship trophy but also secures the top spot in the world rankings. Her victory has been hailed as a significant moment for women in chess, inspiring a new generation of players around the globe.",
      image: "/placeholder.svg?height=200&width=300",
      date: "June 15, 2023",
      author: "Chess Masters Staff",
    },
    {
      id: 2,
      title: "Young Prodigy Makes Waves in Junior Tournament",
      preview:
        "12-year-old Alex Chen has become the talk of the chess world after an impressive performance in the Junior World Chess Championship, defeating opponents twice his age.",
      fullContent:
        "The chess world is abuzz with excitement over the remarkable performance of 12-year-old Alex Chen at the Junior World Chess Championship. Chen, the youngest participant in the tournament's history, has defied expectations by defeating opponents twice his age and securing a place in the finals.\n\nChen's journey through the tournament has been nothing short of spectacular. In the quarterfinals, he stunned spectators with a brilliant queen sacrifice that led to a checkmate in just 27 moves against the 17-year-old European junior champion. His semifinal match, a grueling 5-hour battle against the tournament favorite, showcased his exceptional endgame skills and mental stamina.\n\n'Alex's understanding of chess at such a young age is truly extraordinary,' commented Grandmaster Lila Novak, who has been following the tournament closely. 'His intuitive grasp of complex positions and his creative approach to problem-solving on the board are qualities we usually see in much more experienced players.'\n\nChen's success has sparked discussions about the future of chess and the potential for young players to compete at the highest levels. Many are already speculating about his prospects for becoming the youngest grandmaster in history.\n\nAs Chen prepares for the final match, chess enthusiasts around the world are eagerly anticipating what could be the beginning of a legendary career in the making.",
      image: "/placeholder.svg?height=200&width=300",
      date: "June 10, 2023",
      author: "John Smith",
    },
    {
      id: 3,
      title: "New AI Chess Engine Challenges Top Players",
      preview:
        "The latest AI chess engine, DeepKnight, has been making headlines by consistently defeating grandmasters in online matches, raising questions about the future of competitive chess.",
      fullContent:
        "The chess world is facing a new challenge as DeepKnight, an advanced AI chess engine developed by tech giant InnovateTech, continues to dominate in online matches against top-ranked grandmasters. This latest development in AI chess technology has sparked intense debate about the future of competitive chess and the role of artificial intelligence in the sport.\n\nDeepKnight, which utilizes advanced machine learning algorithms and neural networks, has played over 1,000 games against various grandmasters in the past month, maintaining an astounding win rate of 92%. What sets DeepKnight apart from previous chess engines is its ability to adapt its playing style mid-game and its uncanny knack for making moves that seem almost human in their creativity and strategic depth.\n\nGrandmaster Viktor Korchnoi, who has faced DeepKnight in several matches, expressed both admiration and concern: 'The level of play is simply extraordinary. DeepKnight finds moves that I wouldn't even consider, yet they turn out to be incredibly powerful. It's both exciting and somewhat unsettling.'\n\nThe rise of DeepKnight has led to discussions within the chess community about the need for new categories in competitions, potentially separating human-only tournaments from those that allow AI participation. Some argue that AI can be a valuable tool for training and analysis, while others worry about the potential loss of the human element in competitive chess.\n\nAs DeepKnight continues to improve and challenge the boundaries of chess strategy, the chess world watches with a mix of anticipation and apprehension, wondering what this new era of AI-enhanced chess will bring to the centuries-old game.",
      image: "/placeholder.svg?height=200&width=300",
      date: "June 5, 2023",
      author: "Tech Chess Magazine",
    },
    {
      id: 4,
      title: "Chess Olympiad 2023 Announces Host City",
      preview:
        "The International Chess Federation has announced that the 2023 Chess Olympiad will be held in Madrid, Spain. The biennial event is expected to draw teams from over 180 countries.",
      fullContent:
        "The International Chess Federation (FIDE) has officially announced that Madrid, Spain, will host the 2023 Chess Olympiad. This prestigious biennial event, often referred to as the 'Chess Olympics,' is expected to draw teams from over 180 countries, making it one of the largest chess gatherings in history.\n\nMadrid's successful bid highlighted the city's rich cultural heritage, excellent infrastructure, and commitment to promoting chess. The event will be held in the state-of-the-art Madrid Convention Center, which will be transformed into a vast chess arena for the duration of the Olympiad.\n\nSpanish Chess Federation President, Isabella Fernández, expressed her excitement: 'We are thrilled to welcome the global chess community to Madrid. This Olympiad will not only be a celebration of chess but also an opportunity to showcase our city's hospitality and passion for the game.'\n\nThe 2023 Olympiad is set to introduce several innovations, including enhanced digital coverage of games, interactive fan zones, and a parallel festival of chess culture featuring exhibitions, lectures, and youth tournaments.\n\nFIDE President Arkady Dvorkovich commented on the selection: 'Madrid's proposal was exceptional, blending tradition with innovation. We are confident that the 2023 Olympiad will set new standards for chess events and leave a lasting legacy.'\n\nAs preparations begin, the chess world eagerly anticipates what promises to be a spectacular celebration of the game, bringing together players of all levels from around the globe in the beautiful setting of Spain's capital city.",
      image: "/placeholder.svg?height=200&width=300",
      date: "May 30, 2023",
      author: "Chess Masters Staff",
    },
    {
      id: 5,
      title: "Chess in Schools Program Shows Promising Results",
      preview:
        "A new study reveals that students participating in chess programs show improved critical thinking skills and academic performance across various subjects.",
      fullContent:
        "A comprehensive study conducted by the Education Research Institute has revealed promising results from the implementation of chess programs in schools across multiple countries. The research, which spanned three years and involved over 5,000 students aged 8-14, shows significant improvements in critical thinking skills and academic performance among participants.\n\nThe study compared students who participated in regular chess classes as part of their curriculum to those who did not. Key findings include:\n\n1. A 12% increase in math test scores among chess program participants.\n2. Improved problem-solving skills, with chess students outperforming their peers by 23% in complex reasoning tasks.\n3. Enhanced concentration and focus, as reported by 78% of teachers involved in the study.\n4. A notable increase in self-confidence and social skills among students, particularly those who previously struggled with academic performance.\n\nDr. Elena Rodriguez, lead researcher of the study, emphasized the holistic benefits of chess in education: 'Chess is not just about moving pieces on a board. It teaches students to think ahead, analyze situations from multiple perspectives, and make strategic decisions. These are invaluable skills that translate into all areas of academic and personal development.'\n\nThe success of these programs has sparked interest from education ministries worldwide. Several countries are now considering integrating chess into their national curriculum, viewing it as a cost-effective way to enhance educational outcomes.\n\nChess grandmaster and education advocate, Vishy Anand, commented on the findings: 'This study confirms what many of us in the chess world have long believed. Chess is a powerful educational tool that can help shape young minds and prepare them for the challenges of the future.'\n\nAs the positive impacts of chess in education become more evident, schools and policymakers are increasingly looking at ways to incorporate chess into learning environments, potentially reshaping the landscape of education in the years to come.",
      image: "/placeholder.svg?height=200&width=300",
      date: "May 25, 2023",
      author: "Education Today",
    },
    {
      id: 6,
      title: "Historic Chess Set Discovered in Ancient Ruins",
      preview:
        "Archaeologists have unearthed a beautifully preserved chess set dating back to the 12th century, providing new insights into the game's evolution and cultural significance.",
      fullContent:
        "In a groundbreaking archaeological discovery, a team of researchers has unearthed a remarkably well-preserved chess set dating back to the 12th century. The find, made during excavations of a medieval castle in northern Scotland, is being hailed as one of the most significant chess-related archaeological discoveries in recent decades.\n\nThe chess set, crafted from walrus ivory and whalebone, consists of 31 intricately carved pieces. While one piece is missing, the set includes several unique figurines that offer new insights into the evolution of chess piece design and the cultural context of the game in medieval Europe.\n\nDr. Fiona MacDonald, lead archaeologist on the project, described the significance of the find: 'This chess set is not just a game—it's a window into medieval life, art, and social structures. The level of craftsmanship is extraordinary, and the symbolism in the piece designs tells us much about the society that created them.'\n\nParticularly noteworthy is the queen piece, which is depicted as a powerful, crown-wearing figure. This representation is unusual for the time period and may indicate an early shift towards the queen becoming the most powerful piece on the board, a change that didn't become standard in most of Europe until the 15th century.\n\nThe king piece, adorned with a cross, reflects the strong influence of Christianity in medieval Scottish society. Other pieces, such as knights depicted on horseback and rooks shaped like fortified towers, provide insights into medieval warfare and architecture.\n\nChess historian Dr. Gareth Williams commented on the historical context: 'This set bridges the gap between the ancient form of chess that arrived from the Islamic world and the game as we know it today. It's a crucial piece of the puzzle in understanding how chess evolved in Western Europe.'\n\nThe chess set will undergo further analysis and conservation before being put on display at the National Museum of Scotland. This remarkable find not only enriches our understanding of chess history but also provides a tangible link to the intellectual and cultural life of medieval Scotland.",
      image: "/placeholder.svg?height=200&width=300",
      date: "May 20, 2023",
      author: "Historical Chess Society",
    },
  ];

  return (
    <div className="min-h-screen bg-gray-50">
      <Header />

      <main className="container mx-auto px-4 py-8">
        <h1 className="text-4xl font-bold text-gray-900 mb-8">Notícias</h1>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {newsArticles.map((article) => (
            <motion.div
              key={article.id}
              whileHover={{ scale: 1.03 }}
              whileTap={{ scale: 0.98 }}
            >
              <Card className="h-full flex flex-col">
                <CardHeader>
                  <img
                    src={article.image}
                    alt={article.title}
                    width={300}
                    height={200}
                    className="w-full h-48 object-cover rounded-t-lg"
                  />
                </CardHeader>
                <CardContent className="flex-grow">
                  <CardTitle className="text-xl mb-2">
                    {article.title}
                  </CardTitle>
                  <CardDescription className="text-gray-600">
                    {article.preview}
                  </CardDescription>
                </CardContent>
                <CardFooter className="flex justify-between items-center">
                  <div className="text-sm text-gray-500">
                    {article.date} | {article.author}
                  </div>
                  <Button
                    variant="ghost"
                    className="text-blue-500 hover:text-blue-600 transition-colors inline-flex items-center"
                    onClick={() => setSelectedArticle(article)}
                  >
                    Read more
                    <ChevronRight className="ml-1 h-4 w-4" />
                  </Button>
                </CardFooter>
              </Card>
            </motion.div>
          ))}
        </div>
      </main>

      <Dialog
        open={!!selectedArticle}
        onOpenChange={() => setSelectedArticle(null)}
      >
        <DialogContent className="sm:max-w-[700px] max-h-[80vh] overflow-hidden flex flex-col">
          <DialogHeader>
            <DialogTitle>{selectedArticle?.title}</DialogTitle>
          </DialogHeader>
          <ScrollArea className="flex-grow">
            <div className="space-y-4 p-4">
              <img
                src={selectedArticle?.image || ""}
                alt={selectedArticle?.title || ""}
                width={600}
                height={400}
                className="w-full h-64 object-cover rounded-lg"
              />
              <p className="text-sm text-gray-500">
                {selectedArticle?.date} | {selectedArticle?.author}
              </p>
              <div className="prose max-w-none">
                {selectedArticle?.fullContent
                  .split("\n\n")
                  .map((paragraph, index) => (
                    <p key={index}>{paragraph}</p>
                  ))}
              </div>
            </div>
          </ScrollArea>
          <div className="mt-4 flex justify-end">
            <Button variant="outline" onClick={() => setSelectedArticle(null)}>
              Close
            </Button>
          </div>
        </DialogContent>
      </Dialog>

      <Footer />
    </div>
  );
}
