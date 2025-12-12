import React, { useEffect, useState } from "react";
import AppBar from "@mui/material/AppBar";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import Box from "@mui/material/Box";
import IconButton from "@mui/material/IconButton";
import LightModeIcon from "@mui/icons-material/LightMode";
import DarkModeIcon from "@mui/icons-material/DarkMode";
import { useNavigate, useLocation } from "react-router-dom";

export default function AppShell({ children }) {
  const navigate = useNavigate();
  const location = useLocation();
  const user = localStorage.getItem("userData");
  const parsedUser = user ? JSON.parse(user) : null;
  const [theme, setTheme] = useState("light");

  useEffect(() => {
    const stored = localStorage.getItem("theme") || "light";
    setTheme(stored);
    document.documentElement.setAttribute("data-theme", stored);
  }, []);

  const toggleTheme = () => {
    const next = theme === "light" ? "dark" : "light";
    setTheme(next);
    localStorage.setItem("theme", next);
    document.documentElement.setAttribute("data-theme", next);
  };

  const onLogout = () => {
    localStorage.removeItem("userData");
    localStorage.removeItem("token");
    navigate("/");
  };

  const showAuthButtons =
    !parsedUser &&
    !location.pathname.startsWith("/user") &&
    !location.pathname.startsWith("/admin") &&
    !location.pathname.startsWith("/doctor");

  return (
    <div className="app-shell">
      <AppBar position="static" color="transparent" elevation={0}>
        <Toolbar sx={{ px: 3 }}>
          <Typography
            variant="h6"
            sx={{ flexGrow: 1, fontWeight: 700, cursor: "pointer" }}
            onClick={() => navigate("/")}
          >
            BOOK A DOCTOR
          </Typography>

          <IconButton onClick={toggleTheme} sx={{ mr: 1 }}>
            {theme === "light" ? <DarkModeIcon /> : <LightModeIcon />}
          </IconButton>

          {parsedUser && (
            <Box sx={{ display: "flex", alignItems: "center", gap: 1, mr: 2 }}>
              <Typography variant="body2" sx={{ opacity: 0.8 }}>
                {parsedUser.type === "admin"
                  ? "Admin"
                  : parsedUser.isdoctor
                  ? "Doctor"
                  : "Patient"}{" "}
                · {parsedUser.fullName}
              </Typography>
              <Button size="small" variant="outlined" onClick={onLogout}>
                Logout
              </Button>
            </Box>
          )}
          {showAuthButtons && (
            <Box sx={{ display: "flex", gap: 1 }}>
              <Button size="small" variant="text" onClick={() => navigate("/login")}>
                Login
              </Button>
              <Button size="small" variant="contained" onClick={() => navigate("/register")}>
                Sign up
              </Button>
            </Box>
          )}
        </Toolbar>
      </AppBar>
      <main className="app-content container-fluid">{children}</main>
    </div>
  );
}
