import { Navigate, Route, Routes } from "react-router-dom";
import { useAuthStore } from "../hooks/useAuthStore";
import { Book, Layout } from "../book/components";
import { Home, Books, Authors, Users } from "../book/pages";
import { LoginPage } from "../auth/pages";
import { useEffect } from "react";

export const AppRouter = () => {
  const {
    status,
    errorMessage,
    checkSession,
    user: { tipousuarioid },
  } = useAuthStore();

  useEffect(() => {
    checkSession();
  }, []);

  if (status === "checking") {
    return <div>Cargando...</div>;
  }

  return (
    <Routes>
      {status === "not-authenticated" ? (
        <>
          <Route path="/login" element={<LoginPage />} />
          <Route path="/*" element={<Navigate to={"/login"} />} />
        </>
      ) : (
        <>
          <Route path="/" element={<Layout />} />
          <Route index element={<Home />} />
          <Route path="libros" element={<Books />} />
          <Route path="libros/:idLibro" element={<Book />} />
          <Route path="autores" element={<Authors />} />
          {tipousuarioid === 1 || tipousuarioid === 3 || tipousuarioid === 5 ? (
            <Route path="usuarios" element={<Users />} />
          ) : null}

          <Route path="/*" element={<Navigate to={"/"} />} />
        </>
      )}
    </Routes>
  );
};
