const express = require("express");
const app = express();
const port = process.env.PORT || 2000;
const path = require('path');
require("./db/conn");
const User = require("./models/usermessage");

// const mongoose = require('mongoose');
const hbs = require('hbs');

// app.use(express.json);
app.use(express.urlencoded({ extended: false }));

const staticPath = path.join(__dirname, "../public");
const partialPath = path.join(__dirname, "../templates/partials");
const viewPath = path.join(__dirname, "../templates/views");
console.log(partialPath);

app.use(express.static(staticPath));
app.set("view engine", "hbs");
app.set("views", viewPath);
hbs.registerPartials(partialPath);

app.get("/", (req, res) => {
    res.render("index");
})

app.post("/contact", async (req, res) => {

    try {
        const user = new User(req.body);
        await user.save();

    } catch (error) {
        console.log(error).status(500);
    }



})

app.listen(port, () => {
    console.log(`program is running at port ${port}`);
})