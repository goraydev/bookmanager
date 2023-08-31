import { useMemo, useState } from "react";
import { useAuthorBook } from "../../hooks/useAuthorBook";
import {
  Alert,
  Box,
  Button,
  Divider,
  FormControl,
  IconButton,
  InputLabel,
  MenuItem,
  Modal,
  Select,
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
import { ExportToCsv } from "export-to-csv";
import { useAuthStore } from "../../hooks";

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
  const [authenticityId, setAuthenticityId] = useState("");
  const {
    user: { tipousuarioid },
  } = useAuthStore();
  const [stateBook, setStateBook] = useState("");
  const { onCloseModal, calledModal, modal, msg, onSendMessage } = useUiStore();
  const [rowSelection, setRowSelection] = useState({});

  const {
    listInventory,
    onSetInventory,
    onSetActiveInventory,
    activeInventory,
    onDeleteInventory,
  } = useBookStore();
  const { idLibro } = useParams();

  const {
    formState,
    formState: { codigo, estadoId, autenticidadid },
    setFormState,
    onInputChange,
    onResetForm,
  } = useForm({
    codigo: "",
    estadoId: 1,
    autenticidadid: 2,
  });

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
        accessorKey: "autenticidad",
        header: "Autenticidad",
        size: 150,
      },
      {
        accessorKey: "valor",
        header: "Valor",
        size: 80,
      },
    ],
    []
  );

  const handleModalInventory = () => {
    calledModal();
  };

  const handleDeleteRow = (row) => {
    const { original } = row;
    toast.success("Eliminado con éxito");
    onDeleteInventory(original);
  };

  const handleEditAuthor = (row) => {
    const { original } = row;
    console.log(original);
    onSetActiveInventory(original);
  };

  const handleChangeAuthenticity = (e) => {
    setAuthenticityId(e.target.value);
  };

  const handleChangeStateBook = (e) => {
    setStateBook(e.target.value);
  };

  const handleSubmitForm = (e) => {
    e.preventDefault();

    if (activeInventory === null) {
      formState.libroId = Number(idLibro);
      formState.autenticidadid = authenticityId;
      formState.estadoId = stateBook;

      if (codigo === "" || stateBook === "" || authenticityId === "") {
        onSendMessage("Faltan campos por llenar");
        return;
      }
    } else {
      formState.codigo = codigo !== "" ? codigo : activeInventory.codigo;
      formState.estadoId =
        stateBook !== "" ? stateBook : activeInventory.estadoId;
      formState.autenticidadid =
        authenticityId !== "" ? authenticityId : activeInventory.autenticidadid;
    }

    //notify
    //notify

    if (activeInventory !== null) {
      toast.success("Inventario actualizado exitosamente", {
        duration: 2000,
      });
    } else {
      toast.success("Inventario creado exitosamente", {
        duration: 2000,
      });
    }

    //console.log(formState);
    onSetInventory(formState);
    setAuthenticityId("");
    setStateBook("");
    onResetForm();
  };

  useEffect(() => {
    if (activeInventory !== null) {
      setFormState({ ...activeInventory, libroId: Number(idLibro) });
      return;
    }
    setFormState({ codigo: "", estadoId: "", autenticidadid: "" });
  }, [activeInventory]);

  //export csv

  const csvOptions = {
    fieldSeparator: ",",
    quoteStrings: '"',
    decimalSeparator: ".",
    showLabels: true,
    useBom: true,
    useKeysAsHeaders: false,
    headers: [
      "InventarioId",
      "LibroId",
      "EstadoId",
      "Código",
      "Descripción",
      "Autenticidad",
      "Valor",
      "Color",
    ],
  };

  const csvExporter = new ExportToCsv(csvOptions);

  const handleExportData = () => {
    const dataExport = listInventory.map((inv) => {
      return {
        inventarioid: inv.inventarioid,
        libroid: inv.libroid,
        estadoid: inv.estadoid,
        codigo: inv.codigo,
        descripcion: inv.descripcion,
        autenticidad: inv.autenticidad,
        valor: inv.valor,
        color: inv.color,
      };
    });

    csvExporter.generateCsv(dataExport);
  };

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
            renderRowActions={({ row, table }) => {
              // Reemplaza "tuTipoDeUsuario" con el valor real

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
              </Box>;
            }}
            renderTopToolbarCustomActions={({ table }) => (
              <Box
                sx={{
                  display: "flex",
                  gap: "1rem",
                  p: "0.5rem",
                  flexWrap: "wrap",
                }}
              >
                {tipousuarioid === 1 ||
                tipousuarioid === 3 ||
                tipousuarioid === 5 ? (
                  <>
                    <Button
                      onClick={calledModal}
                      variant="contained"
                      size="large"
                      className="flex gap-2"
                    >
                      Nuevo inventario
                      <AddCircleOutline />
                    </Button>
                  </>
                ) : null}

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
            muiTableBodyProps={{
              sx: {
                //stripe the rows, make odd rows a darker color
                "& tr:nth-of-type(odd)": {
                  backgroundColor: "#f5f5f5",
                },
              },
            }}
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
              <FormControl variant="standard" className="w-full">
                <InputLabel id="demo-simple-select-standard-label">
                  Estado del libro
                </InputLabel>
                <Select
                  labelId="demo-simple-select-standard-label"
                  id="demo-simple-select-standard"
                  value={stateBook}
                  onChange={handleChangeStateBook}
                  label="Age"
                >
                  <MenuItem value="">
                    <em>None</em>
                  </MenuItem>
                  <MenuItem value={1}>Muy Malo</MenuItem>
                  <MenuItem value={2}>Malo</MenuItem>
                  <MenuItem value={3}>Bueno</MenuItem>
                  <MenuItem value={4}>Muy Bueno</MenuItem>
                  <MenuItem value={5}>Excelente</MenuItem>
                </Select>
              </FormControl>
              <FormControl variant="standard" className="w-full">
                <InputLabel id="demo-simple-select-standard-label">
                  Autenticidad
                </InputLabel>
                <Select
                  labelId="demo-simple-select-standard-label"
                  id="demo-simple-select-standard"
                  value={authenticityId}
                  onChange={handleChangeAuthenticity}
                  label="Age"
                >
                  <MenuItem value="">
                    <em>None</em>
                  </MenuItem>
                  <MenuItem value={1}>Original</MenuItem>
                  <MenuItem value={2}>Copia</MenuItem>
                </Select>
              </FormControl>
              <Button variant="contained" size="large" type="submit">
                {activeInventory !== null ? "Actualizar" : "Crear"}
              </Button>
            </form>
          </div>
        </Box>
      </Modal>
    </div>
  );
};
