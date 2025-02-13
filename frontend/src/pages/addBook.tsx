import { useState } from "react";
import Header from "../components/header.jsx";
import { useAppContext } from "../Context/useAppContext.js";
import { BookI } from "../types/index.js";
import styles from "../styles/form.module.css";
import { useNavigate } from "react-router-dom";

const AddBook = () => {
  const { postBook } = useAppContext();
  const navigate = useNavigate();

  const [book, setBook] = useState<Omit<BookI, "_id" | "rating">>({
    title: "",
    author: "",
    category: "",
    thumbnail: "",
    description: "",
  });

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    postBook(book);
    navigate("/");
  };

  const handleOnChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setBook((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  return (
    <>
      <Header />
      <section>
        <form onSubmit={handleSubmit} className={styles.form}>
          <input
            type="text"
            name="title"
            placeholder="Book title"
            required={true}
            value={book.title}
            onChange={handleOnChange}
          />
          <input
            type="text"
            name="author"
            placeholder="Book author"
            required={true}
            value={book.author}
            onChange={handleOnChange}
          />
          <input
            type="text"
            name="category"
            placeholder="Book category"
            required={true}
            value={book.category}
            onChange={handleOnChange}
          />
          <input
            type="text"
            name="thumbnail"
            placeholder="Book thumbnail URL"
            required={true}
            value={book.thumbnail}
            onChange={handleOnChange}
          />
          <textarea
            name="description"
            placeholder="Book description"
            required={true}
            value={book.description}
            onChange={handleOnChange}
          ></textarea>

          <button type="submit">Post</button>
        </form>
      </section>
    </>
  );
};

export default AddBook;
