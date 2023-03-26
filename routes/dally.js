import express from "express";
import * as dotenv from "dotenv";
import { Configuration, OpenAIApi } from "openai";

dotenv.config();
const config = new Configuration({
  apiKey: process.env.API_KEY,
});
const openAi = new OpenAIApi(config);
const route = express.Router();

route.get("/", (req, res) => {
  res.status(200).send("hello from ai");
});
route.post("/", async (req, res) => {
  try {
    const { prompt } = req.body;
    const AiResponse = await openAi.createImage({
      prompt,
      n: 1,
      size: "1024x1024",
      response_format: "b64_json",
    });
    const image = AiResponse.data.data[0].b64_json;

    res.status(200).json({ photo: image });
  } catch (error) {
    res.status(500).send(error?.response.data.error.message);
  }
});
export default route;
