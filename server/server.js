// Good practice to segregate server codes from main app or index file
const app = require("./app");

const port = 3000;
app.listen(port, () => {
  console.log(`App running on port ${port}`);
});
