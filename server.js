const express = require("express");
const mongoose = require("mongoose");
const bodyParser = require("body-parser")
const articleRouter = require("./routes/articles");
const app = express();

app.use(bodyParser.urlencoded({extended: false}));

let db = mongoose.connect('mongodb://localhost:27017/blog')

app.set("view engine", "ejs")

app.use("/articles", articleRouter)

app.get("/", (req, res) => {
    const articles = [{
        title: "Test Article",
        createdAt: new Date(),
        description: "Test description"
    },
    {
        title: "Test Article 2",
        createdAt: new Date(),
        description: "Test description 2"
    }
]
    res.render("articles/index", { articles: articles });
})

app.listen(5000, () => {
    console.log("server started at", process.env.PORT || 5000 )
})
