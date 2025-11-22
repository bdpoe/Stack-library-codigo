import { useTasks } from "../context/TaskProvider";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

function TaskCard({ task }) {
  const { deleteTask, toggleTaskDone } = useTasks();
  const navigate = useNavigate();
  const { user } = useAuth();

  const handleDone = async () => {
    await toggleTaskDone(task.id);
  };

  return (
    <div className="bg-white rounded-2xl border border-sky-100 shadow-sm hover:shadow-md hover:-translate-y-1 transition-transform duration-200 p-4">
      <header className="flex justify-between items-start mb-2">
        <h2 className="text-base md:text-lg font-semibold text-sky-700">
          {task.title}
        </h2>
        <span className="text-lg md:text-xl">
          {task.done == 1 ? "✅" : "⌛"}
        </span>
      </header>

      <p className="text-sm text-slate-600 mb-1">{task.description}</p>
      <span className="block text-[11px] text-slate-400 mb-3">
        {task.createdAt}
      </span>

      <div className="flex gap-2">
        {/* 🔒 SOLO BIBLIOTECARIO PUEDE ELIMINAR / EDITAR */}
        {user?.role === "librarian" && (
          <>
            <button
              className="flex-1 bg-rose-400 hover:bg-rose-500 text-white font-medium py-1.5 rounded-full text-xs md:text-sm transition-colors"
              onClick={() => deleteTask(task.id)}
            >
              Eliminar
            </button>
            <button
              className="flex-1 bg-sky-500 hover:bg-sky-600 text-white font-medium py-1.5 rounded-full text-xs md:text-sm transition-colors"
              onClick={() => navigate(`/edit/${task.id}`)}
            >
              Editar
            </button>
          </>
        )}

        {/* ✅ Confirmar puede quedar visible para ambos (si quieres) */}
        <button
          className="flex-1 bg-emerald-400 hover:bg-emerald-500 text-white font-medium py-1.5 rounded-full text-xs md:text-sm transition-colors"
          onClick={handleDone}
        >
          Confirmar
        </button>
      </div>
    </div>
  );
}
export default TaskCard;
