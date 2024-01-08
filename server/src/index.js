const express = require("express");
const app = express();
const port = 3000;

const userRoute = require("./routes/userRoute");

app.use(userRoute);

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});
