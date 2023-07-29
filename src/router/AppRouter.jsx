import { Route, Routes } from "react-router-dom";
import { useAuthStore } from "../hooks/useAuthStore";
import { Layout } from "../book/components";

export const AppRouter = () => {
  const { status, errorMessage } = useAuthStore();

  if (status === "checking") {
    return <div>Cargando...</div>;
  }

  return (
    <Routes>
      <Route path="/" element={<Layout />} />
    </Routes>
  );
};
