import db from "../db.js";

class WhyController {
  // Barcha yozuvlarni til bo‘yicha olish
  async getAll(req, res) {
    try {
      const lang = req.query.lang || "uz";
      const [rows] = await db.query(
        "SELECT * FROM why WHERE language_code = ?",
        [lang]
      );
      res.json(rows);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  }

  // Yozuvni id bo‘yicha olish
  async getById(req, res) {
    try {
      const { id } = req.params;
      const lang = req.query.lang || "uz";
      const [rows] = await db.query(
        "SELECT * FROM why WHERE id = ? AND language_code = ?",
        [id, lang]
      );
      if (rows.length === 0) {
        return res.status(404).json({ message: "Why topilmadi" });
      }
      res.json(rows[0]);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  }

  // Yozuv yaratish
  async create(req, res) {
    try {
      const { title, description, language_code = "uz" } = req.body;
      const icon = req.file ? req.file.filename : null;

      const [result] = await db.query(
        "INSERT INTO why (title, description, icon, language_code) VALUES (?, ?, ?, ?)",
        [title, description, icon, language_code]
      );

      res
        .status(201)
        .json({ message: "Why muvaffaqiyatli qo'shildi", id: result.insertId });
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  }

  // Yozuvni yangilash
  async update(req, res) {
    try {
      const { id } = req.params;
      const { title, description, language_code = "uz" } = req.body;
      const icon = req.file ? req.file.filename : null;

      if (icon) {
        await db.query(
          "UPDATE why SET title = ?, description = ?, icon = ?, language_code = ? WHERE id = ?",
          [title, description, icon, language_code, id]
        );
      } else {
        await db.query(
          "UPDATE why SET title = ?, description = ?, language_code = ? WHERE id = ?",
          [title, description, language_code, id]
        );
      }

      res.json({ message: "Why muvaffaqiyatli yangilandi" });
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  }

  // Yozuvni o‘chirish
  async delete(req, res) {
    try {
      const { id } = req.params;
      const [result] = await db.query("DELETE FROM why WHERE id = ?", [id]);
      if (result.affectedRows === 0) {
        return res.status(404).json({ message: "Why topilmadi" });
      }
      res.json({ message: "Why muvaffaqiyatli o'chirildi" });
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  }
}

export default new WhyController();
