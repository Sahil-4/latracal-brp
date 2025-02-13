import { useRef } from "react";
import { Link, useNavigate } from "react-router-dom";
import Header from "../components/header.jsx";
import { useAppContext } from "../Context/useAppContext.js";
import styles from "../styles/form.module.css";

const Signup = () => {
  const usernameInput = useRef<HTMLInputElement | null>(null);
  const passwordInput = useRef<HTMLInputElement | null>(null);
  const navigate = useNavigate();

  const { signup } = useAppContext();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    const username = usernameInput.current?.value;
    const password = passwordInput.current?.value;

    if (!username || !password) return;

    signup(username, password);
    navigate("/");
  };

  return (
    <>
      <Header />
      <section>
        <form onSubmit={handleSubmit} className={styles.form}>
          <input type="text" placeholder="Username" ref={usernameInput} required={true} />
          <input type="password" placeholder="Password" ref={passwordInput} required={true} />
          <button type="submit">Signup</button>
          <div>
            <Link to={"/login"}>Login</Link>
          </div>
        </form>
      </section>
    </>
  );
};

export default Signup;
