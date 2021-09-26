import express from "express";
import mongoose from "mongoose";
import cors from "cors";
import dbCards from "./models/dbCards.js";
import User from "./models/userModel.js";
import dotenv from "dotenv";
import bcrypt from "bcryptjs";
import expressAsyncHandler from "express-async-handler";
import { generateToken, isTokenAuth, forgotPasswordToken } from "./utils.js";
import Order from "./models/orderModels.js";
import Razorpay from "razorpay";
import axios from "axios";
import shortid from "shortid";
import nodemailer from "nodemailer";
import sendgridTransport from "nodemailer-sendgrid-transport";
import httpServer from "http";
import { Server } from "socket.io";
import Comment from "./models/commentModel.js";
import { generateUploadURL, deleteUrl } from "./s3.js";

dotenv.config();

const app = express();

//middlewares
app.use(express.json());
app.use(cors());

const http = httpServer.createServer(app);
const io = new Server(http, { cors: { origin: "*" } });

// socket-io
let users = [];

io.on("connection", (socket) => {
  // console.log(socket.id + "connected.");

  socket.on("joinRoom", (productId) => {
    const user = { userId: socket.id, room: productId };

    const check = users.every((user) => user.userId !== socket.id);

    if (check) {
      users.push(user);
      socket.join(user.room);
    } else {
      users.map((singleUser) => {
        if (singleUser.userId === socket.id) {
          if (singleUser.room !== productId) {
            socket.leave(singleUser.room);
            socket.join(productId);
            singleUser.room = productId;
          }
        }
      });
    }
  });

  socket.on("createComment", async (msg) => {
    const { username, content, product_id, rating, user_id, createdAt } = msg;

    const newComment = new Comment({
      username,
      content,
      product_id,
      rating,
      user_id,
      createdAt,
    });
    await newComment.save();

    io.to(newComment.product_id).emit("sendCommentToClient", newComment);
  });

  // socket.on("disconnect", () => {
  //   console.log(socket.id + "disconnected");
  // });
});

mongoose.connect(process.env.MONGODB_URL, {
  useNewUrlParser: true,
  useCreateIndex: true,
  useUnifiedTopology: true,
  useFindAndModify: false,
});

// NODEMAILER
const transporter = nodemailer.createTransport(
  sendgridTransport({
    auth: { api_key: process.env.SEND_GRID_KEY },
  })
);

// RAZORPAY
const razorpay = new Razorpay({
  key_id: process.env.RAZORPAY_CLIENT_ID,
  key_secret: process.env.RAZORPAY_KEY_SECRET,
});

