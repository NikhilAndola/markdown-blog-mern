const express = require("express");
const app = express();
const bodyParser = require("body-parser")
const methodOverride = require("method-override")

const Article = require("./model/articles")

// app.use(bodyParser.urlencoded({extended: false}));
app.use(express.urlencoded({extended: false}));
app.use(methodOverride('_method'));

const articleRouter = require("./routes/articles");

const dotenv = require("dotenv");
dotenv.config();

const mongoose = require("mongoose");
// const {MongoClient} = require("mongodb")

// const password = encodeURIComponent("<password>");
// let db = mongoose.connect('mongodb://localhost:27017/blog');

// const db = new MongoClient(process.env.MONGO_URI)
// db.connect().then(() => {
//     console.log("connected successfully!");
// })

let db = mongoose.connect(process.env.MONGO_URI);


app.set("view engine", "ejs")

app.get("/", async (req, res) => {

    // const {title, createdAt, description} = await Article.find({})
    const articles = await Article.find({}).sort({createdAt: 'desc' })
    res.header('Access-Control-Expose-Headers', 'X-Total-Count')
    res.header('X-Total-Count', articles.length)

    res.render("articles/index", { articles: articles });
})

app.use("/articles", articleRouter)

app.listen(process.env.PORT || 5001, () => {
    console.log("server started at", process.env.PORT || 5001 )
})
