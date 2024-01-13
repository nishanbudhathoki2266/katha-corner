// Good practice to segregate server codes from main app or index file
const dotenv = require("dotenv");
dotenv.config();

const app = require("./app");

const port = process.env.PORT || 3000;
app.listen(port, () => {
  console.log(`App running on port ${port}`);
});
