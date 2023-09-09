import { useEffect, useState } from "react";
import {
  Alert,
  Box,
  Button,
  FormControl,
  InputLabel,
  MenuItem,
  Modal,
  Select,
  TextField,
} from "@mui/material";
import { useUiStore } from "../../hooks/useUiStore";
import ClearIcon from "@mui/icons-material/Clear";
import AddCircleOutlineIcon from "@mui/icons-material/AddCircleOutline";
import { useAuthorBook } from "../../hooks/useAuthorBook";
import { useAuthStore, useForm } from "../../hooks";
import toast, { Toaster } from "react-hot-toast";

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

export const FormAuthor = () => {
  const { modal, calledModal, msg, onSendMessage } = useUiStore();
  const { typeAuthors, activeAuthorBook, onGetTypeAuthors, onSetAuhor } =
    useAuthorBook();
  const {
    user: { tipousuarioid },
  } = useAuthStore();
  const [tipoId, setTipoId] = useState("");

  let {
    formState,
    formState: { nombreAutor, tipoAutorId },
    onInputChange,
    setFormState,
    onResetForm,
  } = useForm({
    nombreAutor: "",
    tipoAutorId: 0,
  });
  const handleModalBook = () => {
    calledModal();
  };

  const handleChangeTypeAuthor = (event) => {
    setTipoId(event.target.value);
  };

  const handleSubmitForm = (e) => {
    e.preventDefault();

    if (activeAuthorBook == null) {
      formState.tipoAutorId = tipoId;
      if (nombreAutor === "" || tipoId === "") {
        onSendMessage("Faltan campos por llenar");
        return;
      }
    } else {
      formState.tipoAutorId =
        tipoId !== "" ? tipoId : activeAuthorBook.tipoAutorId;
    }

    //notify

    if (activeAuthorBook !== null) {
      toast.success("Autor actualizado exitosamente", {
        duration: 2000,
      });
    } else {
      toast.success("Autor creado exitosamente", {
        duration: 2000,
      });
    }

    // console.log(formState);
    onSetAuhor(formState);
    setTipoId("");
    onResetForm();
  };

  useEffect(() => {
    onGetTypeAuthors();
    if (activeAuthorBook !== null) {
      setFormState({
        ...activeAuthorBook,
        nombreAutor: activeAuthorBook.nombreautor,
        
      });
      return;
    }
    setFormState({
      nombreAutor: "",
      tipoAutorId: 0,
    });
  }, [activeAuthorBook]);

  return (
    <>
      {tipousuarioid === 1 || tipousuarioid === 3 || tipousuarioid === 5 ? (
        <>
          <Button
            onClick={calledModal}
            variant="contained"
            size="large"
            className="flex gap-2"
          >
            Nuevo autor
            <AddCircleOutlineIcon />
          </Button>
        </>
      ) : null}

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
              Formulario de datos del autor
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
                label="Nombre del autor"
                variant="standard"
                className="w-full"
                name="nombreAutor"
                value={nombreAutor}
                onChange={onInputChange}
              />

              <FormControl variant="standard" className="w-full">
                <InputLabel id="demo-simple-select-standard-label">
                  Tipo de autor
                </InputLabel>
                <Select
                  labelId="demo-simple-select-standard-label"
                  id="demo-simple-select-standard"
                  label="Tipo libro"
                  value={tipoId}
                  onChange={handleChangeTypeAuthor}
                >
                  <MenuItem value="">
                    <em>Ninguno</em>
                  </MenuItem>
                  {typeAuthors &&
                    typeAuthors.map((tipo) => (
                      <MenuItem value={tipo.tipoAutorId} key={tipo.tipoAutorId}>
                        {tipo.tipoautor}
                      </MenuItem>
                    ))}
                </Select>
              </FormControl>
              <Button variant="contained" size="large" type="submit">
                {activeAuthorBook !== null ? "Actualizar" : "Crear"}
              </Button>
            </form>
          </div>
        </Box>
      </Modal>
    </>
  );
};
