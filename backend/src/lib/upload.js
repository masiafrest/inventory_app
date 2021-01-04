const multer = require("multer");
const path = require("path");

let storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "uploads");
  },
  filename: (req, file, cb) => {
    cb(
      null,
      `${file.fieldname}-${Date.now()}-${Math.random() * 1000}${path.extname(
        file.originalname
      )}`
    );
  },
});

const fileFilter = (req, file, cb) => {
  if (
    file.mimeType === "image/png" ||
    file.mimeType === "image/jpeg" ||
    file.mimeType === "image/jpg"
  ) {
    cb(null, true);
  } else {
    cb(new Error("File format should be png, jpg, jpeg", false));
  }
};

const uploat = multer({ storage: storage, fileFilter: fileFilter });

module.exports = upload;
