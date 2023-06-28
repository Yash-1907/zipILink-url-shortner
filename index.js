const express = require("express");
const app = express();
const path = require("path");
const mongoose = require("mongoose");
const methodOverride = require("method-override");
const session = require("express-session");

const Url = require("./models/url");
const User = require("./models/user");

mongoose
  .connect(
    "mongodb+srv://yash:wSC8qp3WYtpXjGSi@ziplink.uncsyvm.mongodb.net/?retryWrites=true&w=majority",
    {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    }
  )
  .then(() => {
    console.log("MONGO Connection open");
  })
  .catch((err) => {
    console.log("Mongo Connection Error");
    console.log(err);
  });

app.set("views", path.join(__dirname, "views"));
app.set("view engine", "ejs");

app.use(express.urlencoded({ extended: true }));
app.use(methodOverride("_method"));
app.use(session({ secret: "notagoodsecret" }));

const requireLogin = (req, res, next) => {
  if (!req.session.user_id) {
    return res.redirect("/login");
  }
  next();
};

app.get("/register", (req, res) => {
  res.render("users/register");
});

app.post("/register", async (req, res) => {
  const { password, username } = req.body;
  const user = new User({
    username,
    password,
  });
  if (await User.findOne({ username })) {
    // alert
    return res.redirect("/register");
  }
  await user.save();
  const foundUser = await User.findOne({ username });
  req.session.user_id = foundUser._id;
  res.redirect("/urls");
});

app.get("/login", (req, res) => {
  res.render("users/login");
});

app.post("/login", async (req, res) => {
  const { username, password } = req.body;
  const foundUser = await User.findAndValidate(username, password);
  if (foundUser) {
    req.session.user_id = foundUser._id;
    res.redirect("/urls");
  } else {
    // alert
    res.redirect("/login");
  }
});

app.post("/logout", (req, res) => {
  req.session.user_id = null;
  res.redirect("/login");
});

app.get("/urls", requireLogin, async (req, res) => {
  var { search } = req.query;
  const userId = req.session.user_id;
  const user = await User.findById(userId);
  var urls;
  if (search) {
    urls = await Url.aggregate([
      {
        $search: {
          index: "search",
          text: {
            query: search,
            path: ["url", "note"],
          },
        },
      },
      {
        $match: {
          userId: userId,
        },
      },
    ]);
  } else {
    urls = await Url.find({ userId: userId });
    search = "search";
  }
  const host = req.get("host");
  res.render("urls/index", { user, urls, host, search });
});

app.get("/urls/new", (req, res) => {
  res.render("urls/new");
});

app.get("/urls/analytics", requireLogin, async (req, res) => {
  var { search } = req.query;
  const userId = req.session.user_id;
  const user = await User.findById(userId);
  var urls;
  if (search) {
    urls = await Url.aggregate([
      {
        $search: {
          index: "search",
          text: {
            query: search,
            path: ["url", "note"],
          },
        },
      },
      {
        $match: {
          userId: userId,
        },
      },
    ]);
  } else {
    urls = await Url.find({ userId: userId });
    search = "search";
  }
  const host = req.get("host");
  res.render("urls/analytics", { user, urls, host, search });
});

app.post("/urls", requireLogin, async (req, res) => {
  const { url, note } = req.body;
  const userId = req.session.user_id;
  const newUrl = new Url({ userId: userId, url: url, note: note, count: 0 });
  await newUrl.save();
  res.redirect("/urls");
});

app.delete("/urls/:id", async (req, res) => {
  const { id } = req.params;
  const deleteUrl = await Url.findByIdAndDelete(id);
  res.redirect("/urls");
});

app.get("/urls/:id", async (req, res) => {
  const { id } = req.params;
  const url = await Url.findById(id);
  const count = url.count + 1;
  await Url.findByIdAndUpdate(id, { count: count });
  res.redirect(url.url);
});

app.get("/", (req, res) => {
  res.render("home");
});

app.listen(3000, () => {
  console.log("Listening");
});
