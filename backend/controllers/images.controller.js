import db from "../db.js";

class ImagesController {
  async getAll(req, res) {
    try {
      const lang = req.query.lang || "uz";
      const [rows] = await db.query(
        "SELECT * FROM images WHERE language_code = ?",
        [lang]
      );

      // JSON parse har bir yozuv uchun
      const parsedRows = rows.map((row) => ({
        ...row,
        images: JSON.parse(row.images || "[]"),
      }));

      res.json(parsedRows);
    } catch (error) {
      res
        .status(500)
        .json({ message: "Ошибка при получении изображений", error });
    }
  }

  async getById(req, res) {
    try {
      const { id } = req.params;
      const lang = req.query.lang || "uz";

      const [rows] = await db.query(
        "SELECT * FROM images WHERE id = ? AND language_code = ?",
        [id, lang]
      );

      if (rows.length === 0) {
        return res
          .status(404)
          .json({ message: "Запись с изображением не найдена" });
      }

      const record = rows[0];
      record.images = JSON.parse(record.images || "[]");

      res.json(record);
    } catch (error) {
      res
        .status(500)
        .json({ message: "Ошибка при получении записи изображения", error });
    }
  }

  async create(req, res) {
    try {
      const { title, description, language_code = "uz" } = req.body;
      const files = req.files ? req.files.map((f) => f.filename) : [];

      await db.query(
        "INSERT INTO images (title, description, images, language_code) VALUES (?, ?, ?, ?)",
        [title, description, JSON.stringify(files), language_code]
      );

      res.status(201).json({ message: "Запись изображения успешно создана" });
    } catch (error) {
      res
        .status(500)
        .json({ message: "Ошибка при создании записи изображения", error });
    }
  }

  async update(req, res) {
    try {
      const { id } = req.params;
      let {
        title,
        description,
        existingImages,
        language_code = "uz",
      } = req.body;

      if (existingImages && !Array.isArray(existingImages)) {
        existingImages = [existingImages];
      }

      const newImages = req.files ? req.files.map((f) => f.filename) : [];
      const finalImages = [...(existingImages || []), ...newImages];

      await db.query(
        "UPDATE images SET title=?, description=?, images=?, language_code=? WHERE id=?",
        [title, description, JSON.stringify(finalImages), language_code, id]
      );

      res.json({ message: "Запись изображения успешно обновлена" });
    } catch (error) {
      res
        .status(500)
        .json({ message: "Ошибка при обновлении записи изображения", error });
    }
  }

  async delete(req, res) {
    try {
      const { id } = req.params;
      await db.query("DELETE FROM images WHERE id=?", [id]);
      res.json({ message: "Запись изображения успешно удалена" });
    } catch (error) {
      res
        .status(500)
        .json({ message: "Ошибка при удалении записи изображения", error });
    }
  }
}

export default new ImagesController();
