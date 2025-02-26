import { StrictMode } from "react";
import { createRoot } from "react-dom/client";

const rootElement = document.getElementById("root");
const root = createRoot(rootElement);

import Weather from "./Weather";

root.render(
  <StrictMode>
    <div>
      <h1>Weather App</h1>
      <Weather />
    </div>
  </StrictMode>
);
