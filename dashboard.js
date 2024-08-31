import express from "express";
import path from "path";
import { fileURLToPath } from "url";

// Required to get __dirname in ES Modules
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();

// Serve the static files from the Vite React build folder
app.use(express.static(path.join(__dirname, "dist")));

// Handle all other routes and return the index.html file from the build
app.get("*", (req, res) => {
  res.sendFile(path.join(__dirname, "dist", "index.html"));
});

app.use(
  express.static(path.join(__dirname, "dist"), {
    setHeaders: (res, path, ) => {
      if (path.endsWith(".html")) {
        res.set("Content-Type", "text/html; charset=UTF-8");
      }
    },
  })
);
// Start the server on port 4000
const PORT = 4000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
