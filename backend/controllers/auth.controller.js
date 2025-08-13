import jwt from "jsonwebtoken";
import dotenv from "dotenv";
dotenv.config();

const JWT_SECRET = process.env.JWT_SECRET || "meningmaxfiykalitlarim";

const STATIC_USER = {
  username: "admin",
  password: "12345",
};

class AuthController {
  async login(req, res) {
    const { username, password } = req.body;

    if (
      username === STATIC_USER.username &&
      password === STATIC_USER.password
    ) {
      const token = jwt.sign({ username }, JWT_SECRET, { expiresIn: "1h" });
      return res.json({ token });
    }

    return res.status(401).json({ message: "Login yoki parol noto'g'ri" });
  }

  async check(req, res) {
    const authHeader = req.headers.authorization;
    if (!authHeader) {
      return res.status(401).json({ message: "Token topilmadi" });
    }

    const token = authHeader.split(" ")[1];

    try {
      const decoded = jwt.verify(token, JWT_SECRET);

      const newToken = jwt.sign({ username: decoded.username }, JWT_SECRET, {
        expiresIn: "1h",
      });

      return res.json({
        message: "Token yaroqli",
        username: decoded.username,
        token: newToken,
      });
    } catch (err) {
      return res
        .status(401)
        .json({ message: "Token yaroqsiz yoki muddati tugagan" });
    }
  }
}

export default new AuthController();
