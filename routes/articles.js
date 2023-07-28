const express = require("express");
const Article = require("../model/articles")
const router = express.Router();

router.get("/new", (req, res) => {
    res.render("articles/new")
})

router.get("/", async (req, res) => {
    const article = await Article.find({})
    res.send(article).status(201);
})

router.post("/",async (req, res) => {
    console.log("req.body", req.body);
    try {
        const article = new Article({
            title: req.body.title,
            description: req.body.description,
            markdown: req.body.markdown
        }) 

        await article.save();
        res.redirect("/")
    }catch(err) {
        res.send().status()
    }
})


module.exports = router;