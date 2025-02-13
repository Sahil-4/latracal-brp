import { ReviewI } from "../types";
import styles from "../styles/reviewItem.module.css";

const ReviewItem = ({ review }: { review: ReviewI }) => {
  return (
    <div className={styles.reviewItem}>
      <h3>{review.title}</h3>
      <p>{review.comment}</p>
    </div>
  );
};
export default ReviewItem;
