import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Header from './components/Header';
import Feed from './pages/Feed';
import Admin from './pages/Admin';
import NewsDetails from './pages/NewsDetails';
import { News } from './types/News';
import { useEffect, useState } from 'react';

export default function App() {
  const [newsList, setNewsList] = useState<News[]>([]);

  useEffect(() => {
    const loadNews = async () => {
      try {
        const response = await fetch("/noticias.json");

        if (!response.ok) throw new Error("Falha ao carregar o arquivo noticias.json");

        const noticiasJson = await response.json();
        setNewsList(noticiasJson);
      } catch (error) {
        console.error("Erro ao carregar as notícias:", error);
      }
    };

    loadNews();
  }, []);

  return (
    <Router>
      <Header />
      <main style={{ padding: '1rem' }}>
        <Routes>
          <Route path="/" element={<Feed newsList={newsList} />} />
          <Route path="/admin" element={<Admin />} />
          <Route path="/news/:id" element={<NewsDetails newsList={newsList} />} />
        </Routes>
      </main>
    </Router>
  );
}
