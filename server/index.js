import express from "express";
//editar el "type": "module" y "dev" : "nodemon server/index.js"
import { PORT } from "./config.js";
import cors from "cors";

import indexRoutes from "./routes/index.routes.js";
import taskRoutes from "./routes/tasks.routes.js";

const app = express();
app.use(cors());                       //'http//localhost:5173'
app.use(express.json()); //se adiciono 

app.use(indexRoutes);
app.use(taskRoutes);
app.listen(PORT);
console.log("server is listening on port ${PORT}");
