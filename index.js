const express = require('express');
const app = express();
require("dotenv").config();
const mongoose = require('mongoose');
const port = process.env.PORT;
const Router = require("./routers/client/index.router");
const routerAdmin = require("./routers/admin/index.router");
const database = require("./config/database");
Router(app);
routerAdmin(app);
database.connect();
app.set("views", "./views");
app.set("view engine", "pug");
app.use(express.static('public'))
app.listen(port, () => {
    console.log(`App listening port ${port}`);
})