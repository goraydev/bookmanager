import {
  Alert,
  Box,
  Button,
  FormControl,
  FormControlLabel,
  FormLabel,
  IconButton,
  Input,
  InputAdornment,
  InputLabel,
  OutlinedInput,
  Radio,
  RadioGroup,
  TextField,
} from "@mui/material";
import Visibility from "@mui/icons-material/Visibility";
import VisibilityOff from "@mui/icons-material/VisibilityOff";
import { useState } from "react";
import { useAuthStore, useForm, useUiStore } from "../../hooks";
import toast, { Toaster } from "react-hot-toast";

export const FormUser = () => {
  const [showPassword, setShowPassword] = useState(false);
  const handleClickShowPassword = () => setShowPassword((show) => !show);
  const handleMouseDownPassword = (event) => {
    event.preventDefault();
  };

  const { msg, onSendMessage } = useUiStore();
  const { onCreateUser } = useAuthStore();

  const {
    formState,
    formState: { usu, pwsd, tipousuarioid },
    onInputChange,
    onResetForm,
  } = useForm({
    usu: "",
    pwsd: "",
    tipousuarioid: "",
  });

  const handleSubmit = (e) => {
    e.preventDefault();

    if ([usu, pwsd, tipousuarioid].includes("")) {
      onSendMessage("Complete todos los campos");
      return;
    }

    onCreateUser(formState);

    toast.success("Nuevo usuario creado exitosamente", {
      duration: 2000,
    });

    onResetForm();
  };

  return (
    <>
      <Toaster />
      <h1 className="text-4xl text-center font-bold my-2">
        Crear un nuevo usuario
      </h1>
      <h2 className="text-xl text-center font-bold my-2 text-slate-700">
        Complete el formulario
      </h2>
      {msg !== "" && (
        <Alert severity="error" className="my-2 container mx-auto w-2/4">
          {msg}
        </Alert>
      )}
      <form
        action=""
        className="container mx-auto w-2/4  flex flex-col gap-6"
        onSubmit={handleSubmit}
      >
        <TextField
          id="usu"
          label="Ingrese nombre de usuario"
          variant="standard"
          type="text"
          name="usu"
          value={usu}
          onChange={onInputChange}
        />
        <FormControl variant="standard">
          <InputLabel htmlFor="standard-adornment-password">
            Password
          </InputLabel>
          <Input
            id="standard-adornment-password"
            type={showPassword ? "text" : "password"}
            endAdornment={
              <InputAdornment position="end">
                <IconButton
                  aria-label="toggle password visibility"
                  onClick={handleClickShowPassword}
                  onMouseDown={handleMouseDownPassword}
                >
                  {showPassword ? <VisibilityOff /> : <Visibility />}
                </IconButton>
              </InputAdornment>
            }
            name="pwsd"
            value={pwsd}
            onChange={onInputChange}
          />
        </FormControl>

        <FormControl>
          <FormLabel id="demo-row-radio-buttons-group-label">
            Tipo de usuario
          </FormLabel>
          <RadioGroup
            row
            aria-labelledby="demo-row-radio-buttons-group-label"
            name="row-radio-buttons-group"
          >
            <FormControlLabel
              value={1}
              control={<Radio />}
              label="Director"
              name="tipousuarioid"
              onChange={onInputChange}
            />
            <FormControlLabel
              value={2}
              control={<Radio />}
              label="Administrador"
              name="tipousuarioid"
              onChange={onInputChange}
            />
            <FormControlLabel
              value={3}
              control={<Radio />}
              label="Encargado bibliotecario"
              name="tipousuarioid"
              onChange={onInputChange}
            />
            <FormControlLabel
              value={4}
              control={<Radio />}
              label="Operario"
              name="tipousuarioid"
              onChange={onInputChange}
            />
             <FormControlLabel
              value={5}
              control={<Radio />}
              label="Desarrollador"
              name="tipousuarioid"
              onChange={onInputChange}
            />
          </RadioGroup>
        </FormControl>

        <Button variant="contained" size="large" type="submit">
          Crear usuario
        </Button>
      </form>
    </>
  );
};
