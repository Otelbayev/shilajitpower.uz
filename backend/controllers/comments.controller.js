import db from "../db.js";

class CommentsController {
  // Hammasini til bo‘yicha olish
  async getAll(req, res) {
    try {
      const lang = req.query.lang || "uz";
      const [rows] = await db.query(
        "SELECT * FROM comments WHERE language_code = ?",
        [lang]
      );
      res.json(rows);
    } catch (err) {
      res.status(500).json({ error: err.message });
    }
  }

  // Id bo‘yicha tilga mos olish
  async getOne(req, res) {
    try {
      const { id } = req.params;
      const lang = req.query.lang || "uz";
      const [rows] = await db.query(
        "SELECT * FROM comments WHERE id = ? AND language_code = ?",
        [id, lang]
      );
      if (rows.length === 0) {
        return res.status(404).json({ message: "Comment topilmadi" });
      }
      res.json(rows[0]);
    } catch (err) {
      res.status(500).json({ error: err.message });
    }
  }

  // Yangi comment yaratish
  async create(req, res) {
    try {
      const { fullname, job, comment, language_code } = req.body;
      const image = req.file ? req.file.filename : null;
      const [result] = await db.query(
        "INSERT INTO comments (fullname, job, comment, image, language_code) VALUES (?, ?, ?, ?, ?)",
        [fullname, job, comment, image, language_code || "uz"]
      );
      res
        .status(201)
        .json({ id: result.insertId, fullname, job, comment, image });
    } catch (err) {
      res.status(500).json({ error: err.message });
    }
  }

  // Comment update qilish
  async update(req, res) {
    try {
      const { id } = req.params;
      const { fullname, job, comment, language_code } = req.body;
      const image = req.file ? req.file.filename : null;
      const [result] = await db.query(
        "UPDATE comments SET fullname=?, job=?, comment=?, image=?, language_code=? WHERE id=?",
        [fullname, job, comment, image, language_code || "uz", id]
      );
      if (result.affectedRows === 0) {
        return res.status(404).json({ message: "Comment topilmadi" });
      }
      res.json({ id, fullname, job, comment, image });
    } catch (err) {
      res.status(500).json({ error: err.message });
    }
  }

  // Comment o‘chirish
  async delete(req, res) {
    try {
      const { id } = req.params;
      const [result] = await db.query("DELETE FROM comments WHERE id = ?", [
        id,
      ]);
      if (result.affectedRows === 0) {
        return res.status(404).json({ message: "Comment topilmadi" });
      }
      res.json({ message: "Comment o'chirildi" });
    } catch (err) {
      res.status(500).json({ error: err.message });
    }
  }
}

export default new CommentsController();
