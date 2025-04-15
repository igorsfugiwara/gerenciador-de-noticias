import { News } from "../types/News";
import NewsCard from "../components/NewsCard";

type FeedProps = {
  newsList: News[];
};

export default function Feed({ newsList }: FeedProps) {
  return (
    <div>
      <h1>Feed de Notícias</h1>
      <div style={styles.cardContainer}>
        {newsList.map((news) => (
          <NewsCard key={news.id} news={news} />
        ))}
      </div>
    </div>
  );
}

const styles = {
  cardContainer: {
    display: "flex",
    gap: "16px",
    padding: "20px",
    flexWrap: "wrap",
    justifyContent: "flex-start",
  },
};
