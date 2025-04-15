import { useParams } from "react-router-dom";
import { News } from "../types/News";
import "../styles/NewsCard.css";
import "../styles/NewsDetails.css";
import parse from 'html-react-parser';

type NewsDetailsProps = {
  newsList: News[];
};

export default function NewsDetails({ newsList }: NewsDetailsProps) {
  const { id } = useParams();
  const noticia = newsList.find(n => String(n.id) === id);

  if (!noticia) return <p>Notícia não encontrada</p>;

  return (
    <div>
      <div className="header-news">
        <span className="editoria">{noticia.editoria}</span>
        <h1 className="titulo-details">{noticia.titulo}</h1>
        <h2 className="subtitulo">{noticia.subtitulo}</h2>
        <div className="credits">
          <p className="author"> Redação, O Estado de S.Paulo</p>
          <p>{noticia.data_hora_publicacao}</p>
        </div>
      </div>
      <img src={noticia.imagem} alt={noticia.titulo} />
      <div className="text">{parse(noticia.conteudo)}</div>
    </div>
  );
}
