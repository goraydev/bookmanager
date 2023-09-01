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
import AutoStoriesIcon from "@mui/icons-material/AutoStories";
import MenuBookIcon from "@mui/icons-material/MenuBook";
import HomeIcon from "@mui/icons-material/Home";
import GroupIcon from "@mui/icons-material/Group";
import PersonAddIcon from "@mui/icons-material/PersonAdd";
import { useAuthStore } from "../../hooks";

export const Aside = () => {
  const {
    user: { tipousuarioid },
  } = useAuthStore();

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
      {tipousuarioid === 1 || tipousuarioid === 5 ? (
        <>
          <Link to={"/usuarios"}>
            <ListItem disablePadding>
              <ListItemButton>
                <ListItemIcon>
                  <PersonAddIcon />
                </ListItemIcon>
                <ListItemText>
                  <Typography>Usuarios</Typography>
                </ListItemText>
              </ListItemButton>
            </ListItem>
          </Link>
        </>
      ) : null}

      <Link to={"/libros"}>
        <ListItem disablePadding>
          <ListItemButton>
            <ListItemIcon>
              <AutoStoriesIcon />
            </ListItemIcon>
            <ListItemText>
              <Typography>Libros</Typography>
            </ListItemText>
          </ListItemButton>
        </ListItem>
      </Link>
      <Link to={"/autores"}>
        <ListItem disablePadding>
          <ListItemButton>
            <ListItemIcon>
              <GroupIcon />
            </ListItemIcon>
            <ListItemText>
              <Typography>Autores</Typography>
            </ListItemText>
          </ListItemButton>
        </ListItem>
      </Link>
    </List>
  );
};
