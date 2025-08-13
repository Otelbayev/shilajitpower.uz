import db from "../db.js";

class QuestionsController {
  async getAll(req, res) {
    try {
      const [rows] = await db.query("SELECT * FROM questions");
      res.json(rows);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  }

  async getById(req, res) {
    try {
      const { id } = req.params;
      const [rows] = await db.query("SELECT * FROM questions WHERE id = ?", [
        id,
      ]);
      if (rows.length === 0) {
        return res.status(404).json({ message: "Question not found" });
      }
      res.json(rows[0]);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  }

  async create(req, res) {
    try {
      const { question, answer } = req.body;
      if (!question || !answer) {
        return res.status(400).json({ message: "All fields are required" });
      }
      const [result] = await db.query(
        "INSERT INTO questions (question, answer) VALUES (?, ?)",
        [question, answer]
      );
      res.status(201).json({ id: result.insertId, question, answer });
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  }

  async update(req, res) {
    try {
      const { id } = req.params;
      const { question, answer } = req.body;
      const [result] = await db.query(
        "UPDATE questions SET question = ?, answer = ? WHERE id = ?",
        [question, answer, id]
      );
      if (result.affectedRows === 0) {
        return res.status(404).json({ message: "Question not found" });
      }
      res.json({ id, question, answer });
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
        return res.status(404).json({ message: "Question not found" });
      }
      res.json({ message: "Question deleted" });
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  }
}

export default new QuestionsController();
