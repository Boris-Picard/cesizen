import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Book, Brain, Leaf, Wind, Search, ArrowLeft } from "lucide-react";
import informationsImg from "@/assets/informations.avif";
import { Link, useNavigate } from "react-router-dom";
import { Information } from "../admin-dashboard/informations/column";
import DOMPurify from "isomorphic-dompurify"

// Les catégories avec leur icône pour les Tabs
const categories = [
  { label: "Tous", value: "all", icon: Book },
  { label: "Santé mentale", value: "Santé mentale", icon: Brain },
  { label: "Gestion du stress", value: "Gestion du stress", icon: Leaf },
  { label: "Exercices de respiration", value: "Exercices de respiration", icon: Wind },
];

type TypeInfoKey = "Santé mentale" | "Gestion du stress" | "Exercices de respiration";

const colorMapping: Record<TypeInfoKey, { color: string; textColor: string }> = {
  "Santé mentale": {
    color: "bg-leather-200",
    textColor: "text-leather-900",
  },
  "Gestion du stress": {
    color: "bg-leather-300",
    textColor: "text-leather-950",
  },
  "Exercices de respiration": {
    color: "bg-leather-400",
    textColor: "text-white",
  },
};

const iconMapping: Record<TypeInfoKey, React.FC<React.SVGProps<SVGSVGElement>>> = {
  "Santé mentale": Brain,
  "Gestion du stress": Leaf,
  "Exercices de respiration": Wind,
};

interface InformationsComponentsInterface {
  informationsData: Information[];
}

export const InformationsComponents = ({ informationsData }: InformationsComponentsInterface) => {
  const [filter, setFilter] = useState<string>("all");
  const [searchTerm, setSearchTerm] = useState("");
  const navigate = useNavigate();

  const addedData = informationsData.map((article) => {
    const key = article.typeInformation.type_info_nom as TypeInfoKey;
    const IconComponent = iconMapping[key];
    const iconClasses = "absolute inset-0 m-auto h-24 w-24 transition-transform group-hover:scale-110";
    return {
      ...article,
      color: colorMapping[key],
      Icon: IconComponent,
      iconClasses,
    };
  });

  const filterArticles = addedData.filter(
    (article) =>
      (filter === "all" || article.typeInformation.type_info_nom === filter) &&
      (article.info_titre.toLowerCase().includes(searchTerm.toLowerCase()) ||
        article.info_contenu.toLowerCase().includes(searchTerm.toLowerCase()))
  );

  return (
    <div className="min-h-screen bg-leather-50">
      <div className="relative bg-gradient-to-b from-leather-800 to-leather-700 overflow-hidden">
        <div className="absolute inset-0 bg-[url('/grid.svg')] bg-center opacity-20 animate-pulse-slow" />
        <div className="relative container mx-auto px-4 sm:px-6 py-12 max-w-7xl lg:px-8">
          <div className="flex items-center justify-start mb-6">
            <Button
              variant="ghost"
              className="text-white hover:text-leather-800 transition-all duration-300 hover:bg-leather-100 rounded-full"
              onClick={() => navigate(-1)}
            >
              <ArrowLeft className="mr-2 h-4 w-4 sm:h-5 sm:w-5" />
              <span className="hidden sm:inline">Retour</span>
              <span className="sm:hidden">Retour</span>
            </Button>
          </div>
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="text-center max-w-3xl mx-auto"
          >
            <h1 className="text-5xl font-extrabold text-white mb-4">Santé Mentale & Bien-être</h1>
            <p className="text-xl text-leather-200 max-w-2xl mx-auto">
              Explorez nos ressources pour améliorer votre bien-être mental et émotionnel. Trouvez l'équilibre intérieur
              qui vous convient.
            </p>
          </motion.div>
        </div>
      </div>

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="flex flex-col sm:flex-row gap-6 items-center justify-center mb-12">
          <div className="relative w-full max-w-md">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-leather-400" />
            <Input
              type="search"
              placeholder="Rechercher un article..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-10 py-3 text-lg bg-white border-leather-200 focus:ring-leather-500 focus:border-leather-500 rounded-full"
            />
          </div>
          <Tabs value={filter} onValueChange={setFilter} className="w-full sm:w-auto">
            <TabsList className="bg-leather-100 p-1 rounded-full">
              {categories.map((cat) => (
                <TabsTrigger
                  key={cat.value}
                  value={cat.value}
                  className="rounded-full px-6 py-2 text-sm font-medium transition-all data-[state=active]:bg-leather-600 data-[state=active]:text-white"
                >
                  <cat.icon className="mr-2 h-4 w-4" />
                  {cat.label}
                </TabsTrigger>
              ))}
            </TabsList>
          </Tabs>
        </div>

        <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
          <AnimatePresence>
            {filterArticles.map((article) => (
              <motion.div
                key={article.id}
                layout
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.9 }}
                transition={{ duration: 0.3 }}
              >
                <Link to={`/informations/${article.id}`}>
                  <Card className={`${article.color.color} flex flex-col h-full cursor-pointer rounded-3xl shadow-lg transition-all duration-300 hover:shadow-xl hover:-translate-y-1 overflow-hidden group`}>
                    <div className="h-48 relative overflow-hidden">
                      <article.Icon className={article.iconClasses} />
                    </div>
                    <CardContent className="p-6 flex-grow flex flex-col justify-between">
                      <div>
                        <Badge className="mb-2 ">{article.typeInformation.type_info_nom}</Badge>
                        <h2 className="text-2xl font-bold mb-2 transition-transform group-hover:translate-y-[-4px]">
                          {article.info_titre}
                        </h2>
                        <div className="mb-4 line-clamp-3 opacity-90" dangerouslySetInnerHTML={{
                          __html: DOMPurify.sanitize(article?.info_contenu),
                        }}></div>
                      </div>
                      <Button
                        variant="outline"
                        className={`w-full py-2 border-current ${article.color.textColor} transition-colors`}
                      >
                        Lire la suite
                      </Button>
                    </CardContent>
                  </Card>
                </Link>
              </motion.div>
            ))}
          </AnimatePresence>
        </div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="mt-24 bg-leather-700 rounded-3xl overflow-hidden shadow-xl"
        >
          <div className="p-8 sm:p-12 flex flex-col sm:flex-row items-center">
            <div className="flex-1 text-center sm:text-left mb-6 sm:mb-0">
              <h2 className="text-3xl font-bold text-white mb-4">Prenez soin de vous</h2>
              <p className="text-leather-200 text-lg mb-6">
                N'oubliez pas, prendre soin de votre santé mentale est un voyage continu.
              </p>
              <Button
                className="bg-white text-leather-800 hover:bg-leather-100 py-3 px-6 text-lg transition-colors duration-300 ease-out"
                onClick={() => navigate("/exercices")}
              >
                Découvrez nos exercices de respiration
              </Button>
            </div>
            <div className="flex-1 flex justify-center">
              <img
                src={informationsImg}
                alt="Illustration bien-être"
                width={500}
                height={500}
                className="rounded-3xl"
              />
            </div>
          </div>
        </motion.div>
      </main>
    </div>
  );
};
