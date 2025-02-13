interface UserI {
  _id: string;
  username: string;
  token: string;
}

interface BookI {
  _id: string;
  title: string;
  thumbnail: string;
  description: string;
  category: string;
  rating: string;
  author: string;
}

interface ReviewI {
  _id: string;
  user: string;
  book: string;
  rating: number;
  title: string;
  comment: string;
}

export type { UserI, BookI, ReviewI };
