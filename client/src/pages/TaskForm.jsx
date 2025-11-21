import { Form, Formik } from "formik";
import { useTasks } from "../context/TaskProvider";
import { useParams, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";

function TasksForm() {
  const { createTask, getTasks, updateTask } = useTasks(); //CREAR,AGREGAR, ACTUALIZAR

  const [task, setTask] = useState({
    title: "",
    description: "",
  });

  const params = useParams();
  const navigate = useNavigate();

  useEffect(() => {
    const loadTasks = async () => {
      if (params.id) {
        const task = await getTasks(params.id);
        console.log(task);
        setTask({
          title: task.title,
          description: task.description,
        });
      }
    };
    loadTasks();
  }, []);

  return (
    <div className="mx-auto" >
      <Formik
        initialValues={task}
        enableReinitialize={true}
        onSubmit={async (values, actions) => {
          console.log(values);

          if (params.id) {
            await updateTask(params.id, values);
          
          } else {
            await createTask(values);
          }
          navigate("/");

          setTask({
            title: "",
            description: "",
          });
        }}
      >
        {({ handleChange, handleSubmit, values, isSubmitting }) => (
          <form
            onSubmit={handleSubmit}
            className="bg-slate-300 max-w-sm rounded-md p-4 mx-auto mt-10 "
          >
           <h1 className="text-xl font-bold uppercase text-center" >{params.id ? "Edit Task" : "New Task"}</h1>

            <label className="block">Titulo</label>
            <input
              type="text"
              name="title"
              placeholder="escriba un titulo"
              className="px-2 py-1 rounded-sm w-full bg-blue-50"
              onChange={handleChange}
              value={values.title}
            />
            <label className="block">Descripcion</label>
            <textarea
              name="description"
              rows="3"
              placeholder="escriba una descripcion"
              onChange={handleChange}
              className="px-2 py-1 rounded-sm w-full bg-blue-50 "
              value={values.description}
            ></textarea>

            <button type="submit" disabled={isSubmitting} className=" block bg-indigo-500 px-2 py-1 text-white w-full rounded-b-md ">
              {isSubmitting ? "saving..." : "Guardar"}
            </button>
          </form>
        )}
      </Formik>
    </div>
  );
}

export default TasksForm;
