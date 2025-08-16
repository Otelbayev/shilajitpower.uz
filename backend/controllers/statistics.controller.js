import db from "../db.js";

class StatisticsController {
  async getAll(req, res) {
    try {
      const lang = req.query.lang || "uz";
      const [rows] = await db.query(
        "SELECT * FROM statistics WHERE language_code = ?",
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
        "SELECT * FROM statistics WHERE id = ? AND language_code = ?",
        [id, lang]
      );

      if (rows.length === 0) {
        return res.status(404).json({ message: "Статистика не найдена" });
      }

      res.json(rows[0]);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  }

  async create(req, res) {
    try {
      const { count, description, language_code = "uz" } = req.body;
      if (!count || !description) {
        return res
          .status(400)
          .json({ message: "count va description talab qilinadi" });
      }

      const [result] = await db.query(
        "INSERT INTO statistics (count, description, language_code) VALUES (?, ?, ?)",
        [count, description, language_code]
      );
      res
        .status(201)
        .json({ id: result.insertId, count, description, language_code });
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  }

  async update(req, res) {
    try {
      const { count, description, language_code = "uz" } = req.body;

      const [result] = await db.query(
        "UPDATE statistics SET count = ?, description = ?, language_code = ? WHERE id = ?",
        [count, description, language_code, req.params.id]
      );

      if (result.affectedRows === 0) {
        return res.status(404).json({ message: "Статистика не найдена" });
      }

      res.json({
        message: "Statistika yangilandi",
        count,
        description,
        language_code,
      });
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  }

  async delete(req, res) {
    try {
      const [result] = await db.query("DELETE FROM statistics WHERE id = ?", [
        req.params.id,
      ]);
      if (result.affectedRows === 0) {
        return res.status(404).json({ message: "Статистика не найдена" });
      }
      res.json({ message: "Statistika o‘chirildi" });
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  }
}

export default new StatisticsController();
