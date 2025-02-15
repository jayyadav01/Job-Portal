const path = require("path");
const dataUriParaser = require("datauri/parser.js");

const getDataUri = (file) => {
  const parser = new dataUriParaser();
  const extName = path.extname(file.originalname).toString();
  return parser.format(extName, file.buffer);
};

module.exports = getDataUri;
