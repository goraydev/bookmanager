import {
  Divider,
  List,
  ListItem,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  Typography,
} from "@mui/material";
import { Link } from "react-router-dom";
import LibraryBooksIcon from "@mui/icons-material/LibraryBooks";
import MenuBookIcon from "@mui/icons-material/MenuBook";
import HomeIcon from "@mui/icons-material/Home";
import PersonIcon from '@mui/icons-material/Person';

export const Aside = () => {
  return (
    <List>
      <Link to={"/"}>
        <ListItem disablePadding>
          <ListItemButton>
            <ListItemIcon>
              <HomeIcon />
            </ListItemIcon>
            <ListItemText>
              <Typography>Inicio</Typography>
            </ListItemText>
          </ListItemButton>
        </ListItem>
      </Link>
      <Divider />
      <Link to={"/libros"}>
        <ListItem disablePadding>
          <ListItemButton>
            <ListItemIcon>
              <LibraryBooksIcon />
            </ListItemIcon>
            <ListItemText>
              <Typography>Libros</Typography>
            </ListItemText>
          </ListItemButton>
        </ListItem>
      </Link>
      <Link to={"/nuevolibro"}>
        <ListItem disablePadding>
          <ListItemButton>
            <ListItemIcon>
              <MenuBookIcon />
            </ListItemIcon>
            <ListItemText>
              <Typography>Nuevo libro</Typography>
            </ListItemText>
          </ListItemButton>
        </ListItem>
      </Link>
      <Link to={"/nuevoautor"}>
        <ListItem disablePadding>
          <ListItemButton>
            <ListItemIcon>
              <PersonIcon />
            </ListItemIcon>
            <ListItemText>
              <Typography>Crear autor</Typography>
            </ListItemText>
          </ListItemButton>
        </ListItem>
      </Link>
    </List>
    
  );
};
