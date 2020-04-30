const express = require("express");
const path = require("path");
const app = express();
const bodyParser = require("body-parser");
const Joi = require("joi");
const PORT = process.env.PORT || 3000;

//const arrayString = ["banana", "bacon", "cheese"];
const arrayObjects = [
  { example: "example1" },
  { example: "example2" },
  { example: "example3" },
];
const userInput = {
  personalInfo: {
    streetAddress: "123988791",
    city: "Los Angeles",
    state: "CA",
  },
  preferences: arrayObjects,
};

const personalInfoSchema = Joi.object().keys({
  streetAddress: Joi.string().trim().required(),
  city: Joi.string().trim().required(),
  state: Joi.string().trim().length(2).required(),
});
//const preferenceSchema = Joi.array().items(Joi.string().trim());
const preferenceSchema = Joi.array().items(
  Joi.object().keys({
    example: Joi.string().trim().required(),
  })
);
const userInputSchema = Joi.object().keys({
  personalInfo: personalInfoSchema,
  preferences: preferenceSchema,
});

app.use("/public", express.static(path.join(__dirname, "/public")));
app.set("view engine", "ejs");
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

//custom middleware
//app.use('/example',(req, res, next) => {
app.use((req, res, next) => {
  console.log(req.url, req.method);
  next();
});

const people = require("./routes/people");
app.use("/people", people);

app.get("/", (req, res) => {
  res.sendFile(path.join(__dirname, "/public/index.html"));
  //res.render("index");
});

app.get("/:userQuery", (req, res) => {
  res.render("index", {
    data: {
      userQuery: req.params.userQuery,
      searchResults: ["book1", "book2", "book3"],
      loggedIn: true,
      username: "Ken",
    },
  });
});

app.post("/", async (req, res) => {
  console.log(req.body);
  //blueprint for email/password
  const schema = Joi.object().keys({
    email: Joi.string().trim().email().required(),
    password: Joi.string().trim().min(5).max(10).required(),
  });
  let result = await Joi.validate(req.body, schema);
  if (result.err) {
    console.log(err);
    res.send("an error has occurred");
  } else {
    console.log(result);
    res.send("successfully posted data");
  }
  // database work here
  //res.json({ success: true });
});

app.get("/example", (req, res) => {
  res.send("hitting example route");
});

app.get("/example/:name/:age", (req, res) => {
  console.log(req.params);
  console.log(req.query);
  res.send(req.params.name + " : " + req.params.age);
});

app.listen(PORT, () => {
  console.log("express server running...");
});
