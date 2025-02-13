import { createContext, PropsWithChildren, useEffect, useState } from "react";
import { jwtDecode as decode } from "jwt-decode";
import { BookI, ReviewI, UserI } from "../types";

interface AppContextI {
  error: string | null;
  loading: boolean;
  user: UserI | null;
  books: BookI[];
  featuredBooks: BookI[];
  reviewsMap: Map<string, ReviewI[]>;
  login: (username: string, password: string) => void;
  signup: (username: string, password: string) => void;
  logout: () => void;
  fetchUserProfile: () => void;
  updateUserProfile: (newUsername: string) => void;
  fetchBooks: (cpage?: number, climit?: number) => void;
  fetchFeaturedBooks: () => void;
  fetchBookById: (bookId: string) => void;
  postBook: (book: Omit<BookI, "_id" | "rating">) => void;
  fetchReviews: (bookId: string, page?: number, limit?: number) => void;
  postReview: (bookId: string, review: Pick<ReviewI, "rating" | "title" | "comment">) => void;
  getBookById: (bookId: string) => BookI | null;
  getBookReviews: (bookId: string) => ReviewI[];
}

const initialValue: AppContextI = {
  error: null,
  loading: false,
  user: null,
  books: [],
  featuredBooks: [],
  reviewsMap: new Map(),
  login: () => null,
  signup: () => null,
  logout: () => null,
  fetchUserProfile: () => null,
  updateUserProfile: () => null,
  fetchBooks: () => null,
  fetchFeaturedBooks: () => null,
  fetchBookById: () => null,
  postBook: () => null,
  fetchReviews: () => null,
  postReview: () => null,
  getBookById: () => null,
  getBookReviews: () => [],
};

const AppContext = createContext<AppContextI>(initialValue);

