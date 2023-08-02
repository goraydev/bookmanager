import { Divider } from "@mui/material";
import { useCallback, useState, useMemo } from "react";
import { MaterialReactTable } from "material-react-table";
//Import Material React Table Translations
import { MRT_Localization_ES } from "material-react-table/locales/es";
import {
  Box,
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  IconButton,
  MenuItem,
  Stack,
  TextField,
  Tooltip,
} from "@mui/material";
import { Delete, Edit } from "@mui/icons-material";
import { useBookStore } from "../../hooks/useBookStore";

const data = [
  {
    nombreLib: "Cualquier libro",
    tipoId: 10,
    edicion: "2",
    año: "2023-07-31",
    editorial: "Lumbreras",
  },
  {
    nombreLib: "Cualquier libro 2",
    tipoId: 2,
    edicion: "1",
    año: "2020-06-29",
    editorial: "Lumbreras",
  },
];

export const TableBooks = () => {
  const { books } = useBookStore();

  const handleSaveRowEdits = (newRowData) => {
    // Tu lógica para guardar los cambios de edición de fila
  };

  const handleCancelRowEdits = () => {
    // Tu lógica para cancelar la edición de fila
  };

  const handleDeleteRow = (row) => {
    // Tu lógica para eliminar una fila
  };

  const columns = useMemo(
    () => [
      {
        accessorKey: "nombreLib", //access nested data with dot notation
        header: "Libro",
        size: 150,
      },
      {
        accessorKey: "tipoId",
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
                  <IconButton onClick={() => table.setEditingRow(row)}>
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
            localization={MRT_Localization_ES}
          />
        </Box>
      </Box>
    </div>
  );
};
