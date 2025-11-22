// src/components/LoanCard.jsx
import { Link } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

function LoanCard({ loan, onDelete }) {
  const { user } = useAuth();

  // 🎨 Colores e iconos según estado
  const statusStyles = {
    activo: {
      bg: "bg-sky-100",
      text: "text-sky-700",
      icon: "✔",
    },
    atrasado: {
      bg: "bg-rose-100",
      text: "text-rose-700",
      icon: "⚠",
    },
    devuelto: {
      bg: "bg-emerald-100",
      text: "text-emerald-700",
      icon: "✓",
    },
  };

  const status = loan.status || "activo";
  const style = statusStyles[status] || statusStyles["activo"];

  return (
    <div className="bg-white rounded-xl shadow-sm p-4 flex flex-col gap-2">
      <div className="flex justify-between items-center">
        {/* ⭐ BADGE DEL ESTADO */}
        <span
          className={`text-xs px-2 py-1 rounded-full flex items-center gap-1 ${style.bg} ${style.text} font-medium`}
        >
          <span>{style.icon}</span>
          <span className="capitalize">{status}</span>
        </span>
      </div>

      <h3 className="font-semibold text-slate-800">
        {loan.bookTitle || "Libro sin título"}
      </h3>

      <p className="text-sm text-slate-600">
        Estudiante:{" "}
        <span className="font-medium">
          {loan.studentName || "Sin nombre"}
        </span>
      </p>

      <p className="text-xs text-slate-500">
        Desde: {loan.startDate?.slice(0, 10)} · Hasta:{" "}
        {loan.endDate?.slice(0, 10)}
      </p>

      {/* 🔒 SOLO BIBLIOTECARIO VE ESTOS BOTONES */}
      {user?.role === "librarian" && (
        <div className="flex justify-end gap-2 mt-2">
          <Link
            to={`/loans/edit/${loan.id}`}
            className="text-xs px-3 py-1 rounded-full border border-emerald-400 text-emerald-600 hover:bg-emerald-50"
          >
            Editar
          </Link>
          <button
            onClick={() => onDelete(loan.id)}
            className="text-xs px-3 py-1 rounded-full border border-rose-400 text-rose-600 hover:bg-rose-50"
          >
            Eliminar
          </button>
        </div>
      )}
    </div>
  );
}

export default LoanCard;
