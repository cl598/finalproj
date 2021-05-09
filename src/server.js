const express = require("express");
const { join } = require("path");
const bodyParser = require("body-parser");
const cors = require("cors");
const db = require("./app/models");
const app = express();

var corsOptions = {
    origin: "http://localhost:8081"
};

app.use(express.static(join(__dirname, "public")));

// parse requests of content-type - application/json
app.use(bodyParser.json());

// parse requests of content-type - application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: true }));

// simple route
app.get("/auth_config.json", (req, res) => {
    res.sendFile(join(__dirname, "auth_config.json"));
});

app.get("/*", (_, res) => {
    res.sendFile(join(__dirname, "index.html"));
});

// set port, listen for requests
const PORT = process.env.PORT || 8080;
app.listen(3000, () => console.log("Application running on port 3000"));

db.sequelize.sync({ force: true }).then(() => {
    console.log("Drop and re-sync db.");
});