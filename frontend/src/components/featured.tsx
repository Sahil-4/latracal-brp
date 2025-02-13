import { useEffect } from "react";
import { useAppContext } from "../Context/useAppContext";
import BookItem from "./bookItem";

const Featured = () => {
  const { featuredBooks, fetchFeaturedBooks } = useAppContext();

  useEffect(() => {
    fetchFeaturedBooks();
  }, []);

  return (
    <main style={{ width: "480px", margin: "0 auto" }}>
      <h1 style={{ margin: "12px 0" }}>Featured Books</h1>
      {featuredBooks.map((book) => {
        return <BookItem key={book._id} book={book} />;
      })}
    </main>
  );
};

export default Featured;
