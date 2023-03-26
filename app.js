import express from "express";
import * as dotenv from "dotenv";
import cors from "cors";
import postRoutes from "./routes/posts.js";
import dallyRoutes from "./routes/dally.js";
import connectDb from "./mongodb/connect.js";

dotenv.config();

const app = express();

app.use(express.json({ limit: "50mb" }));
app.use(cors());

app.use("/api/v1/post", postRoutes);
app.use("/api/v1/dally", dallyRoutes);

app.get("/", (req, res) => {
  res.send("Hello from ai");
});
const startServer = async () => {
  try {
    await connectDb(process.env.MONGODB_URL);
    app.listen(8000, () => {
      console.log("server started at port 8000");
    });
  } catch (error) {
    console.log(error);
  }
};
startServer();

module.exports = app;
