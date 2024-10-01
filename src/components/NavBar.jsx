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
import CalendarTodayIcon from "@mui/icons-material/CalendarToday";
import AddIcon from "@mui/icons-material/Add";
import PersonIcon from "@mui/icons-material/Person";

const navLinks = [
  { text: "My events", icon: <CalendarTodayIcon sx={{ marginRight: '5px' }} /> },
  { text: "Create event", icon: <AddIcon sx={{ marginRight: '5px' }} /> },
];
const settings = ["Account", "Logout"];

function NavBar() {
  const [anchorElNav, setAnchorElNav] = React.useState(null);
  const [anchorElUser, setAnchorElUser] = React.useState(null);

  const handleOpenNavMenu = (event) => {
    setAnchorElNav(event.currentTarget);
  };
  const handleOpenUserMenu = (event) => {
    setAnchorElUser(event.currentTarget);
  };

  const handleCloseNavMenu = () => {
    setAnchorElNav(null);
  };

  const handleCloseUserMenu = () => {
    setAnchorElUser(null);
  };

  return (
    <AppBar
      position="static"
      sx={{ backgroundColor: "primaryLight", boxShadow: "none" }}
    >
      <Container sx={{ maxWidth: "100% !important" }}>
        <Toolbar disableGutters>
          <BoltIcon
            sx={{
              display: { xs: "none", md: "flex" },
              mr: 1,
              color: "text.dark",
            }}
          />
          <Typography
            variant="h2"
            noWrap
            component="a"
            href="#"
            sx={{
              mr: 2,
              display: { xs: "none", md: "flex" },
              fontWeight: 700,
              color: "text.dark",
              textDecoration: "none",
            }}
          >
            FlashPony
          </Typography>

          <Box sx={{ flexGrow: 1, display: { xs: "flex", md: "none" } }}>
            <IconButton
              size="large"
              aria-label="hamburger"
              aria-controls="menu-appbar"
              aria-haspopup="true"
              onClick={handleOpenNavMenu}
              color="text.dark"
            >
              <MenuIcon sx={{ color: "text.dark" }} />
            </IconButton>
            <Menu
              id="menu-appbar"
              anchorEl={anchorElNav}
              anchorOrigin={{
                vertical: "bottom",
                horizontal: "left",
              }}
              keepMounted
              transformOrigin={{
                vertical: "top",
                horizontal: "left",
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
                      sx={{ color: "text.dark", marginLeft: 1 }}
                      textAlign="center"
                    >
                      {link.text}
                    </Typography>
                  </Box>
                </MenuItem>
              ))}
            </Menu>
          </Box>
          <BoltIcon
            sx={{
              display: { xs: "flex", md: "none" },
              mr: 1,
              color: "text.dark",
            }}
          />
          <Typography
            variant="h2"
            noWrap
            component="a"
            href="#"
            sx={{
              mr: 2,
              display: { xs: "flex", md: "none" },
              flexGrow: 1,
              fontWeight: 700,
              color: "text.dark",
              textDecoration: "none",
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
                onClick={handleCloseNavMenu}
                sx={{
                  my: 2,
                  color: "text.dark",
                  display: "flex",
                  alignItems: "center",
                  marginRight: "15px",
                }}
              >
                {link.icon}{link.text}
              </Button>
            ))}
          </Box>

          <Box sx={{ flexGrow: 0 }} className="smalley">
            <IconButton onClick={handleOpenUserMenu} sx={{ p: 0 }}>
              <PersonIcon sx={{ color: 'text.dark' }} />
            </IconButton>
            <Menu
              sx={{ mt: "45px" }}
              id="menu-appbar"
              anchorEl={anchorElUser}
              anchorOrigin={{
                vertical: "top",
                horizontal: "right",
              }}
              keepMounted
              transformOrigin={{
                vertical: "top",
                horizontal: "right",
              }}
              open={Boolean(anchorElUser)}
              onClose={handleCloseUserMenu}
            >
              {settings.map((setting) => (
                <MenuItem key={setting} onClick={handleCloseUserMenu}>
                  <Typography textAlign="center">{setting}</Typography>
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
