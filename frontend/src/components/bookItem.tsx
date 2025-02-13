import { Link } from "react-router-dom";
import { BookI } from "../types";
import styles from "../styles/bookItem.module.css";

const BookItem = ({ book }: { book: BookI }) => {
  return (
    <div className={styles.bookItem}>
      <h3>{book.title}</h3>
      <p>{book.author}</p>
      <p>{book.description}</p>

      <div className={styles.bookItemControls}>
        <Link to={`/books/:${book._id}`}>View Details</Link>
      </div>
    </div>
  );
};

export default BookItem;
