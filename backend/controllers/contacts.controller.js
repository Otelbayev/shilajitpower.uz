import db from "../db.js";

class ContactsController {
  async createContact(req, res) {
    try {
      const { name, link } = req.body;
      const icon = req.file ? req.file.filename : null;
      if (!icon || !name || !link) {
        return res
          .status(400)
          .json({ message: "Barcha maydonlar to‘ldirilishi shart" });
      }

      const sql = "INSERT INTO contacts (icon, name, link) VALUES (?, ?, ?)";
      const [result] = await db.query(sql, [icon, name, link]);

      res
        .status(201)
        .json({ message: "Contact qo‘shildi", id: result.insertId });
    } catch (error) {
      console.log(error);
      res.status(500).json({ error: "Ma'lumot qo‘shishda xato" });
    }
  }

  async getAllContacts(req, res) {
    try {
      const sql = "SELECT * FROM contacts";
      const [results] = await db.query(sql);
      res.json(results);
    } catch (error) {
      console.log(error);
      res.status(500).json({ error: "Ma'lumot olishda xato" });
    }
  }

  async getContactById(req, res) {
    try {
      const { id } = req.params;
      const sql = "SELECT * FROM contacts WHERE id = ?";
      const [rows] = await db.query(sql, [id]);

      if (rows.length === 0) {
        return res.status(404).json({ message: "Contact topilmadi" });
      }

      res.json(rows[0]);
    } catch (error) {
      console.log(error);
      res.status(500).json({ error: "Ma'lumot olishda xato" });
    }
  }

  async updateContact(req, res) {
    try {
      const { id } = req.params;
      const { name, link } = req.body;
      const icon = req.file ? req.file.filename : null;

      // Eski ma'lumotni olish
      const [oldData] = await db.query("SELECT * FROM contacts WHERE id = ?", [
        id,
      ]);
      if (oldData.length === 0) {
        return res.status(404).json({ message: "Contact topilmadi" });
      }

      const updatedIcon = icon || oldData[0].icon;

      const sql =
        "UPDATE contacts SET icon = ?, name = ?, link = ? WHERE id = ?";
      await db.query(sql, [updatedIcon, name, link, id]);

      res.json({ message: "Contact yangilandi" });
    } catch (error) {
      console.log(error);
      res.status(500).json({ error: "Ma'lumot yangilashda xato" });
    }
  }

  async deleteContact(req, res) {
    try {
      const { id } = req.params;

      const [result] = await db.query("DELETE FROM contacts WHERE id = ?", [
        id,
      ]);

      if (result.affectedRows === 0) {
        return res.status(404).json({ message: "Contact topilmadi" });
      }

      res.json({ message: "Contact o‘chirildi" });
    } catch (error) {
      console.log(error);
      res.status(500).json({ error: "Ma'lumot o‘chirishda xato" });
    }
  }
}

export default new ContactsController();
