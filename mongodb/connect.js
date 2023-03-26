import mongoose from "mongoose";

const connectDb = async (url) => {
  mongoose.set("strictQuery", true);

  mongoose.connect(url).then(() => console.log("connected to mongodb"));
};

export default connectDb;
