import db from "../db.js";

class ContactsController {
  // Yangi contact qo‘shish
  async createContact(req, res) {
    try {
      const { name, link, icon, language_code } = req.body;

      if (!name || !link) {
        return res
          .status(400)
          .json({ message: "Barcha maydonlar to‘ldirilishi shart" });
      }

      const sql =
        "INSERT INTO contacts (icon, name, link, language_code) VALUES (?, ?, ?, ?)";
      const [result] = await db.query(sql, [
        icon,
        name,
        link,
        language_code || "uz",
      ]);

      res
        .status(201)
        .json({ message: "Contact qo‘shildi", id: result.insertId });
    } catch (error) {
      console.log(error);
      res.status(500).json({ error: "Ma'lumot qo‘shishda xato" });
    }
  }

  // Hammasini til bo‘yicha olish
  async getAllContacts(req, res) {
    try {
      const lang = req.query.lang || "uz";
      const sql = "SELECT * FROM contacts WHERE language_code = ?";
      const [results] = await db.query(sql, [lang]);
      res.json(results);
    } catch (error) {
      console.log(error);
      res.status(500).json({ error: "Ma'lumot olishda xato" });
    }
  }

  // Id bo‘yicha tilga mos olish
  async getContactById(req, res) {
    try {
      const { id } = req.params;
      const lang = req.query.lang || "uz";
      const sql = "SELECT * FROM contacts WHERE id = ? AND language_code = ?";
      const [rows] = await db.query(sql, [id, lang]);

      if (rows.length === 0) {
        return res.status(404).json({ message: "Contact topilmadi" });
      }

      res.json(rows[0]);
    } catch (error) {
      console.log(error);
      res.status(500).json({ error: "Ma'lumot olishda xato" });
    }
  }

  // Contact update qilish
  async updateContact(req, res) {
    try {
      const { id } = req.params;
      const { name, link, icon, language_code } = req.body;

      // Eski ma'lumotni olish
      const [oldData] = await db.query("SELECT * FROM contacts WHERE id = ?", [
        id,
      ]);
      if (oldData.length === 0) {
        return res.status(404).json({ message: "Contact topilmadi" });
      }

      const updatedIcon = icon || oldData[0].icon;

      const sql =
        "UPDATE contacts SET icon = ?, name = ?, link = ?, language_code = ? WHERE id = ?";
      await db.query(sql, [updatedIcon, name, link, language_code || "uz", id]);

      res.json({ message: "Contact yangilandi" });
    } catch (error) {
      console.log(error);
      res.status(500).json({ error: "Ma'lumot yangilashda xato" });
    }
  }

  // Contact o‘chirish
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
