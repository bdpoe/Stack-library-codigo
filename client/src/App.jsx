import { Routes, Route, Navigate } from "react-router-dom";

import TasksPage from "./pages/TasksPage";
import TasksForm from "./pages/TaskForm";
import NotFound from "./pages/NotFound";
import Navbar from "./components/Navbar";
import { TaskContextProvider } from "./context/TaskProvider";
import { AuthProvider, useAuth } from "./context/AuthContext";
import LoginPage from "./pages/LoginPage";
import LoansPage from "./pages/LoansPage";
import LoanForm from "./pages/LoanForm";

// 🔒 Rutas protegidas solo para bibliotecario
function LibrarianRoute({ children }) {
  const { user } = useAuth();
  if (!user) return <Navigate to="/login" />;
  if (user.role !== "librarian") return <Navigate to="/" />;
  return children;
}

// 🔒 Todas las rutas protegidas del sistema
function AppRoutes() {
  const { user } = useAuth();

  return (
    <TaskContextProvider>
      <Routes>
        {/* Login público */}
        <Route path="/login" element={<LoginPage />} />

        {/* Home: requiere usuario */}
        <Route
          path="/"
          element={user ? <TasksPage /> : <Navigate to="/login" />}
        />

        {/* CRUD Tasks */}
        <Route
          path="/new"
          element={
            <LibrarianRoute>
              <TasksForm />
            </LibrarianRoute>
          }
        />

        <Route
          path="/edit/:id"
          element={
            <LibrarianRoute>
              <TasksForm />
            </LibrarianRoute>
          }
        />

        {/* CRUD Loans */}
        <Route
          path="/loans"
          element={
            <LibrarianRoute>
              <LoansPage />
            </LibrarianRoute>
          }
        />

        <Route
          path="/loans/new"
          element={
            <LibrarianRoute>
              <LoanForm />
            </LibrarianRoute>
          }
        />

        <Route
          path="/loans/edit/:id"
          element={
            <LibrarianRoute>
              <LoanForm />
            </LibrarianRoute>
          }
        />

        {/* Not found */}
        <Route path="*" element={<NotFound />} />
        <Route
          path="/loans"
          element={
            <LibrarianRoute>
              <LoansPage />
            </LibrarianRoute>
          }
        />

        <Route
          path="/loans/new"
          element={
            <LibrarianRoute>
              <LoanForm />
            </LibrarianRoute>
          }
        />

        <Route
          path="/loans/edit/:id"
          element={
            <LibrarianRoute>
              <LoanForm />
            </LibrarianRoute>
          }
        />
      </Routes>
    </TaskContextProvider>
  );
}

function App() {
  return (
    <AuthProvider>
      <div className="min-h-screen bg-gradient-to-b from-sky-100 via-sky-150 to-emerald-50 text-slate-800 flex flex-col">
        <Navbar />

        <div className="flex-grow container mx-auto px-4 md:px-10 py-8">
          <AppRoutes />
        </div>

        <footer className="text-center py-4 text-slate-500 text-xs md:text-sm border-t border-sky-100 bg-white/60 backdrop-blur"></footer>
      </div>
    </AuthProvider>
  );
}

export default App;