export const AppProvider = ({ children }: PropsWithChildren) => {
  const API_BASE_URI = import.meta.env.VITE_BASE_URL;

  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  const [user, setUser] = useState<UserI | null>(null);

  const [page, setPaga] = useState<number>(1);
  const [hasMore, setHasMore] = useState<boolean>(true);
  const limit = 10;
  const [books, setBooks] = useState<BookI[]>([]);
  const [featuredBooks, setFeaturedBooks] = useState<BookI[]>([]);
  const [reviewsMap, setReviewsMap] = useState<Map<string, ReviewI[]>>(new Map());

  const login = async (username: string, password: string) => {
    try {
      setLoading(true);
      setError(null);
      const URL = `${API_BASE_URI}/api/v1/auth/login`;
      const options = {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ username, password }),
      };

      const response = await fetch(URL, options);
      const { success = false, message = "", data = null } = await response.json();

      if (!success) {
        setError(message);
      } else {
        setUser(data);
        localStorage.setItem("user", JSON.stringify(data));
      }
      setLoading(false);
    } catch (error) {
      console.log(error);
    }
  };

  const signup = async (username: string, password: string) => {
    try {
      setLoading(true);
      setError(null);
      const URL = `${API_BASE_URI}/api/v1/auth/signup`;
      const options = {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ username, password }),
      };

      const response = await fetch(URL, options);
      const { success = false, message = "", data = null } = await response.json();

      if (!success) {
        setError(message);
      } else {
        setUser(data);
        localStorage.setItem("user", JSON.stringify(data));
      }
      setLoading(false);
    } catch (error) {
      console.log(error);
    }
  };

  const logout = () => {
    localStorage.removeItem("user");
    setUser(null);
  };

  const fetchUserProfile = async () => {
    try {
      setLoading(true);
      setError(null);
      const URL = `${API_BASE_URI}/api/v1/users/`;
      const options = {
        method: "GET",
      };

      const response = await fetch(URL, options);
      const { success = false, message = "", data = null } = await response.json();

      if (!success) {
        setError(message);
      } else {
        setUser(data);
      }
      setLoading(false);
    } catch (error) {
      console.log(error);
    }
  };

  const updateUserProfile = async (newUsername: string) => {
    try {
      setLoading(true);
      setError(null);
      const URL = `${API_BASE_URI}/api/v1/users/`;
      const options = {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ username: newUsername }),
      };

      const response = await fetch(URL, options);
      const { success = false, message = "", data = null } = await response.json();

      if (!success) {
        setError(message);
      } else {
        setUser(data);
      }
      setLoading(false);
    } catch (error) {
      console.log(error);
    }
  };

  const fetchFeaturedBooks = async () => {
    try {
      setLoading(true);
      setError(null);
      const URL = `${API_BASE_URI}/api/v1/books/?page=${1}&limit=${8}`;
      const options = {
        method: "GET",
      };

      const response = await fetch(URL, options);
      const { success = false, message = "", data = [] } = await response.json();

      if (!success) {
        setError(message);
      } else {
        setFeaturedBooks(data);
      }
      setLoading(false);
    } catch (error) {
      console.log(error);
    }
  };

  const fetchBooks = async (cpage?: number, climit?: number) => {
    try {
      if (!hasMore) return;
      setLoading(true);
      setError(null);
      const URL = `${API_BASE_URI}/api/v1/books/?page=${cpage || page}&limit=${climit || limit}`;
      const options = {
        method: "GET",
      };

      const response = await fetch(URL, options);
      const { success = false, message = "", data = [], meta } = await response.json();

      if (!success) {
        setError(message);
      } else {
        setPaga((prev) => (cpage || prev) + 1);
        setHasMore(meta.hasMore);
        setBooks((prev) => [...prev, ...data]);
      }
      setLoading(false);
    } catch (error) {
      console.log(error);
    }
  };

  const fetchBookById = async (bookId: string) => {
    try {
      setLoading(true);
      setError(null);
      const URL = `${API_BASE_URI}/api/v1/books/${bookId}`;
      const options = {
        method: "GET",
      };

      const response = await fetch(URL, options);
      const { success = false, message = "", data = null } = await response.json();

      if (!success) {
        setError(message);
      } else {
        setBooks((prev) => [...prev, data]);
      }
      setLoading(false);
    } catch (error) {
      console.log(error);
    }
  };

  const postBook = async (book: Omit<BookI, "_id" | "rating">) => {
    try {
      setLoading(true);
      setError(null);
      const URL = `${API_BASE_URI}/api/v1/books/`;
      const options = {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          authtoken: `Bearer ${user?.token}`,
        },
        body: JSON.stringify({ ...book }),
      };

      const response = await fetch(URL, options);
      const { success = false, message = "", data = null } = await response.json();

      if (!success) {
        setError(message);
      } else {
        setBooks((prev) => [...prev, data]);
      }
      setLoading(false);
    } catch (error) {
      console.log(error);
    }
  };

  const fetchReviews = async (bookId: string, page?: number, limit?: number) => {
    try {
      setLoading(true);
      setError(null);
      const URL = `${API_BASE_URI}/api/v1/reviews/${bookId}?page=${page || 1}&limit=${limit || 50}`;
      const options = {
        method: "GET",
      };

      const response = await fetch(URL, options);
      const { success = false, message = "", data = [] } = await response.json();

      if (!success) {
        setError(message);
      } else {
        setReviewsMap((prev) => {
          const reviews = prev.get(bookId) || [];
          reviews.push(...data);
          prev.set(bookId, reviews);
          return prev;
        });
      }
      setLoading(false);
    } catch (error) {
      console.log(error);
    }
  };

  const postReview = async (bookId: string, review: Pick<ReviewI, "rating" | "title" | "comment">) => {
    try {
      console.log(bookId);
      console.log(review);
      setLoading(true);
      setError(null);
      const URL = `${API_BASE_URI}/api/v1/reviews/${bookId}`;
      const options = {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          authtoken: `Bearer ${user?.token}`,
        },
        body: JSON.stringify({ ...review }),
      };

      const response = await fetch(URL, options);
      const { success = false, message = "", data = null } = await response.json();

      if (!success) {
        setError(message);
      } else {
        setReviewsMap((prev) => {
          const reviews = prev.get(bookId) || [];
          reviews.push(data);
          prev.set(bookId, reviews);
          return prev;
        });
      }
      setLoading(false);
    } catch (error) {
      console.log(error);
    }
  };

  const getBookById = (bookId: string) => {
    let book = books.filter((book) => book._id === bookId)[0];
    (async () => {
      if (!book) {
        await fetchBookById(bookId);
        book = books.filter((book) => book._id === bookId)[0];
      }
    })();
    return book;
  };

  const getBookReviews = (bookId: string) => {
    let reviews = reviewsMap.get(bookId);
    if (!reviews) {
      (async () => {
        await fetchReviews(bookId);
      })();
      reviews = reviewsMap.get(bookId);
    }
    return reviews || [];
  };

  useEffect(() => {
    if (user) return;
    const data = localStorage.getItem("user");
    if (data) {
      setUser(JSON.parse(data));
    }
  }, [user]);

  useEffect(() => {
    if (!user) return;
    const payload = decode(user.token);
    if (payload.exp! < Date.now() / 1000) logout();
  }, [user]);

  return (
    <AppContext.Provider
      value={{
        loading,
        error,
        user,
        books,
        featuredBooks,
        reviewsMap,
        login,
        signup,
        logout,
        fetchUserProfile,
        updateUserProfile,
        fetchBooks,
        fetchFeaturedBooks,
        fetchBookById,
        postBook,
        fetchReviews,
        postReview,
        getBookById,
        getBookReviews,
      }}
    >
      {children}
    </AppContext.Provider>
  );
};

export { AppContext };
export type { AppContextI };
