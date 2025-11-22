// server/controllers/loans.controllers.js
import { pool } from "../db.js";

// ✅ GET /loans - listar todos los préstamos
export const getLoans = async (req, res) => {
  try {
    const [rows] = await pool.query("SELECT * FROM loans");
    res.json(rows);
  } catch (error) {
    console.error("Error getLoans:", error);
    res.status(500).json({ message: "Error al obtener préstamos" });
  }
};

// ✅ GET /loans/:id - obtener un préstamo por id
export const getLoan = async (req, res) => {
  try {
    const { id } = req.params;
    const [rows] = await pool.query("SELECT * FROM loans WHERE id = ?", [id]);

    if (rows.length === 0) {
      return res.status(404).json({ message: "Préstamo no encontrado" });
    }

    res.json(rows[0]);
  } catch (error) {
    console.error("Error getLoan:", error);
    res.status(500).json({ message: "Error al obtener préstamo" });
  }
};

// ✅ POST /loans - crear préstamo
export const createLoan = async (req, res) => {
  try {
    const { bookTitle, studentName, startDate, endDate, status } = req.body;

    // Validaciones básicas
    if (!bookTitle || !studentName || !startDate || !endDate) {
      return res.status(400).json({
        message:
          "Faltan datos: bookTitle, studentName, startDate, endDate son obligatorios",
      });
    }

    const loanStatus = status || "activo";

    const [result] = await pool.query(
      "INSERT INTO loans (bookTitle, studentName, startDate, endDate, status) VALUES (?, ?, ?, ?, ?)",
      [bookTitle, studentName, startDate, endDate, loanStatus]
    );

    const newLoan = {
      id: result.insertId,
      bookTitle,
      studentName,
      startDate,
      endDate,
      status: loanStatus,
    };

    res.status(201).json(newLoan);
  } catch (error) {
    console.error("Error createLoan:", error);
    res.status(500).json({ message: "Error al crear préstamo" });
  }
};

// ✅ PUT /loans/:id - actualizar préstamo
export const updateLoan = async (req, res) => {
  try {
    const { id } = req.params;
    const { bookTitle, studentName, startDate, endDate, status } = req.body;

    const [result] = await pool.query(
      `UPDATE loans 
       SET bookTitle = IFNULL(?, bookTitle),
           studentName = IFNULL(?, studentName),
           startDate = IFNULL(?, startDate),
           endDate = IFNULL(?, endDate),
           status = IFNULL(?, status)
       WHERE id = ?`,
      [bookTitle, studentName, startDate, endDate, status, id]
    );

    if (result.affectedRows === 0) {
      return res.status(404).json({ message: "Préstamo no encontrado" });
    }

    const [rows] = await pool.query("SELECT * FROM loans WHERE id = ?", [id]);
    res.json(rows[0]);
  } catch (error) {
    console.error("Error updateLoan:", error);
    res.status(500).json({ message: "Error al actualizar préstamo" });
  }
};

// ✅ PUT /loans/:id/return - marcar como devuelto
export const returnLoan = async (req, res) => {
  try {
    const { id } = req.params;

    const [result] = await pool.query(
      "UPDATE loans SET status = 'devuelto' WHERE id = ?",
      [id]
    );

    if (result.affectedRows === 0) {
      return res.status(404).json({ message: "Préstamo no encontrado" });
    }

    const [rows] = await pool.query("SELECT * FROM loans WHERE id = ?", [id]);
    res.json(rows[0]);
  } catch (error) {
    console.error("Error returnLoan:", error);
    res.status(500).json({ message: "Error al marcar préstamo como devuelto" });
  }
};

// ✅ DELETE /loans/:id - eliminar préstamo
export const deleteLoan = async (req, res) => {
  try {
    const { id } = req.params;

    const [result] = await pool.query("DELETE FROM loans WHERE id = ?", [id]);

    if (result.affectedRows === 0) {
      return res.status(404).json({ message: "Préstamo no encontrado" });
    }

    res.json({ message: "Préstamo eliminado" });
  } catch (error) {
    console.error("Error deleteLoan:", error);
    res.status(500).json({ message: "Error al eliminar préstamo" });
  }
};
