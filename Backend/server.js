import express from "express";
import mongoose from "mongoose";
import cors from "cors";
import dbCards from "./models/dbCards.js";

const app = express();

//middlewares
app.use(express.json());
app.use(cors());

const connection_url =
  "mongodb+srv://admin:Souro2000@@cluster0.64ftu.mongodb.net/AficionadoDB?retryWrites=true&w=majority";
mongoose.connect(connection_url, {
  useNewUrlParser: true,
  useCreateIndex: true,
  useUnifiedTopology: true,
});

app.get("/", function (req, res) {
  res.send("HEllo world");
});

app.post("/cardUpload", function (req, res) {
  const cardDetails = req.body;
  dbCards.create(cardDetails, function (err, createddata) {
    if (err) {
      res.send(err);
    } else {
      res.send(createddata);
    }
  });
});
app.get("/cardUpload", function (req, res) {
  dbCards.find(function (err, founddata) {
    if (err) {
      res.send(err);
    } else {
      res.send(founddata);
    }
  });
});

app.listen(process.env.PORT || 8080, function () {
  console.log("server is up and running on port 8080");
});
