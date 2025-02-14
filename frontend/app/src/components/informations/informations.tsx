import { useState, useEffect } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { ArrowLeft } from "lucide-react";
import { useNavigate } from "react-router-dom";

type Article = {
  id: number;
  type: "sante" | "stress" | "respiration";
  title: string;
  content: string;
};

const fakeData: Article[] = [
  {
    id: 1,
    type: "sante",
    title: "Comprendre la Santé Mentale",
    content:
      "La santé mentale englobe notre bien-être émotionnel, psychologique et social. Découvrez comment prendre soin de vous et cultiver un esprit sain.",
  },
  {
    id: 2,
    type: "stress",
    title: "Gestion du Stress",
    content:
      "Le stress est une réaction naturelle face aux défis. Apprenez des techniques efficaces pour gérer votre stress au quotidien.",
  },
  {
    id: 3,
    type: "respiration",
    title: "Exercices de Respiration",
    content:
      "Les exercices de respiration, comme la cohérence cardiaque, permettent de réduire le stress et d’améliorer la concentration.",
  },
];

const categories = [
  { label: "Tous", value: "all" },
  { label: "Santé mentale", value: "sante" },
  { label: "Gestion du stress", value: "stress" },
  { label: "Exercices de respiration", value: "respiration" },
];

const InformationsComponents = () => {
  const navigate = useNavigate();
  const [articles, setArticles] = useState<Article[]>([]);
  const [filter, setFilter] = useState<string>("all");

  useEffect(() => {
    setArticles(fakeData);
  }, []);

  const filteredArticles =
    filter === "all"
      ? articles
      : articles.filter((article) => article.type === filter);

  return (
    <div className="py-8 px-4 md:px-8">
      <div className="max-w-7xl mx-auto">
        <Button
          variant="ghost"
          className="mb-6 flex items-center text-gray-600 hover:text-gray-800"
          onClick={() => navigate(-1)}
        >
          <ArrowLeft className="mr-2 h-5 w-5" /> Retour
        </Button>

        <h1 className="text-4xl font-bold text-green-800 text-center mb-10">
          Santé Mentale et Bien-être
        </h1>

        {/* Boutons de filtrage centrés en mode "chips" */}
        <div className="flex justify-center mb-10">
          <div className="flex space-x-4 overflow-x-auto pb-2 no-scrollbar">
            {categories.map((cat) => (
              <Button
                key={cat.value}
                variant={filter === cat.value ? "default" : "outline"}
                className={`whitespace-nowrap px-4 py-2 transition-colors duration-300 ease-out ${filter !== cat.value ? "hover:bg-green-50" : ""
                  }`}
                onClick={() => setFilter(cat.value)}
              >
                {cat.label}
              </Button>
            ))}
          </div>
        </div>

        {/* Grille de type "Bento Grid" inspirée d'Airbnb */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
          {filteredArticles.map((article) => (
            <Card
              key={article.id}
              className="flex flex-col cursor-pointer rounded-lg shadow-sm hover:shadow-lg transition-shadow duration-300 ease-out"
              onClick={() => navigate(`/articles/${article.id}`)}
            >
              <CardHeader className="flex flex-col gap-2 p-6">
                <div className="flex items-center justify-between">
                  <CardTitle className="text-2xl font-semibold">
                    {article.title}
                  </CardTitle>
                  <Badge className="capitalize" variant="secondary">
                    {article.type}
                  </Badge>
                </div>
                <Separator />
              </CardHeader>
              <CardContent className="flex-1 p-6">
                <p className="text-green-700 line-clamp-3">
                  {article.content}
                </p>
              </CardContent>
              <div className="p-6 pt-0">
                <Button
                  variant="outline"
                  className="w-full py-3 transition-colors duration-300 ease-out hover:bg-green-50"
                  onClick={(e) => {
                    e.stopPropagation();
                    navigate(`/articles/${article.id}`);
                  }}
                >
                  Voir plus &rarr;
                </Button>
              </div>
            </Card>
          ))}
        </div>

        <div className="mt-12 text-center">
          <p className="text-green-700 mb-4">
            N&apos;oubliez pas, prendre soin de votre santé mentale est un voyage continu.
          </p>
          <Button
            className="bg-green-600 hover:bg-green-700 text-white py-3 px-6 transition-colors duration-300 ease-out"
            onClick={() => navigate("/exercices")}
          >
            Découvrez nos exercices de respiration
          </Button>
        </div>
      </div>
    </div>
  );
};

export default InformationsComponents;
