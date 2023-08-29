import { useEffect } from "react";
import { Layout } from "../components/Layout";
import { useAuthorBook, useBookStore } from "../../hooks";

export const Home = () => {
  const { onGetBooks, books } = useBookStore();
  const { onGetListAuthors, listAuthors } = useAuthorBook();
  useEffect(() => {
    onGetBooks();
    onGetListAuthors();
  }, []);

  return (
    <Layout>
      <div className="flex flex-col h-full md:h-5/6 w-full m-0 p-0 bg-school">
        <h1 className="text-4xl text-center font-semibold text-slate-100 backdrop-blur-md p-4 mx-auto my-2 rounded-xl">
          Bienvenido al sistema - Biblioteca Estudiantil de Pedro Pablo
          Atusparia - Vicos
        </h1>
        <div className="cards containerPage grid md:grid-cols-3 gap-4">
          <div className="overflow-hidden text-center backdrop-blur-md  rounded-xl shadow-xl text-white">
            {/*  <!-- Icon --> */}
            <figure className="p-6 pb-0">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="w-12 h-12 mx-auto stroke-slate-100"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                strokeWidth="1"
                role="graphics-symbol"
                aria-labelledby="title-01 desc-01"
              >
                <title id="title-01">Libros</title>
                <desc id="desc-01">Libros registrados en el sistema</desc>
                <path stroke="none" d="M0 0h24v24H0z"></path>
                <path d="M5 5a1 1 0 011-1h2a1 1 0 011 1v14a1 1 0 01-1 1H6a1 1 0 01-1-1zM9 5a1 1 0 011-1h2a1 1 0 011 1v14a1 1 0 01-1 1h-2a1 1 0 01-1-1zM5 8h4M9 16h4"></path>
                <path d="M13.803 4.56l2.184-.53c.562-.135 1.133.19 1.282.732l3.695 13.418a1.02 1.02 0 01-.634 1.219l-.133.041-2.184.53c-.562.135-1.133-.19-1.282-.732L13.036 5.82a1.02 1.02 0 01.634-1.219l.133-.041zM14 9l4-1M16 16l3.923-.98"></path>
              </svg>
            </figure>
            {/*  <!-- Body--> */}
            <div className="p-6">
              <h3 className="mb-4 text-xl font-medium text-slate-100">
                Hay <span className="text-white">{books.length}</span> libros
              </h3>
            </div>
          </div>
          <div className="overflow-hidden text-center backdrop-blur-md  rounded-xl shadow-xl text-white">
            {/*  <!-- Icon --> */}
            <figure className="p-6 pb-0">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="w-12 h-12 mx-auto stroke-slate-100"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                strokeWidth="1"
                role="graphics-symbol"
                aria-labelledby="title-01 desc-01"
              >
                <title id="title-01">Libros</title>
                <desc id="desc-01">Libros registrados en el sistema</desc>
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M15 19.128a9.38 9.38 0 002.625.372 9.337 9.337 0 004.121-.952 4.125 4.125 0 00-7.533-2.493M15 19.128v-.003c0-1.113-.285-2.16-.786-3.07M15 19.128v.106A12.318 12.318 0 018.624 21c-2.331 0-4.512-.645-6.374-1.766l-.001-.109a6.375 6.375 0 0111.964-3.07M12 6.375a3.375 3.375 0 11-6.75 0 3.375 3.375 0 016.75 0zm8.25 2.25a2.625 2.625 0 11-5.25 0 2.625 2.625 0 015.25 0z"
                />
              </svg>
            </figure>
            {/*  <!-- Body--> */}
            <div className="p-6">
              <h3 className="mb-4 text-xl font-medium text-slate-100">
                Hay <span className="text-white">{listAuthors.length}</span>{" "}
                autores
              </h3>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
};
