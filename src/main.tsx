import { createRoot } from "react-dom/client";
import { BrowserRouter, Routes, Route } from "react-router";
import App from "./app/App.tsx";
import AdminPage from "./app/components/admin/AdminPage.tsx";
import { Toaster } from "sonner";
import "./styles/index.css";

createRoot(document.getElementById("root")!).render(
  <BrowserRouter>
    <Routes>
      <Route path="/" element={<App />} />
      <Route path="/admin/*" element={<AdminPage />} />
    </Routes>
    <Toaster richColors position="top-right" />
  </BrowserRouter>
);