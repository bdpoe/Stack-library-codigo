import axios from "axios";

export const getTaskRequest = async (task) => //varias tareas
  await axios.get("http://localhost:4000/tasks");


export const createTaskRequest = async (task) => 
  await axios.post("http://localhost:4000/tasks", task);

export const deleteTaskRequest = async (id) => 
  await axios.delete(`http://localhost:4000/tasks/${id}`);

export const getTasksRequest = async (id) => //una tarea 
  await axios.get(`http://localhost:4000/tasks/${id}`);

export const updateTaskRequest = async (id, newFields) => //editar tarea
  await axios.put(`http://localhost:4000/tasks/${id}`, newFields);

export const toggleTaskDoneRequest = async (id, done) => //el estado
  await axios.put(`http://localhost:4000/tasks/${id}`,{
    done,
  } );