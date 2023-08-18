import { useMemo } from "react";
import { useAuthorBook } from "../../hooks/useAuthorBook";
import {
  Alert,
  Box,
  Button,
  Divider,
  IconButton,
  Modal,
  TextField,
  Tooltip,
} from "@mui/material";
import { MaterialReactTable } from "material-react-table";
import {
  AddCircleOutline,
  Clear,
  Delete,
  Edit,
  FileDownload,
  Visibility,
} from "@mui/icons-material";
import { MRT_Localization_ES } from "material-react-table/locales/es";
import { useUiStore } from "../../hooks/useUiStore";
import toast, { Toaster } from "react-hot-toast";
import { useBookStore } from "../../hooks/useBookStore";
import { useParams } from "react-router-dom";
import { useEffect } from "react";
import { useForm } from "../../hooks/useForm";

const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 400,
  bgcolor: "background.paper",
  border: "2px solid #00000099",
  boxShadow: 24,
  p: 4,
};

export const TableInventory = () => {
  const { onCloseModal, calledModal, modal, msg, onSendMessage } = useUiStore();
  const { onGetInventoryById, listInventory, onSetInventory } = useBookStore();
  const { idLibro } = useParams();

  const {
    formState,
    formState: { codigo, estadoId },
    setFormState,
    onInputChange,
    onResetForm,
  } = useForm({
    codigo: "",
    estadoId: 1,
  });

  const handleDeleteRow = (row) => {
    const { original } = row;
    toast.success("Eliminado con éxito");
  };

  const handleEditAuthor = (row) => {
    const { original } = row;
  };

  const columns = useMemo(
    () => [
      {
        accessorKey: "codigo", //access nested data with dot notation
        header: "Código",
        size: 150,
      },
      {
        accessorKey: "descripcion",
        header: "Descripción",
        size: 150,
      },
      {
        accessorKey: "valor",
        header: "Valor",
        size: 80,
      },
      {
        accessorKey: "color",
        header: "Color",
        size: 150,
      },
    ],
    []
  );

  const handleModalInventory = () => {
    calledModal();
  };

  const handleSubmitForm = (e) => {
    e.preventDefault();
    if (codigo === "" || estadoId === "") {
      onSendMessage("Faltan campos por llenar");
      return;
    }

    //notify

    onSetInventory(formState);
    onResetForm();
  };

  useEffect(() => {
    onGetInventoryById(idLibro);
  }, [idLibro]);

  return (
    <div className="my-8">
      <Toaster />
      <h1 className="text-2xl font-bold my-2">Lista de Inventario</h1>
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
            data={listInventory}
            positionActionsColumn="last"
            editingMode="modal" //default
            enableColumnOrdering
            enableEditing
            renderRowActions={({ row, table }) => (
              <Box sx={{ display: "flex", gap: "1rem" }}>
                <Tooltip arrow placement="top" title="Edit">
                  <IconButton onClick={() => handleEditAuthor(row)}>
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
                  onClick={calledModal}
                  variant="contained"
                  size="large"
                  className="flex gap-2"
                >
                  Nuevo inventario
                  <AddCircleOutline />
                </Button>
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
      {/* //Modal */}
      <Modal
        open={modal}
        onClose={calledModal}
        aria-labelledby="child-modal-title"
        aria-describedby="child-modal-description"
      >
        <Box sx={style}>
          <div className="flex flex-col">
            <Button className="self-end" onClick={handleModalInventory}>
              <Clear />
            </Button>
            <h1 className="text-3xl text-center font-bold my-2">
              Formulario de inventario
            </h1>
            {msg !== "" && (
              <Alert severity="error" className="my-2">
                {msg}
              </Alert>
            )}
            <form
              action=""
              className="flex flex-wrap gap-4 bg-white rounded-md"
              onSubmit={handleSubmitForm}
            >
              <TextField
                id="standard-basic-author"
                label="Código"
                variant="standard"
                className="w-full"
                name="codigo"
                value={codigo}
                onChange={onInputChange}
              />
              <TextField
                type="number"
                id="standard-basic-author"
                label="Estado"
                variant="standard"
                className="w-full"
                name="estadoId"
                value={estadoId}
                onChange={onInputChange}
                InputProps={{
                  inputProps: {
                    min: "1",
                  },
                }}
              />
              <Button variant="contained" size="large" type="submit">
                Crear
              </Button>
            </form>
          </div>
        </Box>
      </Modal>
    </div>
  );
};
