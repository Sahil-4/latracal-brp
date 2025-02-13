import { useState } from "react";
import Header from "../components/header.jsx";
import { useAppContext } from "../Context/useAppContext.js";
import { ReviewI } from "../types/index.js";
import styles from "../styles/form.module.css";
import { useNavigate, useParams } from "react-router-dom";

const AddReview = () => {
  const { postReview } = useAppContext();
  const navigate = useNavigate();

  const { bookId } = useParams();

  const [review, setReview] = useState<Pick<ReviewI, "rating" | "title" | "comment">>({
    title: "",
    rating: 0,
    comment: "",
  });

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    postReview(bookId!, review);
    navigate("/");
  };

  const handleOnChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setReview((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  return (
    <>
      <Header />
      <section>
        <form onSubmit={handleSubmit} className={styles.form}>
          <input
            type="text"
            name="title"
            placeholder="Title"
            required={true}
            value={review.title}
            onChange={handleOnChange}
          />
          <input
            name="rating"
            type="number"
            min={0}
            max={5}
            placeholder="rating"
            required={true}
            value={review.rating}
            onChange={handleOnChange}
          />
          <textarea
            name="comment"
            placeholder="Comment"
            required={true}
            value={review.comment}
            onChange={handleOnChange}
          ></textarea>

          <button type="submit">Post Review</button>
        </form>
      </section>
    </>
  );
};

export default AddReview;
