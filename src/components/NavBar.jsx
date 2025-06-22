import * as React from "react";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import IconButton from "@mui/material/IconButton";
import Typography from "@mui/material/Typography";
import Menu from "@mui/material/Menu";
import MenuIcon from "@mui/icons-material/Menu";
import Container from "@mui/material/Container";
import Button from "@mui/material/Button";
import MenuItem from "@mui/material/MenuItem";
import BoltIcon from "@mui/icons-material/Bolt";
import AddIcon from "@mui/icons-material/Add";
import PersonIcon from "@mui/icons-material/Person";

import { Drawer, List, ListItem, ListItemText } from '@mui/material';

const navLinks = [
  { text: "Create Flash", href: "/#" },
  { text: "About", href: "/about"  },
];
const settings = [];

function NavBar() {
  const [anchorElNav, setAnchorElNav] = React.useState(null);

  const handleOpenNavMenu = (event) => {
    setAnchorElNav(event.currentTarget);
  };

  const handleCloseNavMenu = () => {
    setAnchorElNav(null);
  };

  return (
    <AppBar
      position="static"
      sx={{ boxShadow: "none", backgroundColor: "#2B2B2B" }}
    >
      <Container sx={{ maxWidth: "100% !important" }}>
        <Toolbar disableGutters>
          <BoltIcon
            sx={{
              display: { xs: "none", md: "flex" },
              mr: 1,
            }}
          />
          <Typography
            variant="h2"
            noWrap
            component="a"
            href="/"
            sx={{
              mr: 2,
              display: { xs: "none", md: "flex" },
              fontWeight: 700,
              textDecoration: "none",
              color: "#FFFFFF",
            }}
          >
            Flashpony
          </Typography>

          <BoltIcon
            sx={{
              display: { xs: "flex", md: "none" },
              mr: 1,
            }}
          />
          <Typography
            variant="h2"
            noWrap
            component="a"
            href="/"
            sx={{
              mr: 2,
              display: { xs: "flex", md: "none" },
              flexGrow: 1,
              fontWeight: 700,
              textDecoration: "none",
              color: "#FFFFFF",
            }}
          >
            Flashpony
          </Typography>

          <Box
            sx={{
              flexGrow: 1,
              display: { xs: "none", md: "flex", justifyContent: "end" },
            }}
            className="biggy"
          >
            {navLinks.map((link) => (
              <Button
                key={link.text}
                component="a"
                href={link.href}
                onClick={(event) => {
                    handleCloseNavMenu();
                  }}
                sx={{
                  my: 2,
                  display: "flex",
                  alignItems: "center",
                  marginRight: "15px",
                }}
              >
                {link.icon}{link.text}
              </Button>
            ))}
          </Box>
          
        <Box sx={{ display: { xs: "flex", md: "none" }, ml: "auto" }}>
            <IconButton
              size="large"
              aria-label="hamburger"
              aria-controls="menu-appbar"
              aria-haspopup="true"
              onClick={handleOpenNavMenu}
            >
              <MenuIcon sx={{ color: "#FFFFFF" }} />
            </IconButton>
            <Menu
              id="menu-appbar"
              anchorEl={anchorElNav}
              anchorOrigin={{
                vertical: "bottom",
                horizontal: "right",
              }}
              keepMounted
              transformOrigin={{
                vertical: "top",
                horizontal: "right",
              }}
              open={Boolean(anchorElNav)}
              onClose={handleCloseNavMenu}
              sx={{
                display: { xs: "block", md: "none" },
              }}
            >
              {navLinks.map((link) => (
                <MenuItem key={link.text} onClick={handleCloseNavMenu}>
                  <Box sx={{ display: "flex", alignItems: "center" }}>
                    {link.icon}
                    <Typography
                      sx={{ marginLeft: 1 }}
                      textAlign="center"
                    >
                      {link.text}
                    </Typography>
                  </Box>
                </MenuItem>
              ))}
            </Menu>
          </Box>
        </Toolbar>
      </Container>
    </AppBar>
  );
}
export default NavBar;
