import { Form, Route, Routes } from "react-router-dom";
import { useAuthStore } from "../hooks/useAuthStore";
import { Layout, FormBook } from "../book/components";
import { Home } from "../book/pages/Home";

export const AppRouter = () => {
  const { status, errorMessage } = useAuthStore();

  if (status === "checking") {
    return <div>Cargando...</div>;
  }

  return (
    <Routes>
      <Route path="/" element={<Layout />} />
      <Route path="/" index element={<Home />} />
      <Route path="/libro" element={<FormBook />} />
    </Routes>
  );
};
