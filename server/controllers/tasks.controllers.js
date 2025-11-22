// server/controllers/task.controllers.js
import { pool } from "../db.js";
//trycatch para evitar los errores

export const getTasks = async (req, res) => {
  try {
    const [result] = await pool.query(
      "SELECT * FROM task ORDER BY createAt ASC"
    );
    res.json(result);
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

export const getTask = async (req, res) => {
  try {
    const [result] = await pool.query("SELECT * FROM task WHERE id = ?", [
      req.params.id,
    ]);
    if (result.length === 0)
      return res.status(404).json({ message: "task not found" });

    res.json(result[0]);
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

export const createTasks = async (req, res) => {
  try {
    const { title, description } = req.body;

    // 🔥 VALIDACIÓN BACKEND: no permitir campos vacíos
    if (!title || !title.trim()) {
      return res.status(400).json({ message: "El título es obligatorio." });
    }

    if (!description || !description.trim()) {
      return res
        .status(400)
        .json({ message: "La descripción es obligatoria." });
    }

    const cleanTitle = title.trim();
    const cleanDescription = description.trim();

    const [result] = await pool.query(
      "INSERT INTO task(title, description) VALUES (?, ?)",
      [cleanTitle, cleanDescription]
    );

    res.json({
      id: result.insertId,
      title: cleanTitle,
      description: cleanDescription,
    });
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

export const updateTasks = async (req, res) => {
  try {
    const result = await pool.query("UPDATE task SET ? WHERE id = ?", [
      req.body,
      req.params.id,
    ]);

    res.json(result);
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

export const deleteTasks = async (req, res) => {
  try {
    const [result] = await pool.query("DELETE FROM task WHERE id = ?", [
      req.params.id,
    ]);
    if (result.affectedRows === 0)
      return res.status(404).json({ message: "Task not found" });

    return res.sendStatus(204);
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};
