import db from "../db.js";

class QuestionsController {
  async getAll(req, res) {
    try {
      const lang = req.query.lang || "uz";
      const [rows] = await db.query(
        "SELECT * FROM questions WHERE language_code = ?",
        [lang]
      );
      res.json(rows);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  }

  async getById(req, res) {
    try {
      const { id } = req.params;
      const lang = req.query.lang || "uz";

      const [rows] = await db.query(
        "SELECT * FROM questions WHERE id = ? AND language_code = ?",
        [id, lang]
      );

      if (rows.length === 0) {
        return res.status(404).json({ message: "Запись не найдена" });
      }

      res.json(rows[0]);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  }

  async create(req, res) {
    try {
      const { question, answer, language_code = "uz" } = req.body;
      if (!question || !answer) {
        return res.status(400).json({ message: "All fields are required" });
      }

      const [result] = await db.query(
        "INSERT INTO questions (question, answer, language_code) VALUES (?, ?, ?)",
        [question, answer, language_code]
      );

      res
        .status(201)
        .json({ id: result.insertId, question, answer, language_code });
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  }

  async update(req, res) {
    try {
      const { id } = req.params;
      const { question, answer, language_code = "uz" } = req.body;

      const [result] = await db.query(
        "UPDATE questions SET question = ?, answer = ?, language_code = ? WHERE id = ?",
        [question, answer, language_code, id]
      );

      if (result.affectedRows === 0) {
        return res.status(404).json({ message: "Запись не найдена" });
      }

      res.json({ id, question, answer, language_code });
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  }

  async delete(req, res) {
    try {
      const { id } = req.params;
      const [result] = await db.query("DELETE FROM questions WHERE id = ?", [
        id,
      ]);

      if (result.affectedRows === 0) {
        return res.status(404).json({ message: "Запись не найдена" });
      }

      res.json({ message: "Запись удалена" });
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  }
}

export default new QuestionsController();
