import db from "../db.js";

class WhomController {
  // Barcha yozuvlarni til bo‘yicha olish
  async getAll(req, res) {
    try {
      const lang = req.query.lang || "uz";
      const [rows] = await db.query(
        "SELECT * FROM whom WHERE language_code = ?",
        [lang]
      );

      res.json(rows);
    } catch (err) {
      console.error(err);
      res.status(500).json({ message: "Server xatosi", err });
    }
  }

  // Yozuvni id bo‘yicha olish
  async getById(req, res) {
    try {
      const { id } = req.params;
      const lang = req.query.lang || "uz";

      const [rows] = await db.query(
        "SELECT * FROM whom WHERE id = ? AND language_code = ?",
        [id, lang]
      );

      if (rows.length === 0) {
        return res.status(404).json({ message: "Topilmadi" });
      }

      const row = rows[0];
      row.benefits = JSON.parse(row.benefits || "[]");

      res.json(row);
    } catch (err) {
      console.error(err);
      res.status(500).json({ message: "Server xatosi", err });
    }
  }

  // Yozuv yaratish
  async create(req, res) {
    try {
      const {
        who,
        problem,
        solution,
        benefits,
        icon,
        language_code = "uz",
      } = req.body;

      const image = req.files?.image ? req.files.image[0].filename : null;

      const [result] = await db.query(
        "INSERT INTO whom (image, icon, who, problem, solution, benefits, language_code) VALUES (?, ?, ?, ?, ?, ?, ?)",
        [
          image,
          icon,
          who,
          problem,
          solution,
          JSON.stringify(benefits),
          language_code,
        ]
      );

      res.status(201).json({ message: "Whom qo‘shildi", id: result.insertId });
    } catch (err) {
      console.error(err);
      res.status(500).json({ message: "Server xatosi", err });
    }
  }

  // Yozuvni yangilash
  async update(req, res) {
    try {
      const { id } = req.params;
      const {
        who,
        problem,
        solution,
        benefits,
        icon,
        language_code = "uz",
      } = req.body;
      const image = req.files?.image ? req.files.image[0].filename : null;

      const [result] = await db.query(
        "UPDATE whom SET image=?, icon=?, who=?, problem=?, solution=?, benefits=?, language_code=? WHERE id=?",
        [
          image,
          icon,
          who,
          problem,
          solution,
          JSON.stringify(benefits),
          language_code,
          id,
        ]
      );

      if (result.affectedRows === 0) {
        return res.status(404).json({ message: "Topilmadi" });
      }

      res.json({ message: "Whom yangilandi" });
    } catch (err) {
      console.error(err);
      res.status(500).json({ message: "Server xatosi", err });
    }
  }

  // Yozuvni o‘chirish
  async delete(req, res) {
    try {
      const { id } = req.params;

      const [result] = await db.query("DELETE FROM whom WHERE id=?", [id]);

      if (result.affectedRows === 0) {
        return res.status(404).json({ message: "Topilmadi" });
      }

      res.json({ message: "Whom o‘chirildi" });
    } catch (err) {
      console.error(err);
      res.status(500).json({ message: "Server xatosi", err });
    }
  }
}

export default new WhomController();
