import React, { useEffect, useState } from "react";
import { News } from "../types/News";
import NewsCard from "../components/NewsCard";
import "../styles/Feed.css";

export default function Feed() {
  const [newsList, setNewsList] = useState<News[]>([]);

  const fetchNews = async () => {
    try {
      const response = await fetch("http://localhost:5000/noticias");
      const data = await response.json();
      setNewsList(data); // Atualiza a lista de notícias com os dados mais recentes
    } catch (error) {
      console.error("Erro ao buscar notícias:", error);
    }
  };

  useEffect(() => {
    fetchNews();
  }, []); // O array vazio [] garante que a função será chamada apenas uma vez ao montar o componente

  return (
    <div>
      <h1 className="title-feed">Feed de Notícias</h1>
      <div className="card-container">
        {newsList.map((news) => (
          <NewsCard key={news._id} news={news} />
        ))}
      </div>
    </div>
  );
}
