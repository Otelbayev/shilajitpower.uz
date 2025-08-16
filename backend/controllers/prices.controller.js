import db from "../db.js";

class PricesController {
  async getAll(req, res) {
    try {
      const lang = req.query.lang || "uz";
      const [rows] = await db.query(
        "SELECT * FROM prices WHERE language_code = ?",
        [lang]
      );
      res.json(rows);
    } catch (err) {
      res.status(500).json({ error: err.message });
    }
  }

  async getById(req, res) {
    try {
      const { id } = req.params;
      const lang = req.query.lang || "uz";

      const [rows] = await db.query(
        "SELECT * FROM prices WHERE id = ? AND language_code = ?",
        [id, lang]
      );

      if (rows.length === 0)
        return res.status(404).json({ message: "Запись не найдена" });

      res.json(rows[0]);
    } catch (err) {
      res.status(500).json({ error: err.message });
    }
  }

  async create(req, res) {
    try {
      const {
        massa,
        month,
        description,
        price,
        old_price,
        span,
        language_code = "uz",
      } = req.body;

      const [result] = await db.query(
        "INSERT INTO prices (massa, month, description, price, old_price, span, language_code) VALUES (?, ?, ?, ?, ?, ?, ?)",
        [massa, month, description, price, old_price, span, language_code]
      );

      res.json({ message: "Price created", id: result.insertId });
    } catch (err) {
      res.status(500).json({ error: err.message });
    }
  }

  async update(req, res) {
    try {
      const { id } = req.params;
      const {
        massa,
        month,
        description,
        price,
        old_price,
        span,
        language_code = "uz",
      } = req.body;

      const [result] = await db.query(
        "UPDATE prices SET massa=?, month=?, description=?, price=? , old_price=?, span=?, language_code=? WHERE id=?",
        [massa, month, description, price, old_price, span, language_code, id]
      );

      if (result.affectedRows === 0)
        return res.status(404).json({ message: "Запись не найдена" });

      res.json({ message: "Price updated" });
    } catch (err) {
      res.status(500).json({ error: err.message });
    }
  }

  async delete(req, res) {
    try {
      const { id } = req.params;
      const [result] = await db.query("DELETE FROM prices WHERE id=?", [id]);

      if (result.affectedRows === 0)
        return res.status(404).json({ message: "Запись не найдена" });

      res.json({ message: "Price deleted" });
    } catch (err) {
      res.status(500).json({ error: err.message });
    }
  }
}

export default new PricesController();
