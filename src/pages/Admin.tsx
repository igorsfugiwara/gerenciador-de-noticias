import { useEffect, useState } from "react";
import { News } from "../types/News";
import NewsFormModal from "../components/NewsFormModal";
import "../styles/Admin.css";


export default function Admin() {
    const [newsList, setNewsList] = useState<News[]>([]);
    const [isModalOpen, setModalOpen] = useState(false);
    const [selectedNews, setSelectedNews] = useState<News | null>(null);

    useEffect(() => {
        const loadNews = async () => {
        try {
            const response = await fetch("/noticias.json");

            if (!response.ok) {
            throw new Error("Falha ao carregar o arquivo noticias.json");
            }

            const noticiasJson = await response.json();
            setNewsList(noticiasJson);
        } catch (error) {
            console.error("Erro ao carregar as notícias:", error);
        }
        };

        loadNews();
    }, []);

    const handleEdit = (news: News) => {
        setSelectedNews(news);
        setModalOpen(true);
    };

    const handleCreate = () => {
        setSelectedNews(null);
        setModalOpen(true);
    };

    return (
        <div>
        <h1 className="title-feed">Gerenciamento de Notícias</h1>
        <button className="add-button"  onClick={handleCreate}>Adicionar Notícia</button>

        {/* Tabela de Notícias */}
        <table className="table">
            <thead>
            <tr>
                <th>Editoria</th>
                <th>Título</th>
                <th>Data de Publicação</th>
                <th>Ações</th>
            </tr>
            </thead>
            <tbody>
            {newsList.map((news) => (
                <tr key={news.id}>
                <td>{news.editoria}</td>
                <td className="admin-titulo">{news.titulo}</td>
                <td>  {new Date(news.data_hora_publicacao).toLocaleString('pt-BR', {
                    year: 'numeric',
                    month: 'long',
                    day: 'numeric',
                    hour: '2-digit',
                    minute: '2-digit',
                    hour12: false
                })}</td>
                <td>
                    <button onClick={() => handleEdit(news)}>Editar</button>
                </td>
                </tr>
            ))}
            </tbody>
        </table>

        {/* Modal para criar/editar notícias */}
        <NewsFormModal
            isOpen={isModalOpen}
            onClose={() => setModalOpen(false)}
            onSave={(news) => {
            setNewsList((prevNews) => {
                if (selectedNews) {
                // Atualiza a notícia existente
                return prevNews.map((n) =>
                    n.id === selectedNews.id ? { ...n, ...news } : n
                );
                }
                // Adiciona nova notícia
                return [...prevNews, news];
            });
            setModalOpen(false);
            }}
            news={selectedNews}
        />
        </div>
    );
}
