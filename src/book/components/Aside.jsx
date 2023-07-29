import { Link } from "react-router-dom";

export const Aside = () => {
  return (
    <aside className="bg-blue-400 min-h-screen w-1/4 py-4">
      <figure className="my-4 flex justify-center">
        <div>tu logo aqui</div>
      </figure>
      <section>
        <Link
          to={"/libro"}
          className="inline-flex h-12 w-full items-center justify-center gap-2 justify-self-center whitespace-nowrap bg-blue-50 px-6 text-sm font-medium tracking-wide text-blue-500 transition duration-300 hover:bg-blue-100 hover:text-blue-600 focus:bg-blue-200 focus:text-blue-700 focus-visible:outline-none disabled:cursor-not-allowed disabled:border-blue-300 disabled:bg-blue-100 disabled:text-blue-400 disabled:shadow-none"
        >
          <span>Libro</span>
        </Link>
      </section>
    </aside>
  );
};
