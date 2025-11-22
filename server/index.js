import express from "express";
import { PORT } from "./config.js";
import cors from "cors";

import indexRoutes from "./routes/index.routes.js";
import taskRoutes from "./routes/tasks.routes.js";
import authRoutes from "./routes/auth.routes.js";  // 🔹 nuevo
import loansRoutes from "./routes/loans.routes.js";

const app = express();

app.use(cors());
app.use(express.json());
app.use(loansRoutes);

// 🔸 Registrar rutas
app.use(indexRoutes);
app.use(taskRoutes);
app.use(authRoutes);  // 🔹 nuevo: activa /login

app.listen(PORT);
console.log(`Server is listening on port ${PORT}`);
