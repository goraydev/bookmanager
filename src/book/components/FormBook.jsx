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
import { useUiStore, useForm, useBookStore, useAuthorBook } from "../../hooks";
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

export const FormBook = () => {
  const { modal, calledModal, msg, onSendMessage } = useUiStore();
  const { listAuthors, onGetListAuthors } = useAuthorBook();
  const { activeBook, onSetBook, onGetTypeBooks, listTypeBook } =
    useBookStore();
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
    tipoId: "",
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

    if (activeBook === null) {
      formState.tipoId = tipoId;
      const selectedAuthorIds = personName.map((option) => option.autorID);
      formState.autor = selectedAuthorIds;

      const anyFieldEmpty = [nombreLib, edicion, año, editorial].some(
        (value) => value === ""
      );

      if (anyFieldEmpty || personName.length === 0 || tipoId === "") {
        onSendMessage("Faltan campos por llenar");
        return;
      }
    } else {
      if (personName.length > 0) {
        const selectedAuthorIds = personName.map((option) => option.autorID);
        formState.autor = selectedAuthorIds;
      } else {
        const selectedAuthorIds = activeBook.autoresIds.map(
          (option) => option.autorId
        );
        formState.autor = selectedAuthorIds;
      }

      formState.tipoId = tipoId !== "" ? tipoId : activeBook.tipolibroid;
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

    //console.log(formState);
    onSetBook(formState);

    setPersonName([]);
    setTipoId("");
    onResetForm();
  };

  useEffect(() => {
    onGetTypeBooks();
    onGetListAuthors();
    if (activeBook !== null) {
      setFormState({ ...activeBook });
      return;
    }
    setFormState({
      nombreLib: "",
      tipoId: {},
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
                inputProps={{ min: 1 }}
                variant="standard"
                name="edicion"
                value={edicion}
                onChange={onInputChange}
              />
              <TextField
                id="standard-basic3"
                label="Año"
                type="number"
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
                    min: "1900",
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
                  <strong>Autor(es) actual(es): {""}</strong>
                  {activeBook.autoresIds
                    ?.map((element) => element.nombreAutor)
                    .join(", ")}
                </Alert>
              )}
              <Autocomplete
                multiple
                id="tags-standard-authorbook"
                options={listAuthors}
                getOptionLabel={(option) => option.nombreautor}
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
                  <strong>Tipo actual: {""}</strong>
                  {activeBook.tipolibro}
                </Alert>
              )}
              <FormControl variant="standard" className="w-full">
                <InputLabel id="demo-simple-select-standard-label">
                  Tipo
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
                  {listTypeBook &&
                    listTypeBook.map((tipo) => (
                      <MenuItem value={tipo.tipoLibroId} key={tipo.tipoLibroId}>
                        {tipo.tipoLibro1}
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
