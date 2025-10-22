// // server.js
// const express = require("express");
// const cors = require("cors");
// const mysql = require("mysql2");
// const app = express();
// const PORT = 4000;
//
// app.use(cors());
// app.use(express.json());
//
// const db = mysql.createConnection({
//   host: "localhost",
//   user: "root",
//   password: "asd031744",
//   database: "exmydb"
// })
//
// // 전체 게시글 목록
// app.get("/board", (req, res) => {
//   db.query("SELECT id, name, content, DATE_FORMAT(created, '%Y-%m-%d %H:%i:%s') AS created, DATE_FORMAT(modified, '%Y-%m-%d %H:%i:%s') AS modified FROM board", (err, results) => {
//     if (err) return res.status(500).send("DB 조회 실패");
//     res.status(200).json(results);
//   })
// });
//
// // 게시글 추가
// app.post("/board", (req, res) => {
//   const { name, content } = req.body;
//   db.query("INSERT INTO board (name, content) VALUES (?, ?)", [name, content], (err, results) => {
//     console.log(err);
//     if (err) return res.status(500).send("DB 저장 실패");
//     res.status(201).json({id: results.insertId, name:name, content:content});
//   });
// });
//
// // 게시글 삭제
// app.delete("/board/:id", (req, res) => {
//   const id = parseInt(req.params.id);
//   db.query("DELETE FROM board where id = ?", [id], (err, results) => {
//    if (err) return res.status(500).send("DB 삭제 실패");
//    res.status(200).json({message: "삭제완료", id})
//   })
// })
//
// // 게시글 수정
// app.put("/board/:id", (req, res) => {
//   const id = parseInt(req.params.id);
//   const { name, content } = req.body;
//   db.query("UPDATE board SET title = ?, content = ? where id = ?", [name, content, id], (err, result) => {
//     if (err) return res.status(500).send("DB 수정 실패");
//     res.status(200).json({message: "수정완료", id})
//   })
// })
//
// app.listen(PORT, () => {
//   console.log(`✅ API 서버 실행 중: http://localhost:${PORT}`);
// });
// server.js
const express = require("express");
const cors = require("cors");
const app = express();
const PORT = process.env.PORT || 4000;

app.use(cors());
app.use(express.json());

app.get("/", (req, res) => {
  res.send("✅ Render Express 서버 정상 실행 중");
});

app.listen(PORT, () => {
  console.log(`✅ 서버 실행 중: ${PORT}`);
});