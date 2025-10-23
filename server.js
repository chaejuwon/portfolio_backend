// server.js
const express = require("express");
const cors = require("cors");
const { Pool } = require("pg");
require("dotenv").config();

const app = express();
const PORT = process.env.PORT || 4000;

app.use(cors());
app.use(express.json());

const db = new Pool({
  host: process.env.DB_HOST,
  user: process.env.DB_USER,
  password: process.env.DB_PASS,
  database: process.env.DB_NAME,
  port: 5432,
  ssl: false
});

// ✅ 연결 테스트 (로그)
db.connect()
  .then(() => console.log("✅ PostgreSQL 연결 성공"))
  .catch((err) => console.error("❌ DB 연결 실패:", err));

// ✅ 전체 게시글 목록
app.get("/board", async (req, res) => {
  try {
    const result = await db.query(`
      SELECT id, name, content, TO_CHAR(created, 'YYYY-MM-DD HH24:MI:SS') AS created,
             TO_CHAR(modified, 'YYYY-MM-DD HH24:MI:SS') AS modified 
      FROM board
      ORDER BY id DESC
    `);
    res.status(200).json(result.rows);
  } catch (err) {
    console.error(err);
    res.status(500).send("DB 조회 실패");
  }
});

// ✅ 게시글 추가
app.post("/board", async (req, res) => {
  const { name, content } = req.body;
  try {
    const result = await db.query(
      "INSERT INTO board (name, content) VALUES ($1, $2) RETURNING id, name, content",
      [name, content]
    );
    res.status(201).json(result.rows[0]);
  } catch (err) {
    console.error(err);
    res.status(500).send("DB 저장 실패");
  }
});

// ✅ 게시글 삭제
app.delete("/board/:id", async (req, res) => {
  const id = parseInt(req.params.id);
  try {
    await db.query("DELETE FROM board WHERE id = $1", [id]);
    res.status(200).json({ message: "삭제 완료", id });
  } catch (err) {
    console.error(err);
    res.status(500).send("DB 삭제 실패");
  }
});

// ✅ 게시글 수정
app.put("/board/:id", async (req, res) => {
  const id = parseInt(req.params.id);
  const { name, content } = req.body;
  try {
    await db.query(
      "UPDATE board SET name = $1, content = $2, modified = NOW() WHERE id = $3",
      [name, content, id]
    );
    res.status(200).json({ message: "수정 완료", id });
  } catch (err) {
    console.error(err);
    res.status(500).send("DB 수정 실패");
  }
});

app.listen(PORT, () => {
  console.log(`${PORT}`);
});
