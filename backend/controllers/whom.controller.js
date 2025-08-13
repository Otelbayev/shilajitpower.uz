import db from "../db.js";

class WhomController {
  async getAll(req, res) {
    try {
      const [rows] = await db.query("SELECT * FROM whom");
      res.json(rows);
    } catch (err) {
      res.status(500).json({ message: "Server xatosi" });
    }
  }

  async getOne(req, res) {
    try {
      const { id } = req.params;
      const [rows] = await db.query("SELECT * FROM whom WHERE id = ?", [id]);

      if (rows.length === 0) {
        return res.status(404).json({ message: "Topilmadi" });
      }
      res.json(rows[0]);
    } catch (err) {
      res.status(500).json({ message: "Server xatosi" });
    }
  }

  async create(req, res) {
    try {
      const { who, problem, solution, benefits } = req.body;

      // Agar bir nechta fayl bo‘lsa
      const image = req.files?.image ? req.files.image[0].filename : null;
      const icon = req.files?.icon ? req.files.icon[0].filename : null;

      const [result] = await db.query(
        "INSERT INTO whom (image, icon, who, problem, solution, benefits) VALUES (?, ?, ?, ?, ?, ?)",
        [image, icon, who, problem, solution, JSON.stringify(benefits)]
      );

      res.status(201).json({ message: "Whom qo‘shildi", id: result.insertId });
    } catch (err) {
      console.error(err);
      res.status(500).json({ message: "Server xatosi" });
    }
  }

  async update(req, res) {
    try {
      const { id } = req.params;
      const { who, problem, solution, benefits } = req.body;
      const image = req.files?.image ? req.files.image[0].filename : null;
      const icon = req.files?.icon ? req.files.icon[0].filename : null;

      await db.query(
        "UPDATE whom SET image=?, icon=?, who=?, problem=?, solution=?, benefits=? WHERE id=?",
        [image, icon, who, problem, solution, JSON.stringify(benefits), id]
      );

      res.json({ message: "Whom yangilandi" });
    } catch (err) {
      res.status(500).json({ message: "Server xatosi" });
    }
  }

  async delete(req, res) {
    try {
      const { id } = req.params;
      await db.query("DELETE FROM whom WHERE id=?", [id]);
      res.json({ message: "Whom o‘chirildi" });
    } catch (err) {
      res.status(500).json({ message: "Server xatosi" });
    }
  }
}

export default new WhomController();
