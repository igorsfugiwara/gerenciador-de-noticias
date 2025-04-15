import React from "react";
import { News } from "../types/News";
import "../styles/NewsCard.css";
import { Link } from "react-router-dom";

type NewsCardProps = {
  news: News;
};

export default function NewsCard({ news }: NewsCardProps) {
  return (
    <Link to={`/news/${news.id}`} className="noticia">
    <div className="card">
      {news.imagem && <img src={news.imagem} alt="thumbnail" className="thumbnail" />}
      <div className="content">
        <span className="editoria">{news.editoria}</span>
        <h2 className="titulo">{news.titulo}</h2>
        <h3 className="subtitulo">{news.subtitulo}</h3>
        <div className="shareIcons">
        <button
        className="iconButton"
        onClick={() => handleShare("Compartilhar")}
        >
        <i className="fa-solid fa-arrow-up-from-bracket"></i>
        </button>
        <button
        className="iconButton"
        onClick={() => handleShare("Comentar")}
        >
        <i className="fa-regular fa-comment"></i>
        </button>
        <button
        className="iconButton"
        onClick={() => handleShare("Salvar")}
        >
        <i className="fa-regular fa-bookmark"></i>
        </button>
        </div>
      </div>
    </div>
          </Link>
  );
}




<div className="shareIcons">
<button
  className="iconButton"
  onClick={() => handleShare("Compartilhar")}
>
  <i className="fa-solid fa-arrow-up-from-bracket"></i>
</button>
<button
  className="iconButton"
  onClick={() => handleShare("Comentar")}
>
  <i className="fa-regular fa-comment"></i>
</button>
<button
  className="iconButton"
  onClick={() => handleShare("Salvar")}
>
  <i className="fa-regular fa-bookmark"></i>
</button>
</div>