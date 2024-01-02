const { log } = require("console");
const express = require("express");
const fileUpload = require("express-fileupload");
const path = require("path");

//middleware
const filesPayLoadExist = require("./middleware/filesPayLoadExist");
const fileExtLimiter = require("./middleware/fileExtLimiter");
const fileSizeLimiter = require("./middleware/fileSizeLimiter");

const PORT = process.env.PORT || 3500;

const app = express();

app.get("/", (req, res) => {
  res.sendFile(path.join(__dirname, "index.html"));
});

app.post(
  "/upload",
  fileUpload({ createParentPath: true }),
  filesPayLoadExist,
  fileExtLimiter([".png", ".jpg", ".jpeg"]),
  fileSizeLimiter,
  (req, res) => {
    const files = req.files;
    console.log(files);

    return res.json({ status: "logged", message: "logged" });
  }
);

app.listen(PORT, () => {
  console.log(`App listening on PORT ${PORT}`);
});
