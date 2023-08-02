import {
  Alert,
  Autocomplete,
  Box,
  Button,
  Modal,
  TextField,
} from "@mui/material";
import ClearIcon from "@mui/icons-material/Clear";
import AddCircleOutlineIcon from "@mui/icons-material/AddCircleOutline";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";
import { useUiStore, useForm, useBookStore } from "../../hooks";
import { useState } from "react";
import InputLabel from "@mui/material/InputLabel";
import toast, { Toaster } from "react-hot-toast";
import { useEffect } from "react";

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

const autores = [
  { id: 1, nombreAutor: "Oliver Hansen", tipoAutor: 2 },
  { id: 2, nombreAutor: "Van Henry", tipoAutor: 2 },
  { id: 3, nombreAutor: "April Tucker", tipoAutor: 1 },
  { id: 4, nombreAutor: "Carlos Abbott", tipoAutor: 1 },
];

const tipoLibros = [
  { id: 1, tipoLibro: "Novela Teatral" },
  { id: 2, tipoLibro: "Terror" },
];

export const FormBook = () => {
  const { modal, calledModal, msg, onSendMessage } = useUiStore();
  const { activeBook } = useBookStore();
  const { onSetBook } = useBookStore();
  const [tipoId, setTipoId] = useState("");
  const [personName, setPersonName] = useState([]);

  let {
    formState: { nombreLib, edicion, año, editorial, autor },
    formState,
    setFormState,
    onInputChange,
    onResetForm,
  } = useForm({
    nombreLib: "",
    tipoId: 0,
    edicion: "",
    año: "",
    editorial: "",
    autor: [],
  });

  const handleModalBook = () => {
    calledModal();
  };

  const handleChangeAuthor = (event, value) => {
    setPersonName(value);
  };
  const handleChangeTypeBook = (event, value) => {
    setTipoId(value);
  };

  const handleSubmitForm = (e) => {
    e.preventDefault();

    formState.tipoId = tipoId;
    formState.autor = personName;
    formState._id = new Date().getTime();

    if (
      [nombreLib, tipoId, edicion, año, editorial].some(
        (value) => value === ""
      ) ||
      formState.autor.length === 0
    ) {
      onSendMessage("Faltan campos por llenar");
      return;
    }

    //notify
    toast.success("Libro creado exitosamente", {
      duration: 2000,
    });

    console.log(formState);
    /*     onSetBook(formState); */

    setPersonName([]);
    setTipoId([]);
    onResetForm();
  };

  useEffect(() => {
    if (activeBook !== null) {
      setFormState({ ...activeBook });
      return;
    }
    setFormState({
      nombreLib: "",
      tipoId: 0,
      edicion: "",
      año: "",
      editorial: "",
      autor: [],
    });
  }, [activeBook]);

  return (
    <>
      <Button
        onClick={calledModal}
        variant="contained"
        size="large"
        className="flex gap-2"
      >
        Nuevo libro
        <AddCircleOutlineIcon />
      </Button>
      <Toaster />
      <Modal
        open={modal}
        onClose={calledModal}
        aria-labelledby="child-modal-title"
        aria-describedby="child-modal-description"
      >
        <Box sx={style}>
          <div className="flex flex-col">
            <Button className="self-end" onClick={handleModalBook}>
              <ClearIcon />
            </Button>
            <h1 className="text-3xl text-center font-bold my-2">
              Formulario de datos del libro
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
                id="standard-basic"
                label="Nombre del libro"
                variant="standard"
                className="w-full"
                name="nombreLib"
                value={nombreLib}
                onChange={onInputChange}
              />
              <TextField
                id="standard-basic2"
                label="Edición"
                type="number"
                variant="standard"
                name="edicion"
                value={edicion}
                onChange={onInputChange}
              />
              <TextField
                id="standard-basic3"
                label="Año"
                type="date"
                variant="standard"
                name="año"
                value={año}
                onChange={onInputChange}
                InputLabelProps={{
                  shrink: true,
                }}
                InputProps={{
                  inputProps: {
                    max: new Date().toISOString().split("T")[0],
                    min: "1900-01-01",
                  },
                }}
              />
              <TextField
                id="standard-basic4"
                label="Editorial"
                variant="standard"
                className="w-full"
                name="editorial"
                value={editorial}
                onChange={onInputChange}
              />
              <Autocomplete
                multiple
                id="tags-standard-authorbook"
                options={autores}
                getOptionLabel={(option) => option.nombreAutor}
                className="w-full"
                value={personName}
                onChange={handleChangeAuthor}
                renderInput={(params) => (
                  <TextField
                    {...params}
                    variant="standard"
                    label="Autor o autores"
                    placeholder="Ingrese nombre de autor"
                  />
                )}
              />

              <Button
                variant="contained"
                size="large"
                type="submit"
                className="w-full"
              >
                Crear
              </Button>
            </form>
          </div>
        </Box>
      </Modal>
    </>
  );
};
