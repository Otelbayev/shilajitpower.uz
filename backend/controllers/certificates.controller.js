import db from "../db.js";

class CertificatesController {
  // Hammasini til bo‘yicha olish
  async getAll(req, res) {
    try {
      const lang = req.query.lang || "uz";
      const [rows] = await db.query(
        "SELECT * FROM certificates WHERE language_code = ?",
        [lang]
      );
      res.json(rows);
    } catch (error) {
      res.status(500).json({ message: "Error fetching certificates", error });
    }
  }

  // Id bo‘yicha tilga mos olish
  async getById(req, res) {
    try {
      const { id } = req.params;
      const lang = req.query.lang || "uz";
      const [rows] = await db.query(
        "SELECT * FROM certificates WHERE id = ? AND language_code = ?",
        [id, lang]
      );
      if (rows.length === 0) {
        return res.status(404).json({ message: "Certificate not found" });
      }
      res.json(rows[0]);
    } catch (error) {
      res.status(500).json({ message: "Error fetching certificate", error });
    }
  }

  // Yangi certificate yaratish
  async create(req, res) {
    try {
      const { title, subtitle, description, language_code } = req.body;
      const image = req.file ? req.file.filename : null;
      await db.query(
        "INSERT INTO certificates (image, title, subtitle, description, language_code) VALUES (?, ?, ?, ?, ?)",
        [image, title, subtitle, description, language_code || "uz"]
      );
      res.status(201).json({ message: "Certificate created successfully" });
    } catch (error) {
      res.status(500).json({ message: "Error creating certificate", error });
    }
  }

  // Certificate update qilish
  async update(req, res) {
    try {
      const { id } = req.params;
      const { title, subtitle, description, language_code } = req.body;
      const image = req.file ? req.file.filename : null;

      await db.query(
        "UPDATE certificates SET image=?, title=?, subtitle=?, description=?, language_code=? WHERE id=?",
        [image, title, subtitle, description, language_code || "uz", id]
      );
      res.json({ message: "Certificate updated successfully" });
    } catch (error) {
      res.status(500).json({ message: "Error updating certificate", error });
    }
  }

  // Certificate o‘chirish
  async delete(req, res) {
    try {
      const { id } = req.params;
      await db.query("DELETE FROM certificates WHERE id=?", [id]);
      res.json({ message: "Certificate deleted successfully" });
    } catch (error) {
      res.status(500).json({ message: "Error deleting certificate", error });
    }
  }
}

export default new CertificatesController();
