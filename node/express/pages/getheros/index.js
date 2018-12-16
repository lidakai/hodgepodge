const { app, conn } = require("../../app");

// 获取所有的数据
app.get("/api/getheros", (req, res) => {
  // 定义SQL语句
  const sqlStr = "SELECT * FROM user";
  conn.query(sqlStr, (err, results) => {
    if (err)
      return res.json({
        code: 1,
        data: null,
        msg: "获取失败"
      });
    res.json({
      code: 0,
      data: results,
      msg: "成功"
    });
  });
});
