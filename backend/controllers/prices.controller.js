import db from "../db.js";

class PricesController {
  async getAll(req, res) {
    try {
      const [rows] = await db.query("SELECT * FROM prices");
      res.json(rows);
    } catch (err) {
      res.status(500).json({ error: err.message });
    }
  }

  async getById(req, res) {
    try {
      const { id } = req.params;
      const [rows] = await db.query("SELECT * FROM prices WHERE id = ?", [id]);
      if (rows.length === 0)
        return res.status(404).json({ message: "Not found" });
      res.json(rows[0]);
    } catch (err) {
      res.status(500).json({ error: err.message });
    }
  }

  async create(req, res) {
    try {
      const { massa, month, description, price, old_price, span } = req.body;
      const [result] = await db.query(
        "INSERT INTO prices (massa, month, description, price, old_price, span) VALUES (?, ?, ?, ?)",
        [massa, month, description, price, old_price, span]
      );
      res.json({ message: "Price created", id: result.insertId });
    } catch (err) {
      res.status(500).json({ error: err.message });
    }
  }

  async update(req, res) {
    try {
      const { id } = req.params;
      const { massa, month, description, price, old_price, span } = req.body;
      const [result] = await db.query(
        "UPDATE prices SET massa=?, month=?, description=?, price=? , old_price=?, span=? WHERE id=?",
        [massa, month, description, price, old_price, span, id]
      );
      if (result.affectedRows === 0)
        return res.status(404).json({ message: "Not found" });
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
        return res.status(404).json({ message: "Not found" });
      res.json({ message: "Price deleted" });
    } catch (err) {
      res.status(500).json({ error: err.message });
    }
  }
}

export default new PricesController();
