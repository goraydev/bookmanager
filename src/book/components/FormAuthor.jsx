import { useEffect } from "react";
import { Autocomplete, Box, Button, Modal, TextField } from "@mui/material";
import { useUiStore } from "../../hooks/useUiStore";
import ClearIcon from "@mui/icons-material/Clear";
import AddCircleOutlineIcon from "@mui/icons-material/AddCircleOutline";
import { useAuthorBook } from "../../hooks/useAuthorBook";

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
  const { modal, calledModal } = useUiStore();
  const { typeAuthors, onGetTypeAuthors } = useAuthorBook();

  const handleModalBook = () => {
    calledModal();
  };

  useEffect(() => {
    onGetTypeAuthors();
    
  }, []);

  return (
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
            <form
              action=""
              className="flex flex-wrap gap-4 bg-white rounded-md"
            >
              <TextField
                id="standard-basic-author"
                label="Nombre del autor"
                variant="standard"
                name="nameAuthor"
                className="w-full"
              />

              <Autocomplete
                id="tags-standard-type"
                options={typeAuthors}
                getOptionLabel={(option) => option.tipoAutor}
                className="w-full"
                renderInput={(params) => (
                  <TextField
                    {...params}
                    variant="standard"
                    label="Tipo de autor"
                    placeholder="Ingrese nombre del tipo"
                  />
                )}
              />
              <Button variant="contained" size="large" type="submit">
                Crear
              </Button>
            </form>
          </div>
        </Box>
      </Modal>
    </>
  );
};
