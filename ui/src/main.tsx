import React from "react";
import ReactDOM from "react-dom/client";
import CssBaseline from "@mui/material/CssBaseline";
import { DockerMuiThemeProvider } from "@docker/docker-mui-theme";
import { ConfigCatProvider } from "configcat-react";

import { App } from './App';

ReactDOM.createRoot(document.getElementById("root") as HTMLElement).render(
  <React.StrictMode>
    {/*
      If you eject from MUI (which we don't recommend!), you should add
      the `dockerDesktopTheme` class to your root <html> element to get
      some minimal Docker theming.
    */}
    <ConfigCatProvider sdkKey="bzTbCEPv_E6GL6COig1QRQ/uZTJPJvsgUuyI8kCvbmXjg">
      <DockerMuiThemeProvider>
        <CssBaseline />
          <App />
      </DockerMuiThemeProvider>
    </ConfigCatProvider>
  </React.StrictMode>
);
