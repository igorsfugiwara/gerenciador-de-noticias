import { News } from "../types/News";
import NewsCard from "../components/NewsCard";
import "../styles/Feed.css";
type FeedProps = {
  newsList: News[];
};

export default function Feed({ newsList }: FeedProps) {
  return (
    <div>
      <h1 className="title-feed">Feed de Notícias</h1>
      <div className="card-container">
        {newsList.map((news) => (
          <NewsCard key={news.id} news={news} />
        ))}
      </div>
    </div>
  );
}


