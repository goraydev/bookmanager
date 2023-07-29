import { Link, useLocation } from "react-router-dom";

export const Aside = () => {
  const location = useLocation();

  return (
    <aside className="bg-blue-500 min-h-screen w-1/4 py-4">
      <figure className="my-4 flex justify-center">
        <Link to={"/"}>tu logo aqui</Link>
      </figure>
      <section className="flex flex-col gap-2">
        <Link
          to={"/libros"}
          className={`inline-flex h-12 w-full items-center justify-center gap-2 justify-self-center whitespace-nowrap ${
            location.pathname === "/libros"
              ? "bg-blue-50 px-6 text-sm font-medium tracking-wide text-blue-500 transition duration-300 hover:bg-blue-100 hover:text-blue-600 focus:bg-blue-200 focus:text-blue-700 focus-visible:outline-none disabled:cursor-not-allowed disabled:border-blue-300 disabled:bg-blue-100 disabled:text-blue-400 disabled:shadow-none"
              : ""
          }`}
        >
          <span className="text-xl">Libros</span>
        </Link>
        <Link
          to={"/nuevolibro"}
          className={`inline-flex h-12 w-full items-center justify-center gap-2 justify-self-center whitespace-nowrap ${
            location.pathname === "/nuevolibro"
              ? "bg-blue-50 px-6 text-sm font-medium tracking-wide text-blue-500 transition duration-300 hover:bg-blue-100 hover:text-blue-600 focus:bg-blue-200 focus:text-blue-700 focus-visible:outline-none disabled:cursor-not-allowed disabled:border-blue-300 disabled:bg-blue-100 disabled:text-blue-400 disabled:shadow-none"
              : ""
          }`}
        >
          <span className="text-xl">Nuevo Libro</span>
        </Link>
      </section>
    </aside>
  );
};
