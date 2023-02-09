const app = require("./app");

process.env.TZ = "Asia/Karachi";
const port = process.env.port || 4000;
app.listen(port, "192.168.0.21", () => {
  console.log("server running at: http://localhost:" + port);
});
