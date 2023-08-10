import { useMemo } from "react";
import { useAuthorBook } from "../../hooks/useAuthorBook";
import { Box, Button, Divider, IconButton, Tooltip } from "@mui/material";
import { MaterialReactTable } from "material-react-table";
import { Delete, Edit, FileDownload, Visibility } from "@mui/icons-material";
import { MRT_Localization_ES } from "material-react-table/locales/es";

export const TableAuthors = () => {
  const { listAuthors } = useAuthorBook();

  const columns = useMemo(
    () => [
      {
        accessorKey: "nombreAutor", //access nested data with dot notation
        header: "Autor",
        size: 150,
      },
      {
        accessorKey: "tipoAutor",
        header: "Tipo",
        size: 150,
      },
    ],
    []
  );

  return (
    <div className="my-4">
      {/* <Toaster /> */}
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
                <Tooltip arrow placement="top" title="Edit">
                  <IconButton>
                    <Edit />
                  </IconButton>
                </Tooltip>
                <Tooltip arrow placement="top" title="Delete">
                  <IconButton color="error">
                    <Delete />
                  </IconButton>
                </Tooltip>
                <Tooltip arrow placement="top" title="Ver detalles">
                  <IconButton color="info">
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
