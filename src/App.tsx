import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Header from './components/Header/Header';
import Feed from './pages/Feed/Feed';
import Admin from './pages/Admin/Admin';
import NewsPage from './pages/NewsPage/NewsPage';
import { News } from './types/News';
import { useEffect, useState } from 'react';
import Footer from './components/Footer/Footer';

export default function App() {
  const [newsList, setNewsList] = useState<News[]>([]);

  useEffect(() => {
    const loadNews = async () => {
      try {
        const response = await fetch("http://localhost:5000/noticias/ ");

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
      <main>
        <Routes>
          <Route path="/" element={<Feed newsList={newsList} />} />
          <Route path="/admin" element={<Admin />} />
          <Route path="/news/:id" element={<NewsPage newsList={newsList} />} />
        </Routes>
      </main>
      <Footer />
    </Router>
  );
}