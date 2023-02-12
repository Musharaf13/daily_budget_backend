const app = require("./app");

process.env.TZ = "Asia/Karachi";
const port = process.env.port || 4000;
const localhost = "192.168.0.21";
app.listen(port, localhost, () => {
  console.log("server running at: http://" + localhost + ":" + port);
});
