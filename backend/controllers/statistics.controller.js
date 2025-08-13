import db from "../db.js";

class StatisticsController {
  async getAll(req, res) {
    try {
      const [rows] = await db.query("SELECT * FROM statistics");
      res.json(rows);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  }

  async getById(req, res) {
    try {
      const [rows] = await db.query("SELECT * FROM statistics WHERE id = ?", [
        req.params.id,
      ]);
      if (rows.length === 0) {
        return res.status(404).json({ message: "Statistika topilmadi" });
      }
      res.json(rows[0]);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  }

  async create(req, res) {
    try {
      const { count, description } = req.body;
      if (!count || !description) {
        return res
          .status(400)
          .json({ message: "count va description talab qilinadi" });
      }

      const [result] = await db.query(
        "INSERT INTO statistics (count, `description`) VALUES (?, ?)",
        [count, description]
      );
      res.status(201).json({ id: result.insertId, count, description });
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  }

  async update(req, res) {
    try {
      const { count, description } = req.body;
      const [result] = await db.query(
        "UPDATE statistics SET count = ?, `description` = ? WHERE id = ?",
        [count, description, req.params.id]
      );

      if (result.affectedRows === 0) {
        return res.status(404).json({ message: "Statistika topilmadi" });
      }

      res.json({ message: "Statistika yangilandi" });
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
        return res.status(404).json({ message: "Statistika topilmadi" });
      }
      res.json({ message: "Statistika o‘chirildi" });
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  }
}

export default new StatisticsController();
