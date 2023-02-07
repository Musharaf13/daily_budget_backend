app.post("/", async (req, res) => {
  // console.log(pooolObj);
  pool.query("select  * from users", (error, result) => {
    if (!error) {
      res.send({
        status: true,
        data: result.rows,
      });
    } else {
      res.send({
        status: false,
        message: "Failed to find the user " + error.message,
      });
    }
  });
});
