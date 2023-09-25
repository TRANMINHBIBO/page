const express = require('express');
const app = express();
require("dotenv").config();
const port = process.env.PORT;
const Router = require("./routers/client/index.router");
Router(app);
app.set("views", "./views");
app.set("view engine", "pug");
app.use(express.static('public'))
app.listen(port, () => {
    console.log(`App listening port ${port}`);
})