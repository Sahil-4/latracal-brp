import { Link } from "react-router-dom";
import Profile from "./profile";
import { useAppContext } from "../Context/useAppContext";
import styles from "../styles/header.module.css";

const Header = () => {
  const { user } = useAppContext();
  const title = "Book Review Platform";

  return (
    <header className={styles.header}>
      <Link to={"/"}>{title}</Link>

      <nav>
        <Link to={"/books"}>All Books</Link>
        {!user ? (
          <Link to={"/login"}>Login</Link>
        ) : (
          <>
            <Link to={"/addBook"}>Add Book</Link>
            <Profile />
          </>
        )}
      </nav>
    </header>
  );
};

export default Header;
