import Header from "../components/header";
import { useAppContext } from "../Context/useAppContext";

const UserProfile = () => {
  const { user } = useAppContext();

  return (
    <>
      <Header />
      <section>
        <div style={{ width: "480px", margin: "0 auto", textAlign: "center" }}>
          <p>Username: {user?.username}</p>
        </div>
      </section>
    </>
  );
};

export default UserProfile;
