import db from "../db.js";

export const getAllData = async (req, res) => {
  try {
    const [certificates] = await db.query("SELECT * FROM certificates");
    const [comments] = await db.query("SELECT * FROM comments");
    const [contacts] = await db.query("SELECT * FROM contacts");
    const [hero_section] = await db.query("SELECT * FROM hero_section LIMIT 1");
    const [prices] = await db.query("SELECT * FROM prices");
    const [questions] = await db.query("SELECT * FROM questions");
    const [statistics] = await db.query("SELECT * FROM statistics");
    const [whom] = await db.query("SELECT * FROM whom");
    const [why] = await db.query("SELECT * FROM why");

    res.json({
      certificates,
      comments,
      contacts,
      hero_section: hero_section[0],
      prices,
      questions,
      statistics,
      whom,
      why,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server error", error: error.message });
  }
};
