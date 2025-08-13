import rateLimit from "express-rate-limit";

export const formLimiter = rateLimit({
  windowMs: 60 * 1000,
  max: 5,
  message: { message: "Juda ko‘p so‘rov yuborildi. Keyinroq urinib ko‘ring." },
});
