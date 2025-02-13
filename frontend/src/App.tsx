import { createBrowserRouter, RouterProvider } from "react-router-dom";
import { AppProvider } from "./Context/AppContext";
import Home from "./pages/home";
import Books from "./pages/books";
import BookDetails from "./pages/bookDetails";
import AddBook from "./pages/addBook";
import AddReview from "./pages/addReview";
import UserProfile from "./pages/userProfile";
import Login from "./pages/login";
import Signup from "./pages/signup";
import "./styles/globals.css";

function App() {
  const router = createBrowserRouter([
    {
      path: "/",
      element: <Home />,
    },
    {
      path: "/books",
      element: <Books />,
    },
    {
      path: "/books/:bookId",
      element: <BookDetails />,
    },
    {
      path: "/addBook",
      element: <AddBook />,
    },
    {
      path: "/:bookId/addReview",
      element: <AddReview />,
    },
    {
      path: "/users/:id",
      element: <UserProfile />,
    },
    {
      path: "/login",
      element: <Login />,
    },
    {
      path: "/signup",
      element: <Signup />,
    },
  ]);

  return (
    <AppProvider>
      <RouterProvider router={router} />
    </AppProvider>
  );
}

export default App;
