import { useTasks } from "../context/TaskProvider";
import { useNavigate } from "react-router-dom";

function TaskCard({ task }) {
  const { deleteTask, toggleTaskDone } = useTasks();
  const navigate = useNavigate();

  const handleDone = async () => {
    await toggleTaskDone(task.id);
  };

  return (
    <div className="bg-zinc-600 text-white rounded-md py-4 ">
      <header className="flex justify-between">
        <h2 className="text-sm font-bold"> {task.title} </h2>
        <span> {task.done == 1 ? "✅" : "❌"} </span>
      </header>
      <p className="text-xs"> {task.description} </p>
      <span> {task.createdAt} </span>
      <div className="flex gap-x-2">
        <button
          className="bg-slate-300 px-2 py-1 text-black"
          onClick={() => deleteTask(task.id)}
        >
          Delete
        </button>
        <button
          className="bg-slate-300 px-2 py-1 text-black"
          onClick={() => navigate(`/edit/${task.id}`)}
        >
          Edit
        </button>
        <button
          className="bg-slate-300 px-2 py-1 text-black"
          onClick={() => handleDone(task.done)}
        >
          Confirmacion
        </button>
      </div>
    </div>
  );
}
export default TaskCard;
