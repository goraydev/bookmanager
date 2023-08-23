import React, { useEffect } from "react";
import { Layout } from "./Layout";
import { useBookStore } from "../../hooks/useBookStore";
import { Button } from "@mui/material";
import ArrowBackIosIcon from "@mui/icons-material/ArrowBackIos";
import { useNavigate, useParams } from "react-router";
import bookimage from "../../assets/book.svg";
import { TableInventory } from "./TableInventory";

export const Book = () => {
  const { activeBook, onGetBookById, onGetInventory } = useBookStore();
  const { idLibro } = useParams();

  const navigate = useNavigate();

  const handleButtonBack = () => {
    navigate(-1, {
      replace: true,
    });
  };

  useEffect(() => {
    onGetInventory();
  }, []);

  useEffect(() => {
    onGetBookById(idLibro);
  }, [idLibro]);

  return (
    <Layout>
      <div className="flex flex-col overflow-hidden bg-white rounded shadow-md text-slate-500 shadow-slate-200 sm:flex-row h-96">
        {/*  <!-- Image --> */}
        <figure className="flex-1">
          <img
            src={bookimage}
            alt="imagen de libro"
            className="object-contain"
          />
        </figure>
        {/*  <!-- Body--> */}
        <div className="flex-1 p-6 sm:mx-6 sm:px-0 h-full flex flex-col justify-between items-stretch">
          <header className="flex gap-4 mb-4">
            <div>
              <h3 className="text-4xl font-medium text-slate-700">
                {activeBook?.nombrelib}
              </h3>
              <div className="flex gap-4 justify-between">
                <p className="text-sm text-slate-400">
                  {" "}
                  Año de lanzamiento: {activeBook?.año}
                </p>
                <p className="text-sm text-slate-400">
                  {" "}
                  Edicion: {activeBook?.edicion}
                </p>
              </div>
            </div>
          </header>

          <p>
            Categoría:{" "}
            <span className="text-slate-400">{activeBook?.tipolibro}</span>
          </p>
          <p>
            Editorial:{" "}
            <span className="text-slate-400">{activeBook?.editorial}</span>
          </p>
          <p>Autor(es) </p>

          <ul className="divide-y divide-slate-100 pb-2">
            {activeBook &&
              activeBook.autoresIds?.map((a) => (
                <li className="flex items-start gap-4" key={a.autorId}>
                  <div className="flex flex-col gap-0 min-h-[2rem] items-start justify-center">
                    <h4 className="text-base text-slate-400 ">
                      {a.nombreAutor}
                    </h4>
                  </div>
                </li>
              ))}
          </ul>
          <Button variant="contained" onClick={handleButtonBack}>
            <ArrowBackIosIcon />
            Volver
          </Button>
        </div>
      </div>
      <TableInventory />

      {/*<!-- End Horizontal card--> */}
    </Layout>
  );
};
