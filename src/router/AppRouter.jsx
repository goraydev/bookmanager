import { Route, Routes } from "react-router-dom";
import { useAuthStore } from "../hooks/useAuthStore";
import { Layout } from "../book/components";
import { Home, Books, Authors } from "../book/pages";

export const AppRouter = () => {
  const { status, errorMessage } = useAuthStore();

  if (status === "checking") {
    return <div>Cargando...</div>;
  }

  return (
    <Routes>
      <Route path="/" element={<Layout />} />
      <Route path="/" index element={<Home />} />
      <Route path="libros" element={<Books />} />
      <Route path="autores" element={<Authors />} />
    </Routes>
  );
};
