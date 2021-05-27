import express from "express";
import mongoose from "mongoose";
import cors from "cors";
import dbCards from "./models/dbCards.js";
import User from "./models/userModel.js";
import dotenv from "dotenv";
import bcrypt from "bcryptjs";
import expressAsyncHandler from "express-async-handler";
import { generateToken, isTokenAuth } from "./utils.js";
import Order from "./models/orderModels.js";
import Razorpay from "razorpay";
import axios from "axios";
import shortid from "shortid";

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

// RAZORPAY
const razorpay = new Razorpay({
  key_id: process.env.RAZORPAY_CLIENT_ID,
  key_secret: process.env.RAZORPAY_KEY_SECRET,
});

app.post("/razorpay", async (req, res) => {
  const user_id = req.query.id;
  const token = req.query.value;

  const payment_capture = 1;
  let val = 0;
  const currency = "INR";

  try {
    const { data } = await axios.get(
      `http://localhost:${process.env.PORT}/api/orders/${user_id}`,
      {
        headers: { Authorization: `Bearer ${token}` },
      }
    );
    //console.log("order details >>>>>", data);
    val = data.totalPrice;
  } catch (error) {
    console.log(error);
  }
  console.log(val);
  const options = {
    amount: val * 100,
    currency,
    receipt: shortid.generate(),
    payment_capture,
  };

  try {
    const response = await razorpay.orders.create(options);
    res.json({
      _id: response.id,
      currency: response.currency,
      amount: response.amount,
    });
  } catch (error) {
    console.log(error);
  }
});
app.get("/api/config/razorpay", function (req, res) {
  res.send(process.env.RAZORPAY_CLIENT_ID);
});

app.post("/api/pay/verification", (req, res) => {
  res.json({ status: "ok" });
});

// paypal

app.get("/api/config/paypal", function (req, res) {
  res.send(process.env.PAYPAL_CLIENT_ID);
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

// for every Users

app.post("/api/users", function (req, res) {
  const userDetails = req.body;
  for (let i = 0; i < userDetails.length; i++) {
    userDetails[i].password = bcrypt.hashSync(userDetails[i].password, 11);
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

//login
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

//register
app.post(
  "/api/users/register",
  expressAsyncHandler(async (req, res) => {
    const user = new User({
      name: req.body.name,
      email: req.body.email,
      password: bcrypt.hashSync(req.body.password, 11),
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

// get a user by id
app.get(
  "/api/users/:id",
  expressAsyncHandler(async (req, res) => {
    const user = await User.findById(req.params.id);
    if (user) {
      res.send(user);
    } else {
      res.status(404).send({ message: "User does n't exists" });
    }
  })
);

//update profile
app.put(
  "/api/users/profile",
  isTokenAuth,
  expressAsyncHandler(async (req, res) => {
    const user = await User.findById(req.user._id);
    if (user) {
      user.name = req.body.name || user.name;
      if (req.body.password) {
        user.password = bcrypt.hashSync(req.body.password, 11);
      }
      const updatedUser = await user.save();
      res.send({
        _id: updatedUser._id,
        name: updatedUser.name,
        email: updatedUser.email,
        admin: updatedUser.isAdmin,
        token: generateToken(updatedUser),
      });
    }
  })
);

// Order Api
app.post(
  "/api/orders",
  isTokenAuth,
  expressAsyncHandler(async (req, res) => {
    if (req.body.orderItems.length === 0) {
      res.status(400).send({ message: "Cart is empty" });
    } else {
      const order = new Order({
        orderItems: req.body.orderItems,
        shippingAddress: req.body.shippingAddress,
        paymentMethod: req.body.paymentMethod,
        itemsPrice: req.body.itemsPrice,
        shippingPrice: req.body.shippingPrice,
        taxPrice: req.body.taxPrice,
        totalPrice: req.body.totalPrice,
        user: req.user._id,
      });
      const generatedOrder = await order.save();
      res
        .status(201)
        .send({ message: "New Order Created", order: generatedOrder });
    }
  })
);

//user's order
app.get(
  "/api/orders/items",
  isTokenAuth,
  expressAsyncHandler(async (req, res) => {
    const orders = await Order.find({ user: req.user._id });
    res.send(orders);
  })
);

//details of a order
app.get(
  "/api/orders/:id",
  isTokenAuth,
  expressAsyncHandler(async (req, res) => {
    const getOrder = await Order.findById(req.params.id);
    if (getOrder) {
      res.send(getOrder);
    } else {
      res.status(404).send({ message: "Order doesn't exist" });
    }
  })
);

// for payment success
app.put(
  "/api/orders/:id/pay",
  isTokenAuth,
  expressAsyncHandler(async (req, res) => {
    const order = await Order.findById(req.params.id);
    if (order) {
      order.isPaid = true;
      order.paidAt = Date.now();
      order.paymentResult = {
        id: req.body.id,
        status: req.body.status,
        update_time: req.body.update_time,
        email_address: req.body.email_address,
      };
      const updatedOrder = await order.save();
      res.send({ message: "Order Paid", order: updatedOrder });
    } else {
      res.status(404).send({ message: "Order Not Found" });
    }
  })
);

const port = process.env.PORT;
app.listen(port, function () {
  console.log(`server is up and running on port : ${port}`);
});
