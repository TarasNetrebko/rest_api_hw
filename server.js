const app = require("./app");
const mongoose = require("mongoose");
require("dotenv").config();

const { DB_PHONEBOOK, PORT } = process.env;

mongoose
  .connect(DB_PHONEBOOK)
  .then(() =>
    app.listen(PORT, () => console.log("Database connection successful"))
  )
  .catch((error) => {
    console.log(error.message);
    process.exit(1);
  });
