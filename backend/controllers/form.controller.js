import db from "../db.js";

import { body, validationResult } from "express-validator";

export const validateForm = [
  body("name")
    .trim()
    .escape()
    .isLength({ min: 2, max: 50 })
    .withMessage("Ism 2-50 ta belgidan iborat bo‘lishi kerak"),
  body("phone")
    .matches(/^\+998\d{9}$/)
    .withMessage("Telefon raqam formati: +998XXXXXXXXX"),
  body("type").isInt().withMessage("Type faqat ID bo‘lishi kerak"),
];

export const submitForm = async (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res
      .status(400)
      .json({ message: "Ma'lumot xato", errors: errors.array() });
  }

  try {
    const { name, phone, type } = req.body;

    const [priceItem] = await db.query("SELECT * FROM prices WHERE id = ?", [
      type,
    ]);
    if (priceItem.length === 0) {
      return res.status(400).json({ message: "Noto‘g‘ri type qiymati" });
    }

    await db.query(
      "INSERT INTO orders (name, phone, type_id) VALUES (?, ?, ?)",
      [name, phone, type]
    );

    res.json({ message: "Muvaffaqiyatli yuborildi" });
  } catch (error) {
    res.status(500).json({ message: "Server error", error: error.message });
  }
};

export const getOrders = async (req, res) => {
  try {
    const [rows] = await db.query(`
      SELECT 
        o.id, 
        o.name, 
        o.phone, 
        p.description AS type,
        o.status,
        o.created_at,
        o.updated_at
      FROM orders o
      LEFT JOIN prices p ON o.type_id = p.id
      ORDER BY o.created_at DESC
    `);
    res.json(rows);
  } catch (error) {
    res.status(500).json({ message: "Server error", error: error.message });
  }
};

export const updateOrderStatus = [
  body("status")
    .isIn(["pending", "approved"])
    .withMessage("Noto‘g‘ri status qiymati"),
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res
        .status(400)
        .json({ message: "Ma'lumot xato", errors: errors.array() });
    }

    try {
      const { id } = req.params;
      const { status } = req.body;

      const [result] = await db.query(
        "UPDATE orders SET status = ? WHERE id = ?",
        [status, id]
      );

      if (result.affectedRows === 0) {
        return res.status(404).json({ message: "Order topilmadi" });
      }

      res.json({ message: "Status muvaffaqiyatli yangilandi" });
    } catch (error) {
      res.status(500).json({ message: "Server error", error: error.message });
    }
  },
];
