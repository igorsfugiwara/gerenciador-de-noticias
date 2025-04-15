import { useParams } from "react-router-dom";
import { News } from "../types/News";

type NewsDetailsProps = {
  newsList: News[];
};

export default function NewsDetails({ newsList }: NewsDetailsProps) {
  const { id } = useParams();
  const noticia = newsList.find(n => String(n.id) === id);

  if (!noticia) return <p>Notícia não encontrada</p>;

  return (
    <div style={{ padding: '20px' }}>
      <h1>{noticia.titulo}</h1>
      <h3>{noticia.subtitulo}</h3>
      <img src={noticia.imagem} alt={noticia.titulo} style={{ width: '100%', maxWidth: '600px' }} />
      <p>{noticia.conteudo}</p>
    </div>
  );
}
