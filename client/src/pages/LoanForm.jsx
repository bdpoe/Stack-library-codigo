// src/pages/LoanForm.jsx
import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import {
  createLoanRequest,
  getLoanRequest,
  updateLoanRequest,
} from "../api/loans.api";

function LoanForm() {
  const { id } = useParams();
  const navigate = useNavigate();

  const [form, setForm] = useState({
    bookTitle: "",
    studentName: "",
    startDate: "",
    endDate: "",
    status: "activo",
  });

  const [loading, setLoading] = useState(false);
  const [loadingData, setLoadingData] = useState(!!id);

  useEffect(() => {
    const loadLoan = async () => {
      if (!id) return;
      try {
        setLoadingData(true);
        const res = await getLoanRequest(id);
        const data = res.data || {};
        setForm({
          bookTitle: data.bookTitle || "",
          studentName: data.studentName || "",
          startDate: data.startDate ? data.startDate.slice(0, 10) : "",
          endDate: data.endDate ? data.endDate.slice(0, 10) : "",
          status: data.status || "activo",
        });
      } catch (error) {
        console.error(error);
        alert("No se pudo cargar el préstamo.");
      } finally {
        setLoadingData(false);
      }
    };

    loadLoan();
  }, [id]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      if (id) {
        await updateLoanRequest(id, form);
      } else {
        await createLoanRequest(form);
      }
      navigate("/loans");
    } catch (error) {
      console.error(error);
      alert("Hubo un error al guardar el préstamo.");
    } finally {
      setLoading(false);
    }
  };

  if (loadingData) {
    return <p className="text-slate-600">Cargando datos del préstamo...</p>;
  }

  return (
    <section className="max-w-lg mx-auto bg-white rounded-xl shadow-sm p-6">
      <h1 className="text-2xl font-bold text-slate-800 mb-4">
        {id ? "Editar préstamo" : "Nuevo préstamo"}
      </h1>

      <form className="space-y-4" onSubmit={handleSubmit}>
        <div>
          <label className="block text-sm font-medium text-slate-700 mb-1">
            Título del libro
          </label>
          <input
            type="text"
            name="bookTitle"
            value={form.bookTitle}
            onChange={handleChange}
            required
            className="w-full border rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-sky-400"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-slate-700 mb-1">
            Nombre del estudiante
          </label>
          <input
            type="text"
            name="studentName"
            value={form.studentName}
            onChange={handleChange}
            required
            className="w-full border rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-sky-400"
          />
        </div>

        <div className="grid grid-cols-2 gap-3">
          <div>
            <label className="block text-sm font-medium text-slate-700 mb-1">
              Fecha de inicio
            </label>
            <input
              type="date"
              name="startDate"
              value={form.startDate}
              onChange={handleChange}
              required
              className="w-full border rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-sky-400"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-slate-700 mb-1">
              Fecha de devolución
            </label>
            <input
              type="date"
              name="endDate"
              value={form.endDate}
              onChange={handleChange}
              required
              className="w-full border rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-sky-400"
            />
          </div>
        </div>

        <div>
          <label className="block text-sm font-medium text-slate-700 mb-1">
            Estado
          </label>
          <select
            name="status"
            value={form.status}
            onChange={handleChange}
            className="w-full border rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-sky-400"
          >
            <option value="activo">Activo</option>
            <option value="devuelto">Devuelto</option>
            <option value="atrasado">Atrasado</option>
          </select>
        </div>

        <button
          type="submit"
          disabled={loading}
          className="w-full bg-emerald-500 text-white font-semibold py-2 rounded-lg hover:bg-emerald-600 disabled:opacity-60"
        >
          {loading ? "Guardando..." : "Guardar préstamo"}
        </button>
      </form>
    </section>
  );
}

export default LoanForm;
