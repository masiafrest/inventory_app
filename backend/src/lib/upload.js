const multer = require("multer");
const path = require("path");

let storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "public/uploads");
  },
  filename: (req, file, cb) => {
    console.log("storage Upload file", file);
    cb(
      null,
      `${file.fieldname}-${Date.now()}-${Math.random() * 1000}${path.extname(
        file.originalname
      )}`
    );
  },
});

const fileFilter = (req, file, cb) => {
  console.log("....upload file: ", file);
  console.log("....upload files: ", req.files);
  console.log("....upload body: ", req.body);
  if (
    file.mimetype === "image/jpeg" ||
    file.mimetype === "image/png" ||
    file.mimetype === "image/jpg"
  ) {
    cb(null, true);
  } else {
    console.log(file);
    cb(new Error("File format should be png, jpg, jpeg", false));
  }
};

const upload = multer({ storage: storage, fileFilter: fileFilter });

module.exports = upload;
