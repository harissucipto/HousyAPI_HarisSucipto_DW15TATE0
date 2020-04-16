require("dotenv").config();
const express = require("express");
const router = require("./routes");

const port = process.env.PORT || 5000;
const app = express();

app.use("/api/v1", router);

app.listen(port, () => console.log(`Server is running in port ${port}`));
