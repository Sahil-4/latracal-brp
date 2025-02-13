import { Link, useParams } from "react-router-dom";
import Header from "../components/header.jsx";
import ReviewItem from "../components/reviewItem.js";
import { useAppContext } from "../Context/useAppContext.js";
import styles from "../styles/bookDetails.module.css";

const BookDetails = () => {
  const { bookId } = useParams();
  const { getBookById, getBookReviews } = useAppContext();

  const book = getBookById(bookId!.slice(1));
  const reviews = getBookReviews(bookId!.slice(1));

  return (
    <>
      <Header />
      <section>
        {book && (
          <>
            <div className={styles.bookDetailsContainer}>
              <div className={styles.bookThumbnailContainer}>
                <img src={book.thumbnail} alt={book.title} />
              </div>
              <div className={styles.bookMetaContainer}>
                <h1>{book.title}</h1>
                <p>author: {book.author}</p>
                <p>category: {book.category}</p>
                <p>rating: {book.rating}</p>
                <Link to={`/${book._id}/addReview`}>Add Review</Link>
              </div>
              <div className={styles.bookDescriptionContainer}>
                <p>{book.description}</p>
              </div>
            </div>

            <div className={styles.bookReviewsContainer}>
              {reviews.map((review) => {
                return <ReviewItem review={review} />;
              })}
            </div>
          </>
        )}
      </section>
    </>
  );
};

export default BookDetails;
