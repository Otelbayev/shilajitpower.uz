import db from "../db.js";

export const getAllData = async (req, res) => {
  try {
    const lang = req.query.lang || "uz";

    const [certificates] = await db.query(
      "SELECT * FROM certificates WHERE language_code = ?",
      [lang]
    );
    const [comments] = await db.query(
      "SELECT * FROM comments WHERE language_code = ?",
      [lang]
    );
    const [contacts] = await db.query(
      "SELECT * FROM contacts WHERE language_code = ?",
      [lang]
    );
    const [hero_section] = await db.query(
      "SELECT * FROM hero_section WHERE language_code = ? LIMIT 1",
      [lang]
    );
    const [images] = await db.query(
      "SELECT * FROM images WHERE language_code = ? LIMIT 1",
      [lang]
    );
    const [prices] = await db.query(
      "SELECT * FROM prices WHERE language_code = ?",
      [lang]
    );
    const [questions] = await db.query(
      "SELECT * FROM questions WHERE language_code = ?",
      [lang]
    );
    const [statistics] = await db.query(
      "SELECT * FROM statistics WHERE language_code = ?",
      [lang]
    );
    const [whom] = await db.query(
      "SELECT * FROM whom WHERE language_code = ?",
      [lang]
    );
    const [why] = await db.query("SELECT * FROM why WHERE language_code = ?", [
      lang,
    ]);
    const [superior] = await db.query(
      "SELECT * FROM superior WHERE language_code = ?",
      [lang]
    );

    res.json({
      certificates,
      comments,
      contacts,
      hero_section: hero_section[0],
      images: images[0],
      prices,
      questions,
      statistics,
      whom,
      why,
      superior,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server error", error: error.message });
  }
};
