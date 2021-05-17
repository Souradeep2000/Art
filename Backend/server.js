import express from "express";
import mongoose from "mongoose";
import cors from "cors";
import dbCards from "./models/dbCards.js";
import User from "./models/userModel.js";
import dotenv from "dotenv";
import bcrypt from "bcryptjs";
import expressAsyncHandler from "express-async-handler";
import { generateToken } from "./utils.js";

dotenv.config();

const app = express();

//middlewares
app.use(express.json());
app.use(cors());

mongoose.connect(process.env.MONGODB_URL, {
  useNewUrlParser: true,
  useCreateIndex: true,
  useUnifiedTopology: true,
});

app.get("/", function (req, res) {
  res.send("HEllo world");
});

// for cards

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
      res.status(400).send(err);
    } else {
      res.send(founddata);
    }
  });
});

app.get("/cardUpload/:id", function (req, res) {
  dbCards.findById({ _id: req.params.id }, function (err, founddata) {
    if (err) {
      res.status(404).send({ message: "Product not found" });
    } else {
      res.send(founddata);
    }
  });
});

// for Users

app.post("/api/users", function (req, res) {
  const userDetails = req.body;
  for (let i = 0; i < userDetails.length; i++) {
    userDetails[i].password = bcrypt.hashSync(userDetails[i].password, 9);
  }
  User.create(userDetails, function (err, createdUser) {
    if (err) {
      res.status(500).send(err);
    } else {
      res.send(createdUser);
    }
  });
});

app.get("/api/users", function (req, res) {
  User.find(function (err, foundUser) {
    if (err) {
      res.status(404).send(err);
    } else {
      res.send(foundUser);
    }
  });
});

//for  users login

app.post(
  "/api/users/signin",
  expressAsyncHandler(async (req, res) => {
    const user = await User.findOne({ email: req.body.email });
    if (user) {
      if (bcrypt.compareSync(req.body.password, user.password)) {
        res.send({
          _id: user._id,
          name: user.name,
          email: user.email,
          isAdmin: user.isAdmin,
          token: generateToken(user),
        });
        return;
      }
    }
    res.status(401).send({ message: "Invalid email or password" });
  })
);

// for user register
app.post(
  "/api/users/register",
  expressAsyncHandler(async (req, res) => {
    const user = new User({
      name: req.body.name,
      email: req.body.email,
      password: bcrypt.hashSync(req.body.password, 9),
    });
    const createdUser = await user.save();
    if (createdUser) {
      res.send({
        _id: createdUser._id,
        name: createdUser.name,
        email: createdUser.email,
        isAdmin: createdUser.isAdmin,
        token: generateToken(createdUser),
      });
    } else {
      res.status(500).send({ message: "Fill all the details correct" });
    }
  })
);

const port = process.env.PORT;
app.listen(port, function () {
  console.log(`server is up and running on port : ${port}`);
});
