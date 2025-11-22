import { pool } from "../db.js";

export const login = async (req, res) => {
  const { name, password } = req.body;

  try {
    const [rows] = await pool.query(
      "SELECT id, name, role FROM users WHERE name = ? AND password = ?",
      [name, password]
    );

    if (rows.length === 0) {
      return res.status(401).json({ message: "Credenciales incorrectas" });
    }

    const user = rows[0];

    // Por ahora sin tokens, solo devolvemos el usuario y su rol
    res.json({
      id: user.id,
      name: user.name,
      role: user.role,
    });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: "Error interno del servidor" });
  }
};



