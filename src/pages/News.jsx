
import Header from "@/components/Header";
import React, { useEffect, useState } from "react";

import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle
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
import { api } from "@/api";

export default function News() {
  const [selectedArticle, setSelectedArticle] = useState(null);
  const [newsArticles, setNewsArticles] = useState(null);


  const getNews = async() => {
    try {
      const res = await api.get("/v1/api/noticia")
      setNewsArticles(res.data)
    } catch (error) {
      console.log(error)
    }
  }


  useEffect(() => {
    getNews()
  }, [])

  return (
    <div className="min-h-screen bg-gray-50">
      <Header />

      <main className="container mx-auto px-4 py-8">
        <h1 className="text-4xl font-bold text-gray-900 mb-8">Notícias</h1>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {newsArticles?.map((article) => (
            <motion.div
              key={article?.id}
              whileHover={{ scale: 1.03 }}
              whileTap={{ scale: 0.98 }}
            >
              <Card className="h-full flex flex-col">
                <CardHeader>
                  <img
                    src={article?.imagem}
                    alt={article?.titulo}
                    width={300}
                    height={200}
                    className="w-full h-48 object-cover rounded-t-lg"
                  />
                </CardHeader>
                <CardContent className="flex-grow">
                  <CardTitle className="text-xl mb-2">
                    {article?.titulo}
                  </CardTitle>
                  <CardDescription className="text-gray-600">
                    {article?.conteudo}
                  </CardDescription>
                </CardContent>
                <CardFooter className="flex justify-between items-center">
                  <div className="text-sm text-gray-500">
                    {article?.createdAt} | {article?.autor}
                  </div>
                  <Button
                    variant="ghost"
                    className="text-blue-500 hover:text-blue-600 transition-colors inline-flex items-center"
                    onClick={() => setSelectedArticle(article)}
                  >
                    Leia Mais
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
                src={selectedArticle?.imagem || ""}
                alt={selectedArticle?.titulo || ""}
                width={600}
                height={400}
                className="w-full h-64 object-cover rounded-lg"
              />
              <p className="text-sm text-gray-500">
                {selectedArticle?.createdAt} | {selectedArticle?.autor}
              </p>
              <div className="prose max-w-none">
                {selectedArticle?.conteudo
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
    </div>
  );
}
