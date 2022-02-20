const express = require("express");
const cors = require("cors");
const morgan = require("morgan");
const PORT = process.env.PORT || 5000;
const { User, Blog } = require("./model");
const authRoutes = require("./routes/auth-routes");
const cookieParser = require("cookie-parser");
const multer = require("multer");
const jwt = require("jsonwebtoken");
const app = express();
const path = require("path");

const storage = multer.diskStorage({
  destination: "./uploads/",
  filename: function (req, file, cb) {
    cb(
      null,
      `${new Date().getTime()}-${file.filename}.${file.mimetype.split("/")[1]}`
    );
  },
});
const upload = multer({ storage: storage });

app.use(express.json());
app.use(cookieParser());
app.use(morgan("dev"));
app.use(
  cors({
    origin: ["http://localhost:3000"],
    credentials: true,
  })
);

app.use("/", express.static(path.resolve(path.join(__dirname, "./uploads"))));

app.use("/auth", authRoutes);

app.use((req, res, next) => {
  if (!req.cookies.jToken) {
    res.status(401).send("include http-only credentials with every request");
    return;
  }
  jwt.verify(req.cookies.jToken, "123456", function (err, decodedData) {
    if (!err) {
      var token = jwt.sign(
        {
          id: decodedData.id,
          name: decodedData.name,
          email: decodedData.email,
          role: decodedData.role,
          id: decodedData.id,
        },
        "123456"
      );
      res.cookie("jToken", token, {
        maxAge: 86_400_000,
        httpOnly: true,
      });
      req.body.jToken = decodedData;
      req.headers.jToken = decodedData;
      next();
    } else {
      res.status(401).send("invalid token");
    }
  });
});

app.get("/profile", async (req, res) => {
  // Fine User who is logged in.
  try {
    const user = await User.findById(req.body.jToken.id, "name email role");
    if (user) {
      res.json({
        user,
      });
    } else {
      res.status(500).json({
        message: "server error",
      });
    }
  } catch (err) {
    res.json({
      message: "server error",
    });
  }
});

app.post("/post-blog", upload.any(), (req, res) => {
  console.log("file", req.files[0]);
  try {
    let newBlog = new Blog({
      description: req.body.description,
      picture: req.files[0].filename,
      title: req.body.title,
      username: req.headers.jToken.name,
    });
    newBlog.save();
    res.send({
      message: "Blog created successfully",
    });
  } catch (err) {
    console.log("err", err);
    res.status(500).send({
      message: "server error",
    });
  }
});

app.get("/blogs/:page", async (req, res) => {
  const { page } = req.params;
  console.log("params", page);
  try {
    const blogs = await Blog.find({})
      .skip(page * 7)
      .limit(7);
    res.send({
      message: "fetched blogs successfully",
      blogs,
    });
  } catch (err) {
    res.status(500).send({
      message: "server error",
    });
  }
});
app.get("/blogById/:id", async (req, res) => {
  const { id } = req.params;
  try {
    const blog = await Blog.findById(id);
    res.send({
      message: "fetched blogs successfully",
      blog,
    });
  } catch (err) {
    res.status(500).send({
      message: "server error",
    });
  }
});
app.delete("/blog", async (req, res) => {
  const { id } = req.body;
  console.log("id", id);
  try {
    const blog = await Blog.findOneAndRemove({ _id: id });
    res.send({
      message: "deleted successfully",
      blog,
    });
  } catch (err) {
    res.status(500).send({
      message: "server error",
    });
  }
});

app.post("/logout", (req, res) => {
  console.log("cookie");
  res.clearCookie("jToken");

  return res.json({
    message: "logout successfully",
  });
});

app.listen(PORT, () => {
  console.log("server listening on ", PORT);
});
