import {
  Alert,
  Autocomplete,
  Box,
  Button,
  Modal,
  TextField,
  Typography,
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

const tipoLibros = [
  { id: 1, tipoNombre: "Novela Teatral" },
  { id: 2, tipoNombre: "Terror" },
];

const autores = [
  { id: 1, nombreAutor: "Oliver Hansen", tipoAutor: 2 },
  { id: 2, nombreAutor: "Van Henry", tipoAutor: 2 },
  { id: 3, nombreAutor: "April Tucker", tipoAutor: 1 },
  { id: 4, nombreAutor: "Carlos Abbott", tipoAutor: 1 },
];

export const FormBook = () => {
  const { modal, calledModal, msg, onSendMessage } = useUiStore();
  const { activeBook } = useBookStore();
  const { onSetBook } = useBookStore();
  const [tipoId, setTipoId] = useState("");
  const [personName, setPersonName] = useState([]);

  let {
    formState: { nombreLib, edicion, año, editorial, autor, tipoLibro },
    formState,
    setFormState,
    onInputChange,
    onResetForm,
  } = useForm({
    nombreLib: "",
    tipoLibro: {},
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
  const handleChangeTypeBook = (event) => {
    setTipoId(event.target.value);
  };

  const handleSubmitForm = (e) => {
    e.preventDefault();

    const allBookSelected = tipoLibros.find((book) => book.id === tipoId);

    formState.tipoLibro = allBookSelected;
    formState.autor = personName;

    if (
      [nombreLib, edicion, año, editorial].some((value) => value === "") ||
      formState.autor.length === 0 ||
      tipoId === ""
    ) {
      onSendMessage("Faltan campos por llenar");
      return;
    }

    //notify

    if (activeBook !== null) {
      toast.success("Libro actualizado exitosamente", {
        duration: 2000,
      });
    } else {
      toast.success("Libro creado exitosamente", {
        duration: 2000,
      });
    }

    /*     console.log(formState); */
    onSetBook(formState);

    setPersonName([]);
    setTipoId("");
    onResetForm();
  };

  useEffect(() => {
    if (activeBook !== null) {
      setFormState({ ...activeBook });
      return;
    }
    setFormState({
      nombreLib: "",
      tipoLibro: {},
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

              {activeBook && (
                <Alert severity="info" className="w-full mt-2">
                  <strong>Autor(es) actuales: {""}</strong>
                  {activeBook.autor
                    .map((element) => element.nombreAutor)
                    .join(", ")}
                </Alert>
              )}
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
                    label="Autor o Autores"
                    placeholder="Ingrese nombre de autor"
                  />
                )}
              />

              {activeBook && (
                <Alert severity="info" className="w-full mt-4">
                  <strong>Tipo de libro actual: {""}</strong>
                  {activeBook.tipoLibro.tipoNombre}
                </Alert>
              )}
              <FormControl variant="standard" className="w-full">
                <InputLabel id="demo-simple-select-standard-label">
                  Tipo de libro
                </InputLabel>
                <Select
                  labelId="demo-simple-select-standard-label"
                  id="demo-simple-select-standard"
                  label="Tipo libro"
                  value={tipoId}
                  onChange={handleChangeTypeBook}
                >
                  <MenuItem value="">
                    <em>Ninguno</em>
                  </MenuItem>
                  {tipoLibros &&
                    tipoLibros.map((tipo) => (
                      <MenuItem value={tipo.id} key={tipo.id}>
                        {tipo.tipoNombre}
                      </MenuItem>
                    ))}
                </Select>
              </FormControl>

              <Button
                variant="contained"
                size="large"
                type="submit"
                className="w-full"
                sx={{ marginTop: "1rem" }}
              >
                {activeBook !== null ? "Actualizar" : "Crear"}
              </Button>
            </form>
          </div>
        </Box>
      </Modal>
    </>
  );
};
