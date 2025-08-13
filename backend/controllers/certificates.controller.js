import db from "../db.js";

class CertificatesController {
  async getAll(req, res) {
    try {
      const [rows] = await db.query("SELECT * FROM certificates");
      res.json(rows);
    } catch (error) {
      res.status(500).json({ message: "Error fetching certificates", error });
    }
  }

  async getById(req, res) {
    try {
      const { id } = req.params;
      const [rows] = await db.query("SELECT * FROM certificates WHERE id = ?", [
        id,
      ]);
      if (rows.length === 0) {
        return res.status(404).json({ message: "Certificate not found" });
      }
      res.json(rows[0]);
    } catch (error) {
      res.status(500).json({ message: "Error fetching certificate", error });
    }
  }

  async create(req, res) {
    try {
      const { title, subtitle, description } = req.body;
      const image = req.file ? req.file.filename : null;
      await db.query(
        "INSERT INTO certificates (image, title, subtitle, description) VALUES (?, ?, ?, ?)",
        [image, title, subtitle, description]
      );
      res.status(201).json({ message: "Certificate created successfully" });
    } catch (error) {
      res.status(500).json({ message: "Error creating certificate", error });
    }
  }

  async update(req, res) {
    try {
      const { id } = req.params;
      const { title, subtitle, description } = req.body;
      const image = req.file ? req.file.filename : null;
      await db.query(
        "UPDATE certificates SET image=?, title=?, subtitle=?, description=? WHERE id=?",
        [image, title, subtitle, description, id]
      );
      res.json({ message: "Certificate updated successfully" });
    } catch (error) {
      res.status(500).json({ message: "Error updating certificate", error });
    }
  }

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
