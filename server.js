const express = require("express");
const path = require("path");

const app = express();

app.use(
  express.static(path.join(__dirname, "src"), {
    setHeaders: (res, path, stat) => {
      if (path.endsWith(".js")) {
        res.setHeader("Content-Type", "application/javascript");
      } else if (path.endsWith(".css")) {
        res.setHeader("Content-Type", "text/css");
      }
    }
  })
);

app.get("/", (req, res) => {
  res.sendFile(path.join(__dirname, "src", "index.html"));
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Servidor en ejecución http://localhost:${PORT}`);
});
