import db from "../db.js";

class CommentsController {
  async getAll(req, res) {
    try {
      const [rows] = await db.query("SELECT * FROM comments");
      res.json(rows);
    } catch (err) {
      res.status(500).json({ error: err.message });
    }
  }

  async getOne(req, res) {
    try {
      const { id } = req.params;
      const [rows] = await db.query("SELECT * FROM comments WHERE id = ?", [
        id,
      ]);
      if (rows.length === 0) {
        return res.status(404).json({ message: "Comment topilmadi" });
      }
      res.json(rows[0]);
    } catch (err) {
      res.status(500).json({ error: err.message });
    }
  }

  async create(req, res) {
    try {
      const { fullname, job, comment } = req.body;
      const image = req.file ? req.file.filename : null;
      const [result] = await db.query(
        "INSERT INTO comments (fullname, job, comment, image) VALUES (?, ?, ?, ?)",
        [fullname, job, comment, image]
      );
      res
        .status(201)
        .json({ id: result.insertId, fullname, job, comment, image });
    } catch (err) {
      res.status(500).json({ error: err.message });
    }
  }

  async update(req, res) {
    try {
      const { id } = req.params;
      const { fullname, job, comment } = req.body;
      const image = req.file ? req.file.filename : null;
      const [result] = await db.query(
        "UPDATE comments SET fullname=?, job=?, comment=?, image=? WHERE id=?",
        [fullname, job, comment, image, id]
      );
      if (result.affectedRows === 0) {
        return res.status(404).json({ message: "Comment topilmadi" });
      }
      res.json({ id, fullname, job, comment, image });
    } catch (err) {
      res.status(500).json({ error: err.message });
    }
  }

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
