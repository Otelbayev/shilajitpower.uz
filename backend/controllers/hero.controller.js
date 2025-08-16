import db from "../db.js";

class HeroController {
  async get(req, res) {
    try {
      const lang = req.query.lang || "uz"; // Til parametri
      const [rows] = await db.query(
        "SELECT * FROM hero_section WHERE language_code = ? LIMIT 1",
        [lang]
      );
      if (rows.length === 0) {
        return res.status(404).json({ message: "Hero section topilmadi" });
      }
      res.json(rows[0]);
    } catch (err) {
      res.status(500).json({ error: err.message });
    }
  }

  async save(req, res) {
    try {
      const {
        title,
        subtitle,
        description,
        rating,
        reviews,
        microelements,
        weight,
        product_name,
        badge,
        language_code = "uz",
      } = req.body;

      const [rows] = await db.query(
        "SELECT id FROM hero_section WHERE language_code = ? LIMIT 1",
        [language_code]
      );

      if (rows.length === 0) {
        const sql = `
          INSERT INTO hero_section 
          (title, subtitle, description, rating, reviews, microelements, weight, product_name, badge, language_code)
          VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
        `;
        await db.query(sql, [
          title,
          subtitle,
          description,
          rating,
          reviews,
          microelements,
          weight,
          product_name,
          badge,
          language_code,
        ]);
        res.json({ message: "Hero section yaratildi" });
      } else {
        const sql = `
          UPDATE hero_section 
          SET title=?, subtitle=?, description=?, rating=?, reviews=?, microelements=?, weight=?, product_name=?, badge=? 
          WHERE id=?
        `;
        await db.query(sql, [
          title,
          subtitle,
          description,
          rating,
          reviews,
          microelements,
          weight,
          product_name,
          badge,
          rows[0].id,
        ]);
        res.json({ message: "Hero section yangilandi" });
      }
    } catch (err) {
      res.status(500).json({ error: err.message });
    }
  }
}

export default new HeroController();
