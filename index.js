const app = require("./app");

process.env.TZ = "Asia/Karachi";
const port = process.env.port || 3000;
app.listen(port, () => {
  console.log("server running at: http://localhost:" + port);
});
