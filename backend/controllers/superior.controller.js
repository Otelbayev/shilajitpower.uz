import db from "../db.js";

class SuperiorController {
  async getAll(req, res) {
    try {
      const lang = req.query.lang || "uz";
      const [rows] = await db.query(
        "SELECT * FROM superior WHERE language_code = ?",
        [lang]
      );

      res.json(rows);
    } catch (err) {
      console.error(err);
      res.status(500).json({ message: "Error fetching superior", err });
    }
  }

  // Yozuvni id bo‘yicha olish
  async getById(req, res) {
    try {
      const { id } = req.params;
      const lang = req.query.lang || "uz";

      const [rows] = await db.query(
        "SELECT * FROM superior WHERE id = ? AND language_code = ?",
        [id, lang]
      );

      if (rows.length === 0) {
        return res.status(404).json({ message: "Superior topilmadi" });
      }

      const row = rows[0];
      row.fields = JSON.parse(row.fields || "[]");

      res.json(row);
    } catch (err) {
      console.error(err);
      res.status(500).json({ message: "Error fetching superior", err });
    }
  }

  // Yozuv yaratish
  async create(req, res) {
    try {
      const {
        title,
        minTitle,
        subTitle,
        description,
        fields,
        language_code = "uz",
      } = req.body;

      const jsonFields = JSON.stringify(fields || []);

      const [result] = await db.query(
        "INSERT INTO superior (title, minTitle, subTitle, description, fields, language_code) VALUES (?, ?, ?, ?, ?, ?)",
        [title, minTitle, subTitle, description, jsonFields, language_code]
      );

      res
        .status(201)
        .json({ id: result.insertId, message: "Superior yaratildi" });
    } catch (err) {
      console.error(err);
      res.status(500).json({ message: "Error creating superior", err });
    }
  }

  // Yozuvni yangilash
  async update(req, res) {
    try {
      const { id } = req.params;
      const {
        title,
        minTitle,
        subTitle,
        description,
        fields,
        language_code = "uz",
      } = req.body;

      const jsonFields = JSON.stringify(fields || []);

      const [result] = await db.query(
        "UPDATE superior SET title=?, minTitle=?, subTitle=?, description=?, fields=?, language_code=? WHERE id=?",
        [title, minTitle, subTitle, description, jsonFields, language_code, id]
      );

      if (result.affectedRows === 0) {
        return res.status(404).json({ message: "Superior topilmadi" });
      }

      res.json({ message: "Superior yangilandi" });
    } catch (err) {
      console.error(err);
      res.status(500).json({ message: "Error updating superior", err });
    }
  }

  // Yozuvni o‘chirish
  async delete(req, res) {
    try {
      const { id } = req.params;

      const [result] = await db.query("DELETE FROM superior WHERE id=?", [id]);

      if (result.affectedRows === 0) {
        return res.status(404).json({ message: "Superior topilmadi" });
      }

      res.json({ message: "Superior o‘chirildi" });
    } catch (err) {
      console.error(err);
      res.status(500).json({ message: "Error deleting superior", err });
    }
  }
}

export default new SuperiorController();
