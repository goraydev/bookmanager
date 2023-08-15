import { Route, Routes } from "react-router-dom";
import { useAuthStore } from "../hooks/useAuthStore";
import { Book, Layout } from "../book/components";
import { Home, Books, Authors } from "../book/pages";
import { LoginPage } from "../auth/pages";

export const AppRouter = () => {
  const { status, errorMessage } = useAuthStore();

  if (status === "checking") {
    return <div>Cargando...</div>;
  }

  return (
    <Routes>
      {status === "authenticated" ? (
        <>
          <Route path="/" element={<Layout />} />
          <Route path="/" index element={<Home />} />
          <Route path="libros" element={<Books />} />
          <Route path="libros/:idLibro" element={<Book />} />
          <Route path="autores" element={<Authors />} />
        </>
      ) : (
        <Route path="login" element={<LoginPage />} />
      )}
    </Routes>
  );
};
