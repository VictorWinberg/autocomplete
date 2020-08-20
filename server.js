const express = require("express");
const path = require("path");
const app = express();

const PORT = 3009;

app.use(express.static(path.resolve(__dirname, "dist")));

app.listen(PORT, () => console.log(`Jayway app running on port ${PORT}!`));
