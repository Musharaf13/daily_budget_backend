app.post("/add", async (req, res) => {
  const { categoryId, amount, description, userId } = req.body;

  console.log("req body");

  console.log(req.body);

  var query = `INSERT INTO public.expenses(
         category_id, amount, description, user_id, created_at)
        VALUES (${categoryId}, ${amount}, '${description}', ${userId}, '${utils.calTime()}');`;
  console.log(query);
  pool.query(query, (error, result) => {
    if (!error) {
      res.send({
        status: true,
        data: result.rows,
      });
    } else {
      res.send({
        status: false,
        message: "Failed to add Expense" + error.message,
      });
    }
  });
});
