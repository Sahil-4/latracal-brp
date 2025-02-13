import { useEffect } from "react";
import Header from "../components/header";
import BookItem from "../components/bookItem";
import List from "../components/list";
import { useAppContext } from "../Context/useAppContext";

const Books = () => {
  const { books, fetchBooks } = useAppContext();

  useEffect(() => {
    fetchBooks();
  }, []);

  return (
    <>
      <Header />
      <main style={{ width: "480px", margin: "0 auto" }}>
        <h1 style={{ margin: "12px 0" }}>All Books</h1>
        <List callback={fetchBooks}>
          {books.map((book, index) => {
            return <BookItem key={index} book={book} />;
          })}
        </List>
      </main>
    </>
  );
};

export default Books;
