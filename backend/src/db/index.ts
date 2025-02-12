import mongoose from "mongoose";

const connect = async () => {
  const MONGO_URI: string | undefined = process.env.MONGO_URI;
  if (!MONGO_URI) {
    throw new Error("MONGO_URI is not defined");
  }
  const connection = await mongoose.connect(MONGO_URI);
  console.info(`connected to database ${connection.connection.host}`);
};

export { connect };
