import db from "../db.js";

class WhyController {
  async getAll(req, res) {
    try {
      const [rows] = await db.query("SELECT * FROM why");
      res.json(rows);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  }

  async getById(req, res) {
    try {
      const { id } = req.params;
      const [rows] = await db.query("SELECT * FROM why WHERE id = ?", [id]);
      if (rows.length === 0) {
        return res.status(404).json({ message: "Why topilmadi" });
      }
      res.json(rows[0]);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  }

  async create(req, res) {
    try {
      const { title, description } = req.body;
      const icon = req.file ? req.file.filename : null;

      await db.query(
        "INSERT INTO why (title, description, icon) VALUES (?, ?, ?)",
        [title, description, icon]
      );

      res.status(201).json({ message: "Why muvaffaqiyatli qo'shildi" });
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  }

  async update(req, res) {
    try {
      const { id } = req.params;
      const { title, description } = req.body;
      const icon = req.file ? req.file.filename : null;

      if (icon) {
        await db.query(
          "UPDATE why SET title = ?, description = ?, icon = ? WHERE id = ?",
          [title, description, icon, id]
        );
      } else {
        await db.query(
          "UPDATE why SET title = ?, description = ? WHERE id = ?",
          [title, description, id]
        );
      }

      res.json({ message: "Why muvaffaqiyatli yangilandi" });
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  }

  async delete(req, res) {
    try {
      const { id } = req.params;
      await db.query("DELETE FROM why WHERE id = ?", [id]);
      res.json({ message: "Why muvaffaqiyatli o'chirildi" });
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  }
}

export default new WhyController();
