import { useMemo } from "react";
import { useAuthorBook } from "../../hooks/useAuthorBook";
import { Box, Button, Divider, IconButton, Tooltip } from "@mui/material";
import { MaterialReactTable } from "material-react-table";
import { Delete, Edit, FileDownload, Visibility } from "@mui/icons-material";
import { MRT_Localization_ES } from "material-react-table/locales/es";
import { useUiStore } from "../../hooks/useUiStore";
import toast, { Toaster } from "react-hot-toast";
import { ExportToCsv } from "export-to-csv";
import { useAuthStore } from "../../hooks/useAuthStore";

export const TableAuthors = () => {
  const { listAuthors, onSetActiveAuthor, onDeleteAuthor } = useAuthorBook();
  const { onCloseModal } = useUiStore();
  const {
    user: { tipousuarioid },
  } = useAuthStore();

  const handleDeleteRow = (row) => {
    const { original } = row;
    toast.success("Eliminado con éxito");
    onDeleteAuthor(original);
  };

  const handleEditAuthor = (row) => {
    const { original } = row;
    onSetActiveAuthor(original);
  };

  const columns = useMemo(
    () => [
      {
        accessorKey: "nombreautor", //access nested data with dot notation
        header: "Autor",
        size: 150,
      },
      {
        accessorKey: "tipoautor",
        header: "Tipo",
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
    filename: "Lista general de autores",
    title: "Lista de autores",
    useKeysAsHeaders: false,
    headers: ["AutorId", "Autor", "Tipo"],
  };

  const csvExporter = new ExportToCsv(csvOptions);

  const handleExportData = () => {
    const dataExport = listAuthors.map((author) => {
      return {
        autorid: author.autorID,
        nombreAutor: author.nombreautor,
        tipoAutor: author.tipoautor,
      };
    });

    csvExporter.generateCsv(dataExport);
  };

  return (
    <div className="my-4">
      <Toaster />
      <h1 className="text-2xl font-bold my-2">Autores registrados</h1>
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
            data={listAuthors}
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
                      <IconButton onClick={() => handleEditAuthor(row)}>
                        <Edit />
                      </IconButton>
                    </Tooltip>
                  </>
                ) : null}
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
