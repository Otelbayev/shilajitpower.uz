import db from "../db.js";

class SuperiorController {
  async getAll(req, res) {
    try {
      const [rows] = await db.query("SELECT * FROM superior");
      res.json(rows);
    } catch (err) {
      console.log(err);
      res.status(500).json({ message: "Error fetching superior", err });
    }
  }

  async create(req, res) {
    try {
      const { title, minTitle, subTitle, description, fields } = req.body;
      const jsonFields = JSON.stringify(fields);
      await db.query(
        "INSERT INTO superior (title, minTitle, subTitle, description, fields) VALUES (?, ?, ?, ?, ?)",
        [title, minTitle, subTitle, description, jsonFields]
      );
      res.json({ message: "Created successfully" });
    } catch (err) {
      res.status(500).json({ message: "Error creating superior", err });
    }
  }

  async update(req, res) {
    try {
      const { id } = req.params;
      const { title, minTitle, subTitle, description, fields } = req.body;
      const jsonFields = JSON.stringify(fields);
      await db.query(
        "UPDATE superior SET title=?, minTitle=?, subTitle=?, description=?, fields=? WHERE id=?",
        [title, minTitle, subTitle, description, jsonFields, id]
      );
      res.json({ message: "Updated successfully" });
    } catch (err) {
      res.status(500).json({ message: "Error updating superior", err });
    }
  }

  async delete(req, res) {
    try {
      const { id } = req.params;
      await db.query("DELETE FROM superior WHERE id=?", [id]);
      res.json({ message: "Deleted successfully" });
    } catch (err) {
      res.status(500).json({ message: "Error deleting superior", err });
    }
  }
}

export default new SuperiorController();
