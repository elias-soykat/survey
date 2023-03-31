const express = require("express");
require("dotenv").config();
const error = require("./src/middleware/error.middleware");
const routes = require("./src/routes");

// express app
const app = express();
const port = 5000;
app.use(express.json());

// route
app.use("/api/v1", routes);

// error middleware
app.use(error.notFound);
app.use(error.errorHandler);

app.listen(port, () => console.log(`server running on ${port}`));

module.exports = app;