app.post("/razorpay", async (req, res) => {
  const user_id = req.query.id;
  const token = req.query.value;

  const payment_capture = 1;
  var val = 0;
  const currency = "INR";

  try {
    const { data } = await axios.get(
      `http://localhost:${process.env.PORT}/api/orders/${user_id}`,
      {
        headers: { Authorization: `Bearer ${token}` },
      }
    );
    //console.log("order details >>>>>", data);
    val = data.totalPrice * 100;
  } catch (error) {
    console.log(error);
  }

  const options = {
    amount: val.toFixed(),
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

app.post(
  "/cardUpload",
  isTokenAuth,
  expressAsyncHandler(async (req, res) => {
    try {
      const { title, price, p, category, src } = req.body;
      if (!src)
        return res.status(400).send({ message: "Image upload is mandetory" });

      const product = new dbCards({
        title: title.toLowerCase(),
        price,
        p,
        category,
        src,
      });
      await product.save();
      res.send("created product");
    } catch (err) {
      res.status(500).send({ message: "Cannot create product" });
    }
  })
);

app.get(
  "/cardUpload",
  expressAsyncHandler(async (req, res) => {
    try {
      const features = new APIfeatures(dbCards.find(), req.query)
        .filtering()
        .sorting();
      const products = await features.query;

      res.send({ result: products.length, products: products });
    } catch (err) {
      return res.status(500).send({ message: err.message });
    }
  })
);

app.get("/cardUpload/:id", function (req, res) {
  dbCards.findById({ _id: req.params.id }, function (err, founddata) {
    if (err) {
      res.status(404).send({ message: "Product not found" });
    } else {
      res.send(founddata);
    }
  });
});

app.put(
  "/cardUpload/:id",
  isTokenAuth,
  expressAsyncHandler(async (req, res) => {
    try {
      const { title, price, p, category, src } = req.body;
      if (!src)
        return res.status(400).send({ message: "Image upload is mandetory" });

      await dbCards.findOneAndUpdate(
        { _id: req.params.id },
        {
          title: title.toLowerCase(),
          price,
          p,
          category,
          src,
        }
      );
      res.send("Updated Product");
    } catch (err) {
      res.status(500).send({ message: "Cannot Update product" });
    }
  })
);

app.delete(
  "/cardUpload/:id",
  isTokenAuth,
  expressAsyncHandler(async (req, res) => {
    try {
      await dbCards.findByIdAndDelete(req.params.id);
      res.send("Deleted Product");
    } catch (err) {
      res.status(500).send({ message: "Cannot Update product" });
    }
  })
);

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

// Forgot Password
app.post(
  "/api/users/resetpassword",
  expressAsyncHandler(async (req, res) => {
    const findUser = await User.findOne({ email: req.body.email });
    if (findUser) {
      const legit = forgotPasswordToken(findUser);

      res.send({ _id: findUser._id, email: findUser.email });
      transporter.sendMail({
        to: findUser.email,
        from: "souradeepgharami2000@gmail.com",
        subject: "Forgot Password",
        html: `<h1>Hi ${findUser.name}, the reset password link is only valid for 10 minutes only!</h1>
            <p>You are requested to change your password within this interval.</p>
            <h4>Click <a href="http://localhost:3000/reset/${findUser._id}/${legit}">here</a> to reset your password</h4>
            `,
      });

      return;
    }
    res.status(401).send({
      message: "User with this email doesn't exists",
    });
  })
);

app.post(
  "/api/users/newpassword",
  isTokenAuth,
  expressAsyncHandler(async (req, res) => {
    console.log(req.body._id);
    const user = await User.findById(req.body._id);
    if (user) {
      user.password = bcrypt.hashSync(req.body.password, 11);
      const updatedUser = await user.save();
      res.send({
        _id: updatedUser._id,
        name: updatedUser.name,
        email: updatedUser.email,
        admin: updatedUser.isAdmin,
        token: generateToken(updatedUser),
      });
      return;
    }
    res.status(401).send({
      message: "Try again session has been expired",
    });
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
      transporter.sendMail({
        to: createdUser.email,
        from: "souradeepgharami2000@gmail.com",
        subject: "Registered successfully",
        html: `<h1>Welcome ${createdUser.name} to Art-Aficionado</h1>`,
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

// update product rating when user comment
app.patch(
  "/api/product/reviews/:id",
  isTokenAuth,
  expressAsyncHandler(async (req, res) => {
    const rating = req.body.rating;
    if (rating && rating !== 0) {
      const product = await dbCards.findById({ _id: req.params.id });
      if (product) {
        let num = product.numReviews;
        let rate = product.star;
        await dbCards.findOneAndUpdate(
          { _id: req.params.id },
          {
            star: rate + rating,
            numReviews: num + 1,
          }
        );
        res.send({ rating });
      } else {
        res.status(404).send({ message: "Product not found" });
      }

      return;
    }
    res.status(401).send({ message: "You cannot rate this product" });
  })
);

//infinite scrolling , sorting , filtering and finding  feature

class APIfeatures {
  constructor(query, queryString) {
    this.query = query;
    this.queryString = queryString;
  }

  pagination() {
    const page = this.queryString.page * 1 || 1;
    const limit = this.queryString.limit * 1 || 3;
    const skip = (page - 1) * limit;
    this.query = this.query.skip(skip).limit(limit);
    return this;
  }

  filtering() {
    const queryObj = { ...this.queryString }; //queryString = req.query
    //console.log(queryObj);
    const excludedFields = ["page", "sort", "limit"];
    excludedFields.forEach((element) => delete queryObj[element]); //after search delete page
    //console.log(queryObj);

    let queryStr = JSON.stringify(queryObj);

    queryStr = queryStr.replace(
      /\b(gte|gt|lt|lte|regex)\b/g,
      (match) => "$" + match
    );
    //console.log({ queryStr });

    //gte = greater than or equal , lte=less than or equal
    this.query.find(JSON.parse(queryStr));
    return this;
  }

  sorting() {
    if (this.queryString.sort) {
      const sortBy = this.queryString.sort.split(",").join("");

      this.query = this.query.sort(sortBy);
    } else {
      this.query = this.query.sort("-createdAt");
    }
    return this;
  }
}

// get all comments associated with a product

app.get(
  "/api/comments/:id",
  expressAsyncHandler(async (req, res) => {
    const features = new APIfeatures(
      Comment.find({ product_id: req.params.id }),
      req.query
    )
      .sorting()
      .pagination();

    const comments = await features.query;
    if (comments) {
      res.send({ result: comments.length, comments });
    } else {
      res.status(404).send({ message: "Comments not found" });
    }
  })
);

// get image from bucket
app.get(
  "/s3Url",
  expressAsyncHandler(async (req, res) => {
    const url = await generateUploadURL();
    res.send({ url });
  })
);

app.post(
  "/s3Url",
  expressAsyncHandler(async (req, res) => {
    const imgName = req.body.images;
    deleteUrl(imgName);
    res.send("ok");
  })
);

http.listen(process.env.PORT || 8069, function () {
  console.log(`server is up and running on port : ${process.env.PORT}`);
});
