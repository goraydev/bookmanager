import { Button, Divider, Typography } from "@mui/material";
import { useMemo } from "react";
import { MaterialReactTable } from "material-react-table";
//Import Material React Table Translations
import { MRT_Localization_ES } from "material-react-table/locales/es";
import { Box, IconButton, Tooltip } from "@mui/material";
import { Delete, Edit, FileDownload } from "@mui/icons-material";
import { useBookStore } from "../../hooks/useBookStore";
import { ExportToCsv } from "export-to-csv";

export const TableBooks = () => {
  const { books, onSetActiveBook } = useBookStore();

  const handleSaveRowEdits = (newRowData) => {
    // Tu lógica para guardar los cambios de edición de fila
  };

  const handleCancelRowEdits = () => {
    // Tu lógica para cancelar la edición de fila
  };

  const handleDeleteRow = (row) => {
    // Tu lógica para eliminar una fila
  };

  const handleButtonEdit = (row) => {
    const { original } = row;
    onSetActiveBook(original);
  };

  const columns = useMemo(
    () => [
      {
        accessorKey: "nombreLib", //access nested data with dot notation
        header: "Libro",
        size: 150,
      },
      {
        accessorKey: "tipoLibro.tipoNombre",
        header: "Tipo",
        size: 150,
      },
      {
        accessorKey: "edicion", //normal accessorKey
        header: "Edición",
        size: 200,
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
    headers: columns.map((c) => c.header),
  };

  const csvExporter = new ExportToCsv(csvOptions);

  const handleExportData = (rows) => {
    const dataExport = rows.map((row) => {
      return {
        ...row.original,
        tipoLibro: row.original.tipoLibro ? row.original.tipoLibro.tipoNombre : "",
      };
    });

    csvExporter.generateCsv(dataExport);
  };

  return (
    <div className="my-4">
      <h1 className="text-2xl font-bold my-2">Libros registrados</h1>
      <Divider />
      <Box sx={{ overflow: "auto" }}>
        <Box sx={{ width: "100%", display: "table", tableLayout: "fixed" }}>
          <MaterialReactTable
            displayColumnDefOptions={{
              "mrt-row-actions": {
                muiTableHeadCellProps: {
                  align: "left",
                },
                size: 120,
              },
            }}
            columns={columns}
            data={books}
            positionActionsColumn="last"
            editingMode="modal" //default
            enableColumnOrdering
            enableEditing
            onEditingRowSave={handleSaveRowEdits}
            onEditingRowCancel={handleCancelRowEdits}
            renderRowActions={({ row, table }) => (
              <Box sx={{ display: "flex", gap: "1rem" }}>
                <Tooltip arrow placement="left" title="Edit">
                  <IconButton onClick={() => handleButtonEdit(row)}>
                    <Edit />
                  </IconButton>
                </Tooltip>
                <Tooltip arrow placement="right" title="Delete">
                  <IconButton
                    color="error"
                    onClick={() => handleDeleteRow(row)}
                  >
                    <Delete />
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
                  onClick={() =>
                    handleExportData(table.getPrePaginationRowModel().rows)
                  }
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
