const express = require('express');
const bodyParser = require('body-parser');
const methodOverride = require('method-override');
require("dotenv").config();
const Router = require("./routers/client/index.router");
const routerAdmin = require("./routers/admin/index.router");
const database = require("./config/database");
const systemConfig = require("./config/system");
const mongoose = require('mongoose');
const app = express();
const port = process.env.PORT;
app.use(methodOverride("_method"));
app.use(bodyParser.urlencoded({ extended: false }));
Router(app);
routerAdmin(app);
database.connect();


app.set("views", "./views");
app.set("view engine", "pug");
app.use(express.static('public'));

app.locals.prefixAdmin = systemConfig.prefixAdmin;
app.listen(port, () => {
    console.log(`App listening port ${port}`);
})