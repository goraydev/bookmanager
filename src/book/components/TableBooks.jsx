import { Button, Divider, Typography } from "@mui/material";
import { useMemo } from "react";
import { MaterialReactTable } from "material-react-table";
//Import Material React Table Translations
import { MRT_Localization_ES } from "material-react-table/locales/es";
import { Box, IconButton, Tooltip } from "@mui/material";
import { Delete, Edit, FileDownload, Visibility } from "@mui/icons-material";
import { ExportToCsv } from "export-to-csv";
import { Toaster, toast } from "react-hot-toast";
import { useNavigate } from "react-router";
import { useBookStore, useUiStore, useAuthStore } from "../../hooks";

export const TableBooks = () => {
  const { books, onSetActiveBook, onDeleteBook } = useBookStore();
  const {
    user: { tipousuarioid },
  } = useAuthStore();
  const { onCloseModal } = useUiStore();
  const navigate = useNavigate();

  const handleDeleteRow = (row) => {
    const { original } = row;
    toast.success("Eliminado con éxito");
    onDeleteBook(original);
  };

  const handleButtonEdit = (row) => {
    const { original } = row;
    onSetActiveBook(original);
  };

  const handleViewDetails = (row) => {
    const { original } = row;
    onSetActiveBook(original);

    navigate(`/libros/${original.libroid}`);
    onCloseModal();
  };

  const columns = useMemo(
    () => [
      {
        accessorKey: "nombrelib", //access nested data with dot notation
        header: "Libro",
        size: 150,
      },
      {
        accessorKey: "tipolibro",
        header: "Tipo",
        size: 150,
      },
      {
        accessorKey: "edicion", //normal accessorKey
        header: "Edición",
        size: 50,
      },
      {
        accessorKey: "año",
        header: "Año",
        size: 150,
      },
      {
        accessorKey: "editorial",
        header: "Editorial",
        size: 150,
      },
    ],
    []
  );

  const csvOptions = {
    fieldSeparator: ",",
    quoteStrings: '"',
    decimalSeparator: ".",
    showLabels: true,
    useBom: true,
    useKeysAsHeaders: false,
    headers: [
      "LibroId",
      "Libro",
      "Tipo",
      " Edicion",
      " Año",
      " Editorial",
      "Autor",
    ],
  };

  const csvExporter = new ExportToCsv(csvOptions);

  const handleExportData = () => {
    const dataExport = books.map((book) => {
      const autores = book.autoresIds
        .map((autor) => autor.nombreAutor)
        .join(", ");
      return {
        libroid: book.libroid,
        nombrelib: book.nombrelib,
        tipolibro: book.tipolibro,
        edicion: book.edicion,
        año: book.año,
        editorial: book.editorial,
        autor: autores,
      };
    });

    csvExporter.generateCsv(dataExport);
  };

  return (
    <div className="my-4">
      <Toaster />
      <h1 className="text-2xl font-bold my-2">Libros registrados</h1>
      <Divider />
      <Box sx={{ overflow: "auto" }}>
        <Box sx={{ width: "100%", display: "table", tableLayout: "fixed" }}>
          <MaterialReactTable
            displayColumnDefOptions={{
              "mrt-row-actions": {
                muiTableHeadCellProps: {
                  align: "center",
                },
                size: 50,
              },
            }}
            columns={columns}
            data={books}
            positionActionsColumn="last"
            editingMode="modal" //default
            enableColumnOrdering
            enableEditing
            renderRowActions={({ row, table }) => (
              <Box sx={{ display: "flex", gap: "1rem" }}>
                {tipousuarioid === 1 ||
                tipousuarioid === 3 ||
                tipousuarioid === 5 ? (
                  <>
                    <Tooltip arrow placement="top" title="Edit">
                      <IconButton onClick={() => handleButtonEdit(row)}>
                        <Edit />
                      </IconButton>
                    </Tooltip>
                    <Tooltip arrow placement="top" title="Delete">
                      <IconButton
                        color="error"
                        onClick={() => handleDeleteRow(row)}
                      >
                        <Delete />
                      </IconButton>
                    </Tooltip>
                  </>
                ) : null}

                <Tooltip arrow placement="top" title="Ver detalles">
                  <IconButton
                    color="info"
                    onClick={() => handleViewDetails(row)}
                  >
                    <Visibility />
                  </IconButton>
                </Tooltip>
              </Box>
            )}
            renderTopToolbarCustomActions={({ table }) => (
              <Box
                sx={{
                  display: "flex",
                  gap: "1rem",
                  p: "0.5rem",
                  flexWrap: "wrap",
                }}
              >
                <Button
                  color="success"
                  //export all data that is currently in the table (ignore pagination, sorting, filtering, etc.)
                  onClick={() => handleExportData()}
                  startIcon={<FileDownload />}
                  variant="contained"
                >
                  Exportar Data
                </Button>
              </Box>
            )}
            localization={MRT_Localization_ES}
          />
        </Box>
      </Box>
    </div>
  );
};
