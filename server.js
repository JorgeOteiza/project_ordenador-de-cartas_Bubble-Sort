const express = require("express");
const path = require("path");

const app = express();

app.use(
  express.static(path.join(__dirname, "src"), {
    setHeaders: (res, path) => {
      if (path.endsWith(".css")) {
        res.setHeader("Content-Type", "text/css");
      } else if (path.endsWith(".js")) {
        res.setHeader("Content-Type", "text/javascript");
      }
    },
  })
);

app.get("/", (req, res) => {
  res.sendFile(path.join(__dirname, "src", "index.html"));
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Servidor en ejecución en http://localhost:${PORT}`);
});
