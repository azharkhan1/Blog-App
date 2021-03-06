import React, { useContext } from "react";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import CssBaseline from "@mui/material/CssBaseline";
import Divider from "@mui/material/Divider";
import Drawer from "@mui/material/Drawer";
import IconButton from "@mui/material/IconButton";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemText from "@mui/material/ListItemText";
import MenuIcon from "@mui/icons-material/Menu";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import AppRouter from "../routes/index";
import { Link, useNavigate } from "react-router-dom";
import GlobalContext from "../context/GlobalContext";
import axios from "axios";
import { serverURL } from "../../config";
const drawerWidth = 240;

function ResponsiveDrawer({ children, window }) {
  const [mobileOpen, setMobileOpen] = React.useState(false);
  const navigate = useNavigate();
  const { user, setUser } = useContext(GlobalContext);
  const handleDrawerToggle = () => {
    setMobileOpen(!mobileOpen);
  };

  const logout = () => {
    try {
      axios.post(`${serverURL}/logout`);
      setUser(false);
      navigate("/");
    } catch (err) {
      console.log("err", err);
    }
  };

  const drawer = (
    <div>
      <Toolbar />
      <Divider />
      <List>
        {!user && (
          <Link to="/" style={{ textDecoration: "inherit", color: "inherit" }}>
            <ListItem button>
              <ListItemText primary={"Sign in"} />
            </ListItem>
          </Link>
        )}
        <Divider />
        {!user && (
          <Link
            to="/signup"
            style={{ textDecoration: "inherit", color: "inherit" }}
          >
            <ListItem button>
              <ListItemText primary={"Signup"} />
            </ListItem>
          </Link>
        )}
        <Divider />
        {user && (
          <Link to="/" style={{ textDecoration: "inherit", color: "inherit" }}>
            <ListItem button>
              <ListItemText primary="Home" />
            </ListItem>
          </Link>
        )}
        {user.role === "admin" && (
          <Link
            to="/post"
            style={{ textDecoration: "inherit", color: "inherit" }}
          >
            <ListItem button>
              <ListItemText primary={"Post A Blog"} />
            </ListItem>
          </Link>
        )}

        <Divider />
        {user && (
          <ListItem button onClick={logout}>
            <ListItemText primary="Logout" />
          </ListItem>
        )}
      </List>
    </div>
  );

  const container =
    window !== undefined ? () => window().document.body : undefined;

  return (
    <Box sx={{ display: "flex" }}>
      <CssBaseline />
      <AppBar
        position="fixed"
        sx={{
          width: { sm: `calc(100% - ${drawerWidth}px)` },
          ml: { sm: `${drawerWidth}px` },
        }}
      >
        <Toolbar>
          <IconButton
            color="inherit"
            aria-label="open drawer"
            edge="start"
            onClick={handleDrawerToggle}
            sx={{ mr: 2, display: { sm: "none" } }}
          >
            <MenuIcon />
          </IconButton>
          <Typography variant="h6" noWrap component="div">
            Practice
          </Typography>
        </Toolbar>
      </AppBar>
      <Box
        component="nav"
        sx={{ width: { sm: drawerWidth }, flexShrink: { sm: 0 } }}
        aria-label="mailbox folders"
      >
        {/* The implementation can be swapped with js to avoid SEO duplication of links. */}
        <Drawer
          container={container}
          variant="temporary"
          open={mobileOpen}
          onClose={handleDrawerToggle}
          ModalProps={{
            keepMounted: true, // Better open performance on mobile.
          }}
          sx={{
            display: { xs: "block", sm: "none" },
            "& .MuiDrawer-paper": {
              boxSizing: "border-box",
              width: drawerWidth,
            },
          }}
        >
          {drawer}
        </Drawer>
        <Drawer
          variant="permanent"
          sx={{
            display: { xs: "none", sm: "block" },
            "& .MuiDrawer-paper": {
              boxSizing: "border-box",
              width: drawerWidth,
            },
          }}
          open
        >
          {drawer}
        </Drawer>
      </Box>
      <Box
        component="main"
        sx={{
          flexGrow: 1,
          p: 3,
          width: { sm: `calc(100% - ${drawerWidth}px)` },
        }}
      >
        <Toolbar />
        {children}
      </Box>
    </Box>
  );
}

export default ResponsiveDrawer;
