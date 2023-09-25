const express = require('express');
const app = express();
const port = 3000;
const Router = require("./routers/client/index.router");
Router(app);
app.set("views", "./views");
app.set("view engine", "pug");
app.listen(port, () => {
    console.log(`App listening port ${port}`);
})